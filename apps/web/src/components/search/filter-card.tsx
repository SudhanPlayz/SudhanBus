"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
		<Card className="w-full border shadow-sm">
			<CardContent className="p-5">
				<h3 className="mb-4 text-center font-bold text-base tracking-tight">
					Filter buses
				</h3>
				<Separator className="mb-4" />

				{/* Bus Type */}
				<div className="space-y-3">
					<p className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
						Bus Type
					</p>
					<div className="flex flex-wrap gap-x-4 gap-y-2.5">
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
				</div>

				<Separator className="my-4" />

				{/* Departure Time */}
				<div className="space-y-3">
					<p className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
						Departure Time
					</p>
					<div className="flex flex-wrap gap-x-4 gap-y-2.5">
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
				</div>
			</CardContent>
		</Card>
	);
}

export { FilterCard };
