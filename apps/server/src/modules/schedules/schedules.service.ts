import { AMENITY_BY_ID, BUS_TYPE_BY_ID, CITY_BY_SLUG } from "@/config";
import {
	getScheduleById,
	getSeatLayout,
	getSeatsForSchedule,
} from "./schedules.repository";

export const getScheduleDetail = async (id: string) => {
	const schedule = await getScheduleById(id);

	if (!schedule) {
		return null;
	}

	return {
		id: schedule.id,
		operatorName: schedule.operatorName,
		busType: BUS_TYPE_BY_ID.get(schedule.busTypeId) ?? {
			id: schedule.busTypeId,
			label: schedule.busTypeId,
		},
		originCity: CITY_BY_SLUG.get(schedule.originCityId) ?? {
			slug: schedule.originCityId,
			name: schedule.originCityId,
		},
		destinationCity: CITY_BY_SLUG.get(schedule.destinationCityId) ?? {
			slug: schedule.destinationCityId,
			name: schedule.destinationCityId,
		},
		departureAt: schedule.departureAt.toISOString(),
		arrivalAt: schedule.arrivalAt.toISOString(),
		durationMinutes: schedule.durationMinutes,
		amenities: schedule.amenityIds
			.map((id) => AMENITY_BY_ID.get(id))
			.filter((a): a is NonNullable<typeof a> => a !== undefined),
		basePricePaise: schedule.basePricePaise,
		totalSeats: schedule.totalSeats,
		availableSeats: schedule.availableSeats,
		rating: schedule.rating,
		totalRatings: schedule.totalRatings,
		boardingPoints: schedule.boardingPoints,
		droppingPoints: schedule.droppingPoints,
	};
};

export const getScheduleSeats = async (scheduleId: string) => {
	const [layout, seatRows] = await Promise.all([
		getSeatLayout(scheduleId),
		getSeatsForSchedule(scheduleId),
	]);

	if (!layout) {
		return null;
	}

	const statusMap = new Map(
		seatRows.map((s) => [
			s.seatLabel,
			{
				status: s.status,
				pricePaise: s.pricePaise,
				genderTag: s.genderTag,
				seatType: s.seatType,
			},
		])
	);

	const rawDecks = layout.layoutJson as Array<{
		name: string;
		seats: Array<Array<{ label: string } | null>>;
	}>;

	return {
		scheduleId,
		decks: rawDecks.map((deck) => ({
			name: deck.name,
			seats: deck.seats.map((row) =>
				row.map((seat) => {
					if (!seat) {
						return null;
					}
					const info = statusMap.get(seat.label);
					return {
						label: seat.label,
						status: info?.status ?? "available",
						pricePaise: info?.pricePaise ?? 0,
						seatType: info?.seatType ?? "seater",
						genderTag: info?.genderTag ?? null,
					};
				})
			),
		})),
	};
};
