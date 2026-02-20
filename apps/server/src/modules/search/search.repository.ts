import { db } from "@sudhanbus/db";
import { schedules } from "@sudhanbus/db/schema";
import { and, asc, count, desc, eq, gte, lt, lte, sql } from "drizzle-orm";

export interface SearchFilters {
	amenities?: string[];
	busType?: string;
	dateEnd: Date;
	dateStart: Date;
	destinationSlug: string;
	limit: number;
	maxPricePaise?: number;
	minPricePaise?: number;
	originSlug: string;
	page: number;
	sortBy?: "price" | "rating" | "departure" | "duration";
}

export const searchSchedules = async (filters: SearchFilters) => {
	const conditions = [
		eq(schedules.originCityId, filters.originSlug),
		eq(schedules.destinationCityId, filters.destinationSlug),
		gte(schedules.departureAt, filters.dateStart),
		lt(schedules.departureAt, filters.dateEnd),
		eq(schedules.isActive, true),
	];

	if (filters.busType) {
		conditions.push(eq(schedules.busTypeId, filters.busType));
	}

	if (filters.minPricePaise !== undefined) {
		conditions.push(gte(schedules.basePricePaise, filters.minPricePaise));
	}

	if (filters.maxPricePaise !== undefined) {
		conditions.push(lte(schedules.basePricePaise, filters.maxPricePaise));
	}

	if (filters.amenities && filters.amenities.length > 0) {
		conditions.push(sql`${schedules.amenityIds} @> ${filters.amenities}`);
	}

	const where = and(...conditions);

	const sortMap = {
		price: asc(schedules.basePricePaise),
		rating: desc(schedules.rating),
		departure: asc(schedules.departureAt),
		duration: asc(schedules.durationMinutes),
	} as const;

	const orderBy = sortMap[filters.sortBy ?? "departure"];
	const offset = (filters.page - 1) * filters.limit;

	const [rows, totalResult] = await Promise.all([
		db
			.select()
			.from(schedules)
			.where(where)
			.orderBy(orderBy)
			.limit(filters.limit)
			.offset(offset),
		db.select({ total: count() }).from(schedules).where(where),
	]);

	const total = totalResult[0]?.total ?? 0;

	return { rows, total };
};
