interface Route {
	id: string;
	from: string;
	to: string;
	distance: string;
	duration: string;
	price: number;
}

const POPULAR_ROUTES: Route[] = [
	{
		id: "1",
		from: "Chennai",
		to: "Bangalore",
		distance: "346 km",
		duration: "5h 30m",
		price: 450,
	},
	{
		id: "2",
		from: "Mumbai",
		to: "Pune",
		distance: "149 km",
		duration: "3h 00m",
		price: 350,
	},
	{
		id: "3",
		from: "Delhi",
		to: "Jaipur",
		distance: "281 km",
		duration: "4h 30m",
		price: 500,
	},
	{
		id: "4",
		from: "Hyderabad",
		to: "Vizag",
		distance: "625 km",
		duration: "9h 00m",
		price: 750,
	},
	{
		id: "5",
		from: "Kochi",
		to: "Coimbatore",
		distance: "196 km",
		duration: "4h 00m",
		price: 400,
	},
];

export { POPULAR_ROUTES };
export type { Route };
