import { relations } from "drizzle-orm";
import {
	jsonb,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core";
import { schedules } from "./schedules";

export const seatLayouts = pgTable(
	"seat_layouts",
	{
		id: text("id").primaryKey(),
		scheduleId: text("schedule_id")
			.notNull()
			.references(() => schedules.id, { onDelete: "cascade" }),
		layoutJson: jsonb("layout_json").notNull(),
		cachedAt: timestamp("cached_at").defaultNow().notNull(),
		providerHash: text("provider_hash"),
	},
	(table) => [uniqueIndex("seat_layouts_schedule_idx").on(table.scheduleId)]
);

export const seatLayoutsRelations = relations(seatLayouts, ({ one }) => ({
	schedule: one(schedules, {
		fields: [seatLayouts.scheduleId],
		references: [schedules.id],
	}),
}));
