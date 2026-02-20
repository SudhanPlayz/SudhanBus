import type {
	IProvider,
	ProviderBookingRequest,
	ProviderBookingResult,
	ProviderSchedule,
	ProviderSeatLayout,
	SearchParams,
} from "../provider.interface";

/**
 * TicketSimply provider stub.
 * Implement when integrating with the TicketSimply API.
 */
export class TicketSimplyProvider implements IProvider {
	readonly providerId = "ticketsimply";

	async searchSchedules(_params: SearchParams): Promise<ProviderSchedule[]> {
		// TODO: Implement HTTP call to TicketSimply API
		return [];
	}

	async getSeatLayout(_providerRef: string): Promise<ProviderSeatLayout> {
		throw new Error("TicketSimply getSeatLayout not implemented");
	}

	async confirmBooking(
		_req: ProviderBookingRequest
	): Promise<ProviderBookingResult> {
		throw new Error("TicketSimply confirmBooking not implemented");
	}

	async cancelBooking(_providerBookingId: string): Promise<void> {
		throw new Error("TicketSimply cancelBooking not implemented");
	}
}
