import { db } from "@sudhanbus/db";
import { seats } from "@sudhanbus/db/schema";
import { and, eq, inArray } from "drizzle-orm";

export const getSeatsByIds = async (seatIds: string[]) => {
	return db.select().from(seats).where(inArray(seats.id, seatIds));
};

export const getSeatsByScheduleAndLabels = async (
	scheduleId: string,
	seatLabels: string[]
) => {
	return db
		.select()
		.from(seats)
		.where(
			and(
				eq(seats.scheduleId, scheduleId),
				inArray(seats.seatLabel, seatLabels)
			)
		);
};

export const lockSeatsInDb = async (
	seatIds: string[],
	userId: string,
	lockedUntil: Date
) => {
	return db
		.update(seats)
		.set({
			status: "locked",
			lockedByUser: userId,
			lockedUntil,
		})
		.where(inArray(seats.id, seatIds));
};

export const unlockSeatsInDb = async (seatIds: string[], userId: string) => {
	return db
		.update(seats)
		.set({
			status: "available",
			lockedByUser: null,
			lockedUntil: null,
		})
		.where(and(inArray(seats.id, seatIds), eq(seats.lockedByUser, userId)));
};

export const markSeatsBooked = async (seatIds: string[], bookingId: string) => {
	return db
		.update(seats)
		.set({
			status: "booked",
			bookingId,
			lockedByUser: null,
			lockedUntil: null,
		})
		.where(inArray(seats.id, seatIds));
};

export const releaseSeats = async (seatIds: string[]) => {
	return db
		.update(seats)
		.set({
			status: "available",
			lockedByUser: null,
			lockedUntil: null,
			bookingId: null,
		})
		.where(inArray(seats.id, seatIds));
};
