import { relations } from "drizzle-orm";
import {
	index,
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core";
import { schedules } from "./schedules";

export const seatStatusEnum = pgEnum("seat_status", [
	"available",
	"locked",
	"booked",
]);

export const seats = pgTable(
	"seats",
	{
		id: text("id").primaryKey(),
		scheduleId: text("schedule_id")
			.notNull()
			.references(() => schedules.id, { onDelete: "cascade" }),
		seatLabel: text("seat_label").notNull(),
		deck: text("deck").notNull(),
		seatType: text("seat_type").notNull(),
		pricePaise: integer("price_paise").notNull(),
		genderTag: text("gender_tag"),
		status: seatStatusEnum("status").default("available").notNull(),
		lockedByUser: text("locked_by_user"),
		lockedUntil: timestamp("locked_until"),
		bookingId: text("booking_id"),
		rowIndex: integer("row_index").notNull(),
		colIndex: integer("col_index").notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [
		uniqueIndex("seats_schedule_label_idx").on(
			table.scheduleId,
			table.seatLabel
		),
		index("seats_schedule_status_idx").on(table.scheduleId, table.status),
	]
);

export const seatsRelations = relations(seats, ({ one }) => ({
	schedule: one(schedules, {
		fields: [seats.scheduleId],
		references: [schedules.id],
	}),
}));
