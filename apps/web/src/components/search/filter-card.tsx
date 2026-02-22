"use client";

import {
	Accordion,
	AccordionItem,
	AccordionPanel,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const BUS_TYPES = [
	{ id: "ac", label: "AC" },
	{ id: "non-ac", label: "Non AC" },
	{ id: "sleeper", label: "Sleeper" },
	{ id: "seater", label: "Seater" },
];

const DEPARTURE_TIMES = [
	{ id: "morning", label: "06:00 – 12:00" },
	{ id: "afternoon", label: "12:00 – 18:00" },
	{ id: "evening", label: "18:00 – 24:00" },
	{ id: "night", label: "00:00 – 06:00" },
];

const ARRIVAL_TIMES = [
	{ id: "morning", label: "06:00 – 12:00" },
	{ id: "afternoon", label: "12:00 – 18:00" },
	{ id: "evening", label: "18:00 – 24:00" },
	{ id: "night", label: "00:00 – 06:00" },
];

const SEATER_SLEEPER_TYPES = [{ id: "single", label: "Single Window Seater" }];

const BUS_FEATURES = [
	{ id: "wifi", label: "WIFI" },
	{ id: "water", label: "Water Bottle" },
	{ id: "blanket", label: "Blanket" },
	{ id: "charging", label: "Charging Point" },
];

const BUS_OPERATORS = [
	{ id: "intrCity", label: "IntrCity SmartBus" },
	{ id: "zingbus", label: "Zingbus" },
	{ id: "nueGo", label: "NueGo" },
	{ id: "srs", label: "SRS Travels" },
];

const BOARDING_POINTS = [
	{ id: "kashmere_gate", label: "Kashmere Gate" },
	{ id: "anand_vihar", label: "Anand Vihar" },
	{ id: "majnu_ka_tila", label: "Majnu Ka Tila" },
];

const DROPPING_POINTS = [
	{ id: "manali", label: "Manali Bus Stand" },
	{ id: "kullu", label: "Kullu" },
	{ id: "bhuntar", label: "Bhuntar" },
];

const AMENITIES = [
	{ id: "toilet", label: "Toilet" },
	{ id: "cctv", label: "CCTV" },
	{ id: "gps", label: "GPS Tracking" },
];

const SPECIAL_FEATURES = [
	{ id: "live_tracking", label: "Live Tracking" },
	{ id: "m_ticket", label: "M-Ticket Accepted" },
];

interface FilterCardProps {
	onTimeChange: (time: string, checked: boolean) => void;
	onTypeChange: (type: string, checked: boolean) => void;
	selectedTimes: string[];
	selectedTypes: string[];
}

function FilterCard({
	selectedTypes,
	onTypeChange,
	selectedTimes,
	onTimeChange,
}: FilterCardProps) {
	return (
		<Card className="h-full flex flex-col border shadow-sm">
			<CardContent className="p-0 flex flex-col flex-1 min-h-0">
				<div className="pt-5 px-5 shrink-0 hidden sm:block">
					<h3 className="mb-4 text-center font-bold text-base tracking-tight">
						Filter buses
					</h3>
					<Separator className="mb-0" />
				</div>

				<ScrollArea className="flex-1 min-h-0">
					<div className="px-5 py-3">
						<Accordion
							className="w-full"
							defaultValue={["departure", "bus-type"]}
						>
							{/* Departure Time */}
							<AccordionItem
								className="border-b px-4 sm:px-0"
								value="departure"
							>
								<AccordionTrigger className="font-semibold text-sm hover:no-underline py-4">
									Departure time from source
								</AccordionTrigger>
								<AccordionPanel>
									<div className="flex flex-col gap-3 pb-2 pt-1 px-1">
										{DEPARTURE_TIMES.map((time) => (
											<label
												className="flex cursor-pointer items-center gap-2 text-sm"
												key={time.id}
											>
												<Checkbox
													checked={selectedTimes.includes(time.id)}
													onCheckedChange={(checked) =>
														onTimeChange(time.id, checked as boolean)
													}
												/>
												{time.label}
											</label>
										))}
									</div>
								</AccordionPanel>
							</AccordionItem>

							{/* Arrival Time */}
							<AccordionItem className="border-b px-4 sm:px-0" value="arrival">
								<AccordionTrigger className="font-semibold text-sm hover:no-underline py-4">
									Arrival time at destination
								</AccordionTrigger>
								<AccordionPanel>
									<div className="flex flex-col gap-3 pb-2 pt-1 px-1">
										{ARRIVAL_TIMES.map((time) => (
											<label
												className="flex cursor-pointer items-center gap-2 text-sm"
												key={time.id}
											>
												<Checkbox />
												{time.label}
											</label>
										))}
									</div>
								</AccordionPanel>
							</AccordionItem>

							{/* Bus Type */}
							<AccordionItem className="border-b px-4 sm:px-0" value="bus-type">
								<AccordionTrigger className="font-semibold text-sm hover:no-underline py-4">
									Bus type
								</AccordionTrigger>
								<AccordionPanel>
									<div className="flex flex-col gap-3 pb-2 pt-1 px-1">
										{BUS_TYPES.map((type) => (
											<label
												className="flex cursor-pointer items-center gap-2 text-sm"
												key={type.id}
											>
												<Checkbox
													checked={selectedTypes.includes(type.id)}
													onCheckedChange={(checked) =>
														onTypeChange(type.id, checked as boolean)
													}
												/>
												{type.label}
											</label>
										))}
									</div>
								</AccordionPanel>
							</AccordionItem>

							{/* Single window seater/sleeper */}
							<AccordionItem
								className="border-b px-4 sm:px-0"
								value="seater-sleeper"
							>
								<AccordionTrigger className="font-semibold text-sm hover:no-underline py-4 text-left">
									Single window seater/
									<br />
									sleeper
								</AccordionTrigger>
								<AccordionPanel>
									<div className="flex flex-col gap-3 pb-2 pt-1 px-1">
										{SEATER_SLEEPER_TYPES.map((type) => (
											<label
												className="flex cursor-pointer items-center gap-2 text-sm"
												key={type.id}
											>
												<Checkbox />
												{type.label}
											</label>
										))}
									</div>
								</AccordionPanel>
							</AccordionItem>

							{/* Bus features */}
							<AccordionItem className="border-b px-4 sm:px-0" value="features">
								<AccordionTrigger className="font-semibold text-sm hover:no-underline py-4">
									Bus features
								</AccordionTrigger>
								<AccordionPanel>
									<div className="flex flex-col gap-3 pb-2 pt-1 px-1">
										{BUS_FEATURES.map((feature) => (
											<label
												className="flex cursor-pointer items-center gap-2 text-sm"
												key={feature.id}
											>
												<Checkbox />
												{feature.label}
											</label>
										))}
									</div>
								</AccordionPanel>
							</AccordionItem>

							{/* Bus operator */}
							<AccordionItem className="border-b px-4 sm:px-0" value="operator">
								<AccordionTrigger className="font-semibold text-sm hover:no-underline py-4">
									Bus operator
								</AccordionTrigger>
								<AccordionPanel>
									<div className="flex flex-col gap-3 pb-2 pt-1 px-1">
										{BUS_OPERATORS.map((op) => (
											<label
												className="flex cursor-pointer items-center gap-2 text-sm"
												key={op.id}
											>
												<Checkbox />
												{op.label}
											</label>
										))}
									</div>
								</AccordionPanel>
							</AccordionItem>

							{/* Boarding points */}
							<AccordionItem className="border-b px-4 sm:px-0" value="boarding">
								<AccordionTrigger className="font-semibold text-sm hover:no-underline py-4">
									Boarding points
								</AccordionTrigger>
								<AccordionPanel>
									<div className="flex flex-col gap-3 pb-2 pt-1 px-1">
										{BOARDING_POINTS.map((pt) => (
											<label
												className="flex cursor-pointer items-center gap-2 text-sm"
												key={pt.id}
											>
												<Checkbox />
												{pt.label}
											</label>
										))}
									</div>
								</AccordionPanel>
							</AccordionItem>

							{/* Dropping points */}
							<AccordionItem className="border-b px-4 sm:px-0" value="dropping">
								<AccordionTrigger className="font-semibold text-sm hover:no-underline py-4">
									Dropping points
								</AccordionTrigger>
								<AccordionPanel>
									<div className="flex flex-col gap-3 pb-2 pt-1 px-1">
										{DROPPING_POINTS.map((pt) => (
											<label
												className="flex cursor-pointer items-center gap-2 text-sm"
												key={pt.id}
											>
												<Checkbox />
												{pt.label}
											</label>
										))}
									</div>
								</AccordionPanel>
							</AccordionItem>

							{/* Amenities */}
							<AccordionItem
								className="border-b px-4 sm:px-0"
								value="amenities"
							>
								<AccordionTrigger className="font-semibold text-sm hover:no-underline py-4">
									Amenities
								</AccordionTrigger>
								<AccordionPanel>
									<div className="flex flex-col gap-3 pb-2 pt-1 px-1">
										{AMENITIES.map((am) => (
											<label
												className="flex cursor-pointer items-center gap-2 text-sm"
												key={am.id}
											>
												<Checkbox />
												{am.label}
											</label>
										))}
									</div>
								</AccordionPanel>
							</AccordionItem>

							{/* Special bus features */}
							<AccordionItem
								className="px-4 sm:px-0 border-b-0"
								value="special-features"
							>
								<AccordionTrigger className="font-semibold text-sm hover:no-underline py-4">
									Special bus features
								</AccordionTrigger>
								<AccordionPanel>
									<div className="flex flex-col gap-3 pb-2 pt-1 px-1">
										{SPECIAL_FEATURES.map((sf) => (
											<label
												className="flex cursor-pointer items-center gap-2 text-sm"
												key={sf.id}
											>
												<Checkbox />
												{sf.label}
											</label>
										))}
									</div>
								</AccordionPanel>
							</AccordionItem>
						</Accordion>
					</div>
				</ScrollArea>
			</CardContent>
		</Card>
	);
}

export { FilterCard };
