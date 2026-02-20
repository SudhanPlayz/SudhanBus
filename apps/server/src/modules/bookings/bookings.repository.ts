import { db } from "@sudhanbus/db";
import { bookings, passengers, schedules, seats } from "@sudhanbus/db/schema";
import { and, count, desc, eq, inArray, sql } from "drizzle-orm";

interface CreateBookingInput {
	agentId?: string;
	boardingPoint: string;
	convenienceFeePaise: number;
	droppingPoint: string;
	id: string;
	passengerList: Array<{
		id: string;
		seatId: string;
		name: string;
		age: number;
		gender: string;
	}>;
	scheduleId: string;
	seatIds: string[];
	totalPaise: number;
	userId: string;
}

export const createBookingWithPassengers = async (
	input: CreateBookingInput
) => {
	return db.transaction(async (tx) => {
		const [booking] = await tx
			.insert(bookings)
			.values({
				id: input.id,
				userId: input.userId,
				agentId: input.agentId ?? null,
				scheduleId: input.scheduleId,
				seatIds: input.seatIds,
				boardingPoint: input.boardingPoint,
				droppingPoint: input.droppingPoint,
				totalPaise: input.totalPaise,
				convenienceFeePaise: input.convenienceFeePaise,
				status: "pending_payment",
			})
			.returning();

		if (input.passengerList.length > 0) {
			await tx.insert(passengers).values(
				input.passengerList.map((p) => ({
					id: p.id,
					bookingId: input.id,
					seatId: p.seatId,
					name: p.name,
					age: p.age,
					gender: p.gender,
				}))
			);
		}

		return booking;
	});
};

export const getBookingById = async (id: string) => {
	return db.query.bookings.findFirst({
		where: eq(bookings.id, id),
		with: {
			passengers: true,
			schedule: true,
		},
	});
};

export const getUserBookings = async (
	userId: string,
	page: number,
	limit: number,
	status?: string
) => {
	const conditions = [eq(bookings.userId, userId)];

	if (status) {
		conditions.push(
			eq(
				bookings.status,
				status as "pending_payment" | "confirmed" | "cancelled" | "failed"
			)
		);
	}

	const where = and(...conditions);
	const offset = (page - 1) * limit;

	const [rows, totalResult] = await Promise.all([
		db.query.bookings.findMany({
			where,
			with: { schedule: true, passengers: true },
			orderBy: desc(bookings.createdAt),
			limit,
			offset,
		}),
		db.select({ total: count() }).from(bookings).where(where),
	]);

	return { rows, total: totalResult[0]?.total ?? 0 };
};

export const updateBookingStatus = async (
	id: string,
	status: "pending_payment" | "confirmed" | "cancelled" | "failed",
	pnr?: string
) => {
	return db
		.update(bookings)
		.set({
			status,
			pnr: pnr ?? undefined,
			cancelledAt: status === "cancelled" ? new Date() : undefined,
		})
		.where(eq(bookings.id, id));
};

export const confirmBookingTransaction = async (
	bookingId: string,
	pnr: string,
	seatIds: string[],
	seatCount: number,
	scheduleId: string
) => {
	return db.transaction(async (tx) => {
		await tx
			.update(bookings)
			.set({ status: "confirmed", pnr })
			.where(eq(bookings.id, bookingId));

		await tx
			.update(seats)
			.set({
				status: "booked",
				lockedByUser: null,
				lockedUntil: null,
				bookingId,
			})
			.where(inArray(seats.id, seatIds));

		await tx
			.update(schedules)
			.set({
				availableSeats: sql`${schedules.availableSeats} - ${seatCount}`,
			})
			.where(eq(schedules.id, scheduleId));
	});
};
