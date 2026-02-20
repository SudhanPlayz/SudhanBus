import { z } from "zod";
import amenitiesRaw from "./amenities.json";
import busTypesRaw from "./busTypes.json";
import citiesRaw from "./cities.json";
import seatTypesRaw from "./seatTypes.json";

const CitySchema = z.object({
	id: z.string(),
	name: z.string(),
	slug: z.string(),
	state: z.string(),
	popularRank: z.number().optional(),
});

const AmenitySchema = z.object({
	id: z.string(),
	label: z.string(),
	icon: z.string(),
});

const BusTypeSchema = z.object({
	id: z.string(),
	label: z.string(),
	acType: z.string(),
	layoutType: z.string(),
});

const SeatTypeSchema = z.object({
	id: z.string(),
	label: z.string(),
	multiplier: z.number(),
});

export type City = z.infer<typeof CitySchema>;
export type Amenity = z.infer<typeof AmenitySchema>;
export type BusType = z.infer<typeof BusTypeSchema>;
export type SeatType = z.infer<typeof SeatTypeSchema>;

export const CITIES: readonly City[] = Object.freeze(
	z.array(CitySchema).parse(citiesRaw)
);

export const AMENITIES: readonly Amenity[] = Object.freeze(
	z.array(AmenitySchema).parse(amenitiesRaw)
);

export const BUS_TYPES: readonly BusType[] = Object.freeze(
	z.array(BusTypeSchema).parse(busTypesRaw)
);

export const SEAT_TYPES: readonly SeatType[] = Object.freeze(
	z.array(SeatTypeSchema).parse(seatTypesRaw)
);

export const CITY_BY_SLUG = new Map(CITIES.map((c) => [c.slug, c]));
export const AMENITY_BY_ID = new Map(AMENITIES.map((a) => [a.id, a]));
export const BUS_TYPE_BY_ID = new Map(BUS_TYPES.map((b) => [b.id, b]));
export const SEAT_TYPE_BY_ID = new Map(SEAT_TYPES.map((s) => [s.id, s]));
