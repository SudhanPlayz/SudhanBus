import { createId } from "@paralleldrive/cuid2";
import { writeAuditLog } from "@/lib/audit";
import { redis } from "@/lib/redis";
import { getSeatsByIds } from "@/modules/seats/seats.repository";
import {
	createBookingWithPassengers,
	getBookingById,
	getUserBookings,
	updateBookingStatus,
} from "./bookings.repository";

interface CreateBookingInput {
	boardingPoint: string;
	droppingPoint: string;
	passengers: Array<{
		seatId: string;
		name: string;
		age: number;
		gender: string;
	}>;
	scheduleId: string;
	seatIds: string[];
}

export const createBooking = async (
	input: CreateBookingInput,
	userId: string,
	requestId?: string
) => {
	const seatRows = await getSeatsByIds(input.seatIds);

	if (seatRows.length !== input.seatIds.length) {
		throw new Error("One or more seats not found");
	}

	for (const seat of seatRows) {
		if (seat.scheduleId !== input.scheduleId) {
			throw new Error(
				`Seat ${seat.seatLabel} does not belong to this schedule`
			);
		}
		if (seat.status !== "locked" || seat.lockedByUser !== userId) {
			throw new Error(
				`Seat ${seat.seatLabel} is not locked by you. Lock seats before booking.`
			);
		}
	}

	if (redis) {
		for (const seat of seatRows) {
			const lockKey = `seat:lock:${input.scheduleId}:${seat.seatLabel}`;
			const lockedBy = await redis.get(lockKey);
			if (lockedBy !== userId) {
				throw new Error(
					`Seat lock expired for ${seat.seatLabel}. Please re-lock.`
				);
			}
		}
	}

	const totalPaise = seatRows.reduce((sum, s) => sum + s.pricePaise, 0);
	const bookingId = createId();

	const booking = await createBookingWithPassengers({
		id: bookingId,
		userId,
		scheduleId: input.scheduleId,
		seatIds: input.seatIds,
		boardingPoint: input.boardingPoint,
		droppingPoint: input.droppingPoint,
		totalPaise,
		convenienceFeePaise: 0,
		passengerList: input.passengers.map((p) => ({
			id: createId(),
			...p,
		})),
	});

	writeAuditLog({
		actorId: userId,
		actorType: "user",
		action: "booking.created",
		entityType: "booking",
		entityId: bookingId,
		payload: { scheduleId: input.scheduleId, seatIds: input.seatIds },
		requestId,
	});

	return {
		bookingId: booking?.id ?? bookingId,
		totalPaise,
		status: "pending_payment",
	};
};

export const getBooking = async (bookingId: string, userId: string) => {
	const booking = await getBookingById(bookingId);

	if (!booking || booking.userId !== userId) {
		return null;
	}

	return booking;
};

export const listBookings = async (
	userId: string,
	page: number,
	limit: number,
	status?: string
) => {
	return getUserBookings(userId, page, limit, status);
};

export const cancelBooking = async (
	bookingId: string,
	userId: string,
	requestId?: string
) => {
	const booking = await getBookingById(bookingId);

	if (!booking || booking.userId !== userId) {
		throw new Error("Booking not found");
	}

	if (booking.status !== "pending_payment" && booking.status !== "confirmed") {
		throw new Error("Booking cannot be cancelled in current state");
	}

	await updateBookingStatus(bookingId, "cancelled");

	writeAuditLog({
		actorId: userId,
		actorType: "user",
		action: "booking.cancelled",
		entityType: "booking",
		entityId: bookingId,
		requestId,
	});

	return { bookingId, status: "cancelled" };
};
