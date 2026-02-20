import { AMENITY_BY_ID, BUS_TYPE_BY_ID, CITY_BY_SLUG } from "@/config";
import type { PaginationMeta } from "@/types/common";
import { type SearchFilters, searchSchedules } from "./search.repository";

interface SearchInput {
	amenities?: string;
	busType?: string;
	date: string;
	from: string;
	limit: number;
	maxPrice?: number;
	minPrice?: number;
	page: number;
	sortBy?: "price" | "rating" | "departure" | "duration";
	to: string;
}

export interface SearchResult {
	amenities: Array<{ id: string; label: string; icon: string }>;
	arrivalAt: string;
	availableSeats: number;
	basePricePaise: number;
	boardingPoints: string[];
	busType: { id: string; label: string } | null;
	departureAt: string;
	destinationCity: { slug: string; name: string } | null;
	droppingPoints: string[];
	durationMinutes: number;
	id: string;
	operatorName: string;
	originCity: { slug: string; name: string } | null;
	rating: string | null;
	totalRatings: number;
}

export const search = async (
	input: SearchInput
): Promise<{ results: SearchResult[]; meta: PaginationMeta }> => {
	const originCity = CITY_BY_SLUG.get(input.from);
	if (!originCity) {
		throw new Error(`Unknown origin city: ${input.from}`);
	}

	const destinationCity = CITY_BY_SLUG.get(input.to);
	if (!destinationCity) {
		throw new Error(`Unknown destination city: ${input.to}`);
	}

	const dateStart = new Date(`${input.date}T00:00:00`);
	const dateEnd = new Date(`${input.date}T23:59:59`);

	const filters: SearchFilters = {
		originSlug: input.from,
		destinationSlug: input.to,
		dateStart,
		dateEnd,
		busType: input.busType,
		amenities: input.amenities?.split(",").filter(Boolean),
		minPricePaise: input.minPrice,
		maxPricePaise: input.maxPrice,
		sortBy: input.sortBy,
		page: input.page,
		limit: input.limit,
	};

	const { rows, total } = await searchSchedules(filters);

	const results: SearchResult[] = rows.map((row) => ({
		id: row.id,
		operatorName: row.operatorName,
		busType: BUS_TYPE_BY_ID.has(row.busTypeId)
			? {
					id: row.busTypeId,
					label: BUS_TYPE_BY_ID.get(row.busTypeId)?.label ?? row.busTypeId,
				}
			: null,
		originCity: {
			slug: row.originCityId,
			name: originCity.name,
		},
		destinationCity: {
			slug: row.destinationCityId,
			name: destinationCity.name,
		},
		departureAt: row.departureAt.toISOString(),
		arrivalAt: row.arrivalAt.toISOString(),
		durationMinutes: row.durationMinutes,
		amenities: row.amenityIds
			.map((amenityId) => AMENITY_BY_ID.get(amenityId))
			.filter((a): a is NonNullable<typeof a> => a !== undefined),
		basePricePaise: row.basePricePaise,
		availableSeats: row.availableSeats,
		rating: row.rating,
		totalRatings: row.totalRatings,
		boardingPoints: row.boardingPoints,
		droppingPoints: row.droppingPoints,
	}));

	const meta: PaginationMeta = {
		page: input.page,
		limit: input.limit,
		total,
		totalPages: Math.ceil(total / input.limit),
	};

	return { results, meta };
};
