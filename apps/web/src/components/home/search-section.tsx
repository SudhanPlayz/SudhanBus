"use client";

import { format } from "date-fns";
import { ArrowRightLeft, MapPin, MapPinned, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TextAnimate } from "@/components/ui/text-animate";
import { CityCombobox } from "./city-combobox";
import { DatePicker } from "./date-picker";

function SearchSection() {
	const router = useRouter();
	const [from, setFrom] = useState<string | null>(null);
	const [to, setTo] = useState<string | null>(null);
	const [date, setDate] = useState<Date | undefined>(undefined);

	const handleSearch = () => {
		if (!from) {
			toast.error("Please select an origin city");
			return;
		}
		if (!to) {
			toast.error("Please select a destination city");
			return;
		}
		if (!date) {
			toast.error("Please select a travel date");
			return;
		}

		const params = new URLSearchParams({
			from,
			to,
			date: format(date, "yyyy-MM-dd"),
		});

		router.push(`/search?${params.toString()}` as "/");
	};

	const handleSwap = () => {
		setFrom(to);
		setTo(from);
	};

	return (
		<div className="w-full">
			{/* Hero */}
			<div className="flex min-h-[220px] flex-col items-center justify-center bg-[url('/search_section_bg.png')] bg-center bg-cover bg-no-repeat px-4 text-center md:h-[350px]">
				<div className="mb-4 md:mb-8">
					<h1 className="font-bold text-2xl text-white tracking-tight sm:text-3xl md:text-5xl">
						<TextAnimate animation="blurInDown" as="span">
							Book Your Bus Ticket
						</TextAnimate>
					</h1>
					<p className="mt-2 text-sm text-white/90 sm:text-base md:mt-4 md:text-lg">
						<TextAnimate animation="blurInDown" as="span" delay={0.2}>
							Search and book bus tickets across India
						</TextAnimate>
					</p>
				</div>
			</div>

			{/* Search Card */}
			<div className="-mt-16 flex justify-center px-4 pb-12 md:-mt-24 md:pb-20">
				<Card className="relative w-full max-w-4xl overflow-visible border-0 shadow-xl">
					<CardContent className="p-4 md:p-6">
						<div className="flex flex-col gap-4 md:flex-row md:divide-x">
							{/* From */}
							<div className="relative flex flex-1 items-center gap-2 pr-0 md:pr-4">
								<CityCombobox
									className="flex-1 [&_div[data-slot=input-group]]:border-0 [&_div[data-slot=input-group]]:bg-transparent [&_div[data-slot=input-group]]:shadow-none"
									disabledValues={[to]}
									icon={<MapPin className="size-4 text-muted-foreground" />}
									label="From"
									onValueChange={setFrom}
									placeholder="Select origin"
									value={from}
								/>

								{/* Swap button */}
								<Button
									className="mx-auto my-2 rounded-full border bg-background shadow-sm md:absolute md:top-1/2 md:right-0 md:translate-x-1/2 md:-translate-y-1/2"
									onClick={handleSwap}
									size="icon-xs"
									variant="outline"
								>
									<ArrowRightLeft className="size-3.5" />
									<span className="sr-only">Swap</span>
								</Button>
							</div>

							{/* To */}
							<div className="relative flex flex-1 items-center gap-2 px-0 md:px-3">
								<CityCombobox
									className="flex-1 [&_div[data-slot=input-group]]:border-0 [&_div[data-slot=input-group]]:bg-transparent [&_div[data-slot=input-group]]:shadow-none"
									disabledValues={[from]}
									icon={<MapPinned className="size-4 text-muted-foreground" />}
									label="To"
									onValueChange={setTo}
									placeholder="Select destination"
									value={to}
								/>
							</div>

							{/* Date */}
							<div className="flex flex-1 items-start overflow-visible px-3">
								<DatePicker
									className="border-0 bg-transparent shadow-none"
									date={date}
									onDateChange={setDate}
								/>
							</div>
						</div>

						{/* Search button — flow on mobile, absolute on desktop */}
						<div className="mt-4 flex justify-center md:absolute md:-bottom-6 md:left-1/2 md:mt-0 md:-translate-x-1/2">
							<Button
								className="h-12 w-full rounded-full bg-primary font-semibold text-base shadow-lg hover:bg-primary/90 md:w-48"
								onClick={handleSearch}
								size="lg"
							>
								<Search className="mr-2 size-5" />
								Search buses
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

export { SearchSection };
