import { db } from "@sudhanbus/db";
import { schedules, seatLayouts, seats } from "@sudhanbus/db/schema";
import { eq } from "drizzle-orm";

export const getScheduleById = async (id: string) => {
	return db.query.schedules.findFirst({
		where: eq(schedules.id, id),
	});
};

export const getSeatLayout = async (scheduleId: string) => {
	return db.query.seatLayouts.findFirst({
		where: eq(seatLayouts.scheduleId, scheduleId),
	});
};

export const getSeatsForSchedule = async (scheduleId: string) => {
	return db.select().from(seats).where(eq(seats.scheduleId, scheduleId));
};
