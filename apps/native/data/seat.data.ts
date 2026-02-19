export type SeatStatus =
	| "available"
	| "booked"
	| "selected"
	| "available-female"
	| "booked-female"
	| "booked-male";

export type SeatType = "seater" | "sleeper";

export interface Seat {
	col: number;
	id: string;
	price: number;
	row: number;
	status: SeatStatus;
	type: SeatType;
}

export interface DeckLayout {
	name: string;
	seats: (Seat | null)[][];
}

export function generateDemoSeatLayout(): DeckLayout[] {
	const lowerDeck: DeckLayout = {
		name: "Lower deck",
		seats: [
			[
				{
					id: "L1",
					row: 0,
					col: 0,
					status: "available",
					type: "sleeper",
					price: 1450,
				},
				{
					id: "L2",
					row: 0,
					col: 1,
					status: "available",
					type: "seater",
					price: 960,
				},
				{
					id: "L3",
					row: 0,
					col: 2,
					status: "available",
					type: "seater",
					price: 960,
				},
			],
			[
				{
					id: "L4",
					row: 1,
					col: 0,
					status: "booked-female",
					type: "sleeper",
					price: 1450,
				},
				{
					id: "L5",
					row: 1,
					col: 1,
					status: "available",
					type: "seater",
					price: 960,
				},
				{
					id: "L6",
					row: 1,
					col: 2,
					status: "available",
					type: "seater",
					price: 960,
				},
			],
			[
				{
					id: "L7",
					row: 2,
					col: 0,
					status: "booked-female",
					type: "sleeper",
					price: 1450,
				},
				{
					id: "L8",
					row: 2,
					col: 1,
					status: "booked-female",
					type: "seater",
					price: 960,
				},
				{
					id: "L9",
					row: 2,
					col: 2,
					status: "booked-female",
					type: "seater",
					price: 960,
				},
			],
			[
				{
					id: "L10",
					row: 3,
					col: 0,
					status: "booked-male",
					type: "sleeper",
					price: 1450,
				},
				{
					id: "L11",
					row: 3,
					col: 1,
					status: "booked-male",
					type: "seater",
					price: 960,
				},
				{
					id: "L12",
					row: 3,
					col: 2,
					status: "booked-male",
					type: "seater",
					price: 960,
				},
			],
			[
				{
					id: "L13",
					row: 4,
					col: 0,
					status: "booked-male",
					type: "sleeper",
					price: 1450,
				},
				{
					id: "L14",
					row: 4,
					col: 1,
					status: "booked",
					type: "seater",
					price: 960,
				},
				{
					id: "L15",
					row: 4,
					col: 2,
					status: "booked",
					type: "seater",
					price: 960,
				},
			],
			[
				{
					id: "L16",
					row: 5,
					col: 0,
					status: "booked",
					type: "sleeper",
					price: 1450,
				},
				{
					id: "L17",
					row: 5,
					col: 1,
					status: "booked",
					type: "seater",
					price: 960,
				},
				{
					id: "L18",
					row: 5,
					col: 2,
					status: "booked",
					type: "seater",
					price: 960,
				},
			],
			[
				{
					id: "L19",
					row: 6,
					col: 0,
					status: "available",
					type: "sleeper",
					price: 1450,
				},
				{
					id: "L20",
					row: 6,
					col: 1,
					status: "available",
					type: "seater",
					price: 960,
				},
				{
					id: "L21",
					row: 6,
					col: 2,
					status: "available",
					type: "seater",
					price: 960,
				},
			],
		],
	};

	const upperDeck: DeckLayout = {
		name: "Upper deck",
		seats: [
			[
				{
					id: "U1",
					row: 0,
					col: 0,
					status: "available",
					type: "sleeper",
					price: 1350,
				},
				null,
				{
					id: "U2",
					row: 0,
					col: 1,
					status: "available",
					type: "sleeper",
					price: 900,
				},
				{
					id: "U3",
					row: 0,
					col: 2,
					status: "available",
					type: "sleeper",
					price: 900,
				},
			],
			[
				{
					id: "U4",
					row: 1,
					col: 0,
					status: "booked",
					type: "sleeper",
					price: 1350,
				},
				null,
				{
					id: "U5",
					row: 1,
					col: 1,
					status: "available",
					type: "sleeper",
					price: 900,
				},
				{
					id: "U6",
					row: 1,
					col: 2,
					status: "available-female",
					type: "sleeper",
					price: 900,
				},
			],
			[
				{
					id: "U7",
					row: 2,
					col: 0,
					status: "available",
					type: "sleeper",
					price: 1350,
				},
				null,
				{
					id: "U8",
					row: 2,
					col: 1,
					status: "booked",
					type: "sleeper",
					price: 900,
				},
				{
					id: "U9",
					row: 2,
					col: 2,
					status: "available",
					type: "sleeper",
					price: 900,
				},
			],
			[
				{
					id: "U10",
					row: 3,
					col: 0,
					status: "booked-female",
					type: "sleeper",
					price: 1350,
				},
				null,
				{
					id: "U11",
					row: 3,
					col: 1,
					status: "available",
					type: "sleeper",
					price: 900,
				},
				{
					id: "U12",
					row: 3,
					col: 2,
					status: "available",
					type: "sleeper",
					price: 900,
				},
			],
			[
				{
					id: "U13",
					row: 4,
					col: 0,
					status: "booked",
					type: "sleeper",
					price: 1350,
				},
				null,
				{
					id: "U14",
					row: 4,
					col: 1,
					status: "available",
					type: "sleeper",
					price: 900,
				},
				{
					id: "U15",
					row: 4,
					col: 2,
					status: "available",
					type: "sleeper",
					price: 900,
				},
			],
			[
				{
					id: "U16",
					row: 5,
					col: 0,
					status: "available",
					type: "sleeper",
					price: 1350,
				},
				null,
				{
					id: "U17",
					row: 5,
					col: 1,
					status: "available",
					type: "sleeper",
					price: 900,
				},
				{
					id: "U18",
					row: 5,
					col: 2,
					status: "available",
					type: "sleeper",
					price: 900,
				},
			],
			[
				{
					id: "U19",
					row: 6,
					col: 0,
					status: "available",
					type: "sleeper",
					price: 1350,
				},
				null,
				{
					id: "U20",
					row: 6,
					col: 1,
					status: "booked-male",
					type: "sleeper",
					price: 850,
				},
				{
					id: "U21",
					row: 6,
					col: 2,
					status: "booked",
					type: "sleeper",
					price: 900,
				},
			],
		],
	};

	return [lowerDeck, upperDeck];
}

export const BOARDING_POINTS = [
	{
		id: "bp1",
		name: "Majestic Bus Stand",
		time: "20:45",
		address: "Platform 5, Kempegowda Bus Station",
	},
	{
		id: "bp2",
		name: "Electronic City",
		time: "21:15",
		address: "Near Infosys Gate 1, Hosur Road",
	},
	{
		id: "bp3",
		name: "Silk Board Junction",
		time: "21:30",
		address: "Opposite Silk Board Bus Stop",
	},
	{
		id: "bp4",
		name: "Madiwala",
		time: "21:45",
		address: "Near Madiwala Police Station",
	},
];

export const DROPPING_POINTS = [
	{
		id: "dp1",
		name: "Koyambedu Bus Stand",
		time: "05:00",
		address: "Platform 12, CMBT",
	},
	{
		id: "dp2",
		name: "Guindy",
		time: "05:15",
		address: "Near Guindy Railway Station",
	},
	{
		id: "dp3",
		name: "T. Nagar",
		time: "05:30",
		address: "Opposite Pondy Bazaar",
	},
	{
		id: "dp4",
		name: "Central Railway Station",
		time: "05:45",
		address: "Near Entrance Gate 2",
	},
];
