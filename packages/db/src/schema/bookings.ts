import { relations } from "drizzle-orm";
import {
	index,
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth";
import { schedules } from "./schedules";

export const bookingStatusEnum = pgEnum("booking_status", [
	"pending_payment",
	"confirmed",
	"cancelled",
	"failed",
]);

export const bookings = pgTable(
	"bookings",
	{
		id: text("id").primaryKey(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id),
		agentId: text("agent_id"),
		scheduleId: text("schedule_id")
			.notNull()
			.references(() => schedules.id),
		seatIds: text("seat_ids").array().notNull(),
		boardingPoint: text("boarding_point").notNull(),
		droppingPoint: text("dropping_point").notNull(),
		totalPaise: integer("total_paise").notNull(),
		convenienceFeePaise: integer("convenience_fee_paise").default(0).notNull(),
		status: bookingStatusEnum("status").default("pending_payment").notNull(),
		pnr: text("pnr").unique(),
		cancelledAt: timestamp("cancelled_at"),
		cancellationReason: text("cancellation_reason"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [
		index("bookings_user_idx").on(table.userId, table.createdAt),
		index("bookings_schedule_status_idx").on(table.scheduleId, table.status),
	]
);

export const passengers = pgTable(
	"passengers",
	{
		id: text("id").primaryKey(),
		bookingId: text("booking_id")
			.notNull()
			.references(() => bookings.id, { onDelete: "cascade" }),
		seatId: text("seat_id").notNull(),
		name: text("name").notNull(),
		age: integer("age").notNull(),
		gender: text("gender").notNull(),
	},
	(table) => [index("passengers_booking_idx").on(table.bookingId)]
);

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
	user: one(user, {
		fields: [bookings.userId],
		references: [user.id],
	}),
	schedule: one(schedules, {
		fields: [bookings.scheduleId],
		references: [schedules.id],
	}),
	passengers: many(passengers),
}));

export const passengersRelations = relations(passengers, ({ one }) => ({
	booking: one(bookings, {
		fields: [passengers.bookingId],
		references: [bookings.id],
	}),
}));
