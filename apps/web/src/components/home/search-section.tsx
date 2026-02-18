"use client";

import { MapPin, MapPinned, Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { TextAnimate } from "@/components/ui/text-animate";
import { CityCombobox } from "./city-combobox";
import { DatePicker } from "./date-picker";

function SearchSection() {
	const [from, setFrom] = useState<string | null>(null);
	const [to, setTo] = useState<string | null>(null);
	const [date, setDate] = useState<Date | undefined>(undefined);

	return (
		<div className="flex w-full items-center justify-center px-4">
			<Card className="w-full max-w-6xl border-0 shadow-none md:border">
				<CardHeader className="text-center">
					<CardTitle className="font-semibold text-2xl tracking-tight sm:text-3xl">
						<TextAnimate animation="blurInDown" as="span">
							Book Your Bus Ticket
						</TextAnimate>
					</CardTitle>
					<CardDescription>
						<TextAnimate animation="blurInDown" as="span" delay={0.2}>
							Search and book bus tickets across India
						</TextAnimate>
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-3 md:flex-row md:items-end md:gap-4">
						<CityCombobox
							className="flex-1"
							icon={<MapPin className="size-4 text-muted-foreground" />}
							label="From"
							onValueChange={setFrom}
							placeholder="Select origin"
							value={from}
						/>
						<CityCombobox
							className="flex-1"
							icon={<MapPinned className="size-4 text-muted-foreground" />}
							label="To"
							onValueChange={setTo}
							placeholder="Select destination"
							value={to}
						/>
						<DatePicker date={date} onDateChange={setDate} />
						<Button
							className="h-8 w-full gap-2 md:w-auto"
							size="default"
							variant="outline"
						>
							<Search className="size-4" />
							Search
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export { SearchSection };
