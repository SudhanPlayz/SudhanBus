export interface SearchParams {
	date: string;
	destinationSlug: string;
	originSlug: string;
}

export interface ProviderSchedule {
	amenityIds: string[];
	arrivesAt: Date;
	availableSeats: number;
	basePricePaise: number;
	boardingPoints: string[];
	busTypeId: string;
	departsAt: Date;
	droppingPoints: string[];
	durationMinutes: number;
	operatorName: string;
	providerRef: string;
	rating?: string;
	totalRatings?: number;
	totalSeats: number;
}

export interface ProviderSeatLayout {
	decks: ProviderDeck[];
	providerRef: string;
}

export interface ProviderDeck {
	name: string;
	seats: (ProviderSeat | null)[][];
}

export interface ProviderSeat {
	col: number;
	deck: "lower" | "upper";
	genderTag?: "female";
	label: string;
	pricePaise: number;
	row: number;
	type: "seater" | "sleeper";
}

export interface ProviderBookingRequest {
	boardingPointId: string;
	droppingPointId: string;
	passengers: Array<{ name: string; age: number; gender: string }>;
	scheduleProviderRef: string;
	seatLabels: string[];
}

export interface ProviderBookingResult {
	failureReason?: string;
	pnr: string;
	providerBookingId: string;
	status: "confirmed" | "failed";
}

export interface IProvider {
	cancelBooking(providerBookingId: string): Promise<void>;
	confirmBooking(req: ProviderBookingRequest): Promise<ProviderBookingResult>;
	getSeatLayout(providerRef: string): Promise<ProviderSeatLayout>;
	readonly providerId: string;

	searchSchedules(params: SearchParams): Promise<ProviderSchedule[]>;
}
