import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Passenger {
	age: string;
	gender: "male" | "female" | "other";
	name: string;
	seatId: string; // mapped to seat number mostly
}

export interface ContactDetails {
	email: string;
	phone: string;
}

export interface BookingState {
	// Boarding & Dropping
	boardingPoint: string | null;
	busDetails: Record<string, any> | null;

	// Selected Bus Information
	busId: string;

	// Contact Info
	contactDetails: ContactDetails;
	date: string;
	droppingPoint: string | null;
	// Search Data
	from: string;
	passengers: Passenger[];
	resetBooking: () => void;
	seatPrices: Record<string, number>;

	// Seats & Passengers
	selectedSeats: string[];
	setBoardingPoint: (point: string | null) => void;
	setBus: (busId: string, busDetails?: any) => void;
	setContactDetails: (details: Partial<ContactDetails>) => void;
	setDroppingPoint: (point: string | null) => void;
	setPassengers: (passengers: Passenger[]) => void;

	// Actions
	setRoute: (from: string, to: string, date: string) => void;
	to: string;
	toggleSeat: (seatId: string, price: number) => void;
	updatePassenger: (seatId: string, passengerData: Partial<Passenger>) => void;
}

const initialState = {
	from: "",
	to: "",
	date: "",
	busId: "",
	busDetails: null,
	selectedSeats: [],
	seatPrices: {},
	passengers: [],
	boardingPoint: null,
	droppingPoint: null,
	contactDetails: {
		email: "",
		phone: "",
	},
};

export const useBookingStore = create<BookingState>()(
	persist(
		(set) => ({
			...initialState,

			setRoute: (from, to, date) =>
				set((state) => ({
					...state,
					from,
					to,
					date,
				})),

			setBus: (busId, busDetails = null) =>
				set((state) => ({
					...state,
					busId,
					busDetails,
				})),

			toggleSeat: (seatId, price) =>
				set((state) => {
					const isSelected = state.selectedSeats.includes(seatId);

					if (isSelected) {
						// Remove seat
						const newSeats = state.selectedSeats.filter((id) => id !== seatId);
						const newPrices = { ...state.seatPrices };
						delete newPrices[seatId];
						const newPassengers = state.passengers.filter(
							(p) => p.seatId !== seatId
						);

						return {
							selectedSeats: newSeats,
							seatPrices: newPrices,
							passengers: newPassengers,
						};
					} else {
						// Add seat
						return {
							selectedSeats: [...state.selectedSeats, seatId],
							seatPrices: { ...state.seatPrices, [seatId]: price },
							passengers: [
								...state.passengers,
								{ seatId, name: "", age: "", gender: "male" }, // default gender for better UX as in existing comp
							],
						};
					}
				}),

			setPassengers: (passengers) => set(() => ({ passengers })),

			updatePassenger: (seatId, passengerData) =>
				set((state) => ({
					passengers: state.passengers.map((p) =>
						p.seatId === seatId ? { ...p, ...passengerData } : p
					),
				})),

			setBoardingPoint: (point) => set(() => ({ boardingPoint: point })),

			setDroppingPoint: (point) => set(() => ({ droppingPoint: point })),

			setContactDetails: (details) =>
				set((state) => ({
					contactDetails: {
						...state.contactDetails,
						...details,
					},
				})),

			resetBooking: () => set(initialState),
		}),
		{
			name: "booking-storage",
			version: 1,
		}
	)
);
