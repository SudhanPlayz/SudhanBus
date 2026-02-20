import {
	boolean,
	index,
	integer,
	numeric,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core";

export const schedules = pgTable(
	"schedules",
	{
		id: text("id").primaryKey(),
		providerId: text("provider_id").notNull(),
		providerRef: text("provider_ref").notNull(),
		operatorName: text("operator_name").notNull(),
		busTypeId: text("bus_type_id").notNull(),
		originCityId: text("origin_city_id").notNull(),
		destinationCityId: text("destination_city_id").notNull(),
		departureAt: timestamp("departure_at").notNull(),
		arrivalAt: timestamp("arrival_at").notNull(),
		durationMinutes: integer("duration_minutes").notNull(),
		amenityIds: text("amenity_ids").array().notNull(),
		basePricePaise: integer("base_price_paise").notNull(),
		totalSeats: integer("total_seats").notNull(),
		availableSeats: integer("available_seats").notNull(),
		rating: numeric("rating", { precision: 3, scale: 2 }),
		totalRatings: integer("total_ratings").default(0).notNull(),
		isActive: boolean("is_active").default(true).notNull(),
		boardingPoints: text("boarding_points").array().notNull(),
		droppingPoints: text("dropping_points").array().notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [
		index("schedules_route_date_idx").on(
			table.originCityId,
			table.destinationCityId,
			table.departureAt
		),
		uniqueIndex("schedules_provider_ref_idx").on(
			table.providerId,
			table.providerRef
		),
	]
);
