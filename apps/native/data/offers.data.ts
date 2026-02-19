export interface Offer {
	category: "Bus";
	code: string;
	id: string;
	title: string;
	validity: string;
}

export const OFFERS: Offer[] = [
	{
		id: "1",
		category: "Bus",
		title: "Save up to Rs. 300 in AP, Telangana routes",
		validity: "Valid till 28 Feb",
		code: "SUPERHIT",
	},
	{
		id: "2",
		category: "Bus",
		title: "Save up to Rs. 300 on Karnataka, Tamil Nadu, Kerala routes",
		validity: "Valid till 28 Feb",
		code: "CASH300",
	},
	{
		id: "3",
		category: "Bus",
		title: "Save upto Rs. 500 with Axis Bank Credit Cards",
		validity: "Valid till 28 Feb",
		code: "AXIS500",
	},
	{
		id: "4",
		category: "Bus",
		title: "Save upto Rs. 200 with AU Bank Credit Cards",
		validity: "Valid till 28 Feb",
		code: "AUBUS200",
	},
	{
		id: "5",
		category: "Bus",
		title: "Flat Rs. 100 off on first booking",
		validity: "Valid till 15 Mar",
		code: "FIRST100",
	},
];
