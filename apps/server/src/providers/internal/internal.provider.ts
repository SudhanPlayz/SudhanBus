import { db } from "@sudhanbus/db";
import { schedules, seatLayouts, seats } from "@sudhanbus/db/schema";
import { and, eq, gte, lt } from "drizzle-orm";
import type {
	IProvider,
	ProviderBookingRequest,
	ProviderBookingResult,
	ProviderSchedule,
	ProviderSeatLayout,
	SearchParams,
} from "../provider.interface";

export class InternalProvider implements IProvider {
	readonly providerId = "internal";

	async searchSchedules(params: SearchParams): Promise<ProviderSchedule[]> {
		const dateStart = new Date(`${params.date}T00:00:00`);
		const dateEnd = new Date(`${params.date}T23:59:59`);

		const rows = await db
			.select()
			.from(schedules)
			.where(
				and(
					eq(schedules.originCityId, params.originSlug),
					eq(schedules.destinationCityId, params.destinationSlug),
					gte(schedules.departureAt, dateStart),
					lt(schedules.departureAt, dateEnd),
					eq(schedules.isActive, true)
				)
			);

		return rows.map((row) => ({
			providerRef: row.id,
			operatorName: row.operatorName,
			busTypeId: row.busTypeId,
			amenityIds: row.amenityIds,
			departsAt: row.departureAt,
			arrivesAt: row.arrivalAt,
			durationMinutes: row.durationMinutes,
			basePricePaise: row.basePricePaise,
			totalSeats: row.totalSeats,
			availableSeats: row.availableSeats,
			rating: row.rating ?? undefined,
			totalRatings: row.totalRatings,
			boardingPoints: row.boardingPoints,
			droppingPoints: row.droppingPoints,
		}));
	}

	async getSeatLayout(providerRef: string): Promise<ProviderSeatLayout> {
		const layout = await db.query.seatLayouts.findFirst({
			where: eq(seatLayouts.scheduleId, providerRef),
		});

		if (!layout) {
			throw new Error(`No seat layout found for schedule ${providerRef}`);
		}

		const seatRows = await db
			.select()
			.from(seats)
			.where(eq(seats.scheduleId, providerRef));

		const statusMap = new Map(seatRows.map((s) => [s.seatLabel, s.status]));

		const rawDecks = layout.layoutJson as Array<{
			name: string;
			seats: Array<Array<{ label: string } | null>>;
		}>;

		return {
			providerRef,
			decks: rawDecks.map((deck) => ({
				name: deck.name,
				seats: deck.seats.map((row, rowIdx) =>
					row.map((seat, colIdx) => {
						if (!seat) {
							return null;
						}
						const seatRow = seatRows.find((s) => s.seatLabel === seat.label);
						return {
							label: seat.label,
							deck: deck.name as "lower" | "upper",
							type: (seatRow?.seatType ?? "seater") as "seater" | "sleeper",
							pricePaise: seatRow?.pricePaise ?? 0,
							row: rowIdx,
							col: colIdx,
							status: statusMap.get(seat.label) ?? "available",
							genderTag: seatRow?.genderTag as "female" | undefined,
						};
					})
				),
			})),
		};
	}

	async confirmBooking(
		_req: ProviderBookingRequest
	): Promise<ProviderBookingResult> {
		const pnr = `SB${Date.now().toString(36).toUpperCase()}`;
		return await {
			providerBookingId: pnr,
			pnr,
			status: "confirmed",
		};
	}

	async cancelBooking(_providerBookingId: string): Promise<void> {
		// Internal provider: no external API to call
	}
}
