"use client";

import { format } from "date-fns";
import { ArrowDown, ArrowRightLeft, ArrowUp, MapPin, MapPinned, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CityCombobox } from "@/components/home/city-combobox";
import { DatePicker } from "@/components/home/date-picker";
import { BusCard } from "./bus-card";
import { DEMO_BUSES } from "./bus-data";
import { FilterCard } from "./filter-card";

const SORT_OPTIONS = ["Ratings", "Departure time", "Price"] as const;
type SortOption = typeof SORT_OPTIONS[number];

interface SearchResultsProps {
	from: string;
	to: string;
	date: string;
}

function SearchResults({ from: initialFrom, to: initialTo, date: initialDate }: SearchResultsProps) {
	const router = useRouter();
	const [activeSort, setActiveSort] = useState<SortOption>("Ratings");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
	
	const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
	const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

	const [from, setFrom] = useState<string | null>(initialFrom);
	const [to, setTo] = useState<string | null>(initialTo);
	const [date, setDate] = useState<Date | undefined>(() => {
		try {
			const d = new Date(initialDate);
			d.setHours(0, 0, 0, 0);
			return d;
		} catch {
			return undefined;
		}
	});

	const handleSwap = () => {
		setFrom(to);
		setTo(from);
	};

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

	const handleTypeChange = (type: string, checked: boolean) => {
		setSelectedTypes((prev) =>
			checked ? [...prev, type] : prev.filter((t) => t !== type)
		);
	};

	const handleTimeChange = (time: string, checked: boolean) => {
		setSelectedTimes((prev) =>
			checked ? [...prev, time] : prev.filter((t) => t !== time)
		);
	};

	const filteredBuses = DEMO_BUSES.filter((bus) => {
		// Type filter
		if (selectedTypes.length > 0) {
			const typeLower = bus.type.toLowerCase();
			const matchesType = selectedTypes.some((type) => {
				if (type === "ac") return typeLower.includes("a/c") && !typeLower.includes("non a/c");
				if (type === "non-ac") return typeLower.includes("non a/c");
				if (type === "sleeper") return typeLower.includes("sleeper");
				if (type === "seater") return typeLower.includes("seater");
				return false;
			});
			if (!matchesType) return false;
		}

		// Time filter
		if (selectedTimes.length > 0) {
			const hour = parseInt(bus.departureTime.split(":")[0]);
			const matchesTime = selectedTimes.some((time) => {
				if (time === "morning") return hour >= 6 && hour < 12;
				if (time === "afternoon") return hour >= 12 && hour < 18;
				if (time === "evening") return hour >= 18 && hour < 24;
				if (time === "night") return hour >= 0 && hour < 6;
				return false;
			});
			if (!matchesTime) return false;
		}

		return true;
	});

	const sortedBuses = [...filteredBuses].sort((a, b) => {
		let comparison = 0;
		if (activeSort === "Price") comparison = a.price - b.price;
		if (activeSort === "Ratings") comparison = a.rating - b.rating;
		if (activeSort === "Departure time")
			comparison = a.departureTime.localeCompare(b.departureTime);
		
		return sortOrder === "asc" ? comparison : -comparison;
	});

	return (
		<div className="flex h-[calc(100svh-3rem)] flex-col bg-gray-100/50">
			{/* Search bar */}
			<div className="border-b bg-card px-4 py-3">
				<div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-end md:gap-2">
					{/* From */}
					<div className="relative flex flex-1 items-center gap-2">
						<CityCombobox
							className="flex-1 [&_div[data-slot=input-group]]:h-9 [&_div[data-slot=input-group]]:text-sm"
							disabledValues={[to]}
							icon={<MapPin className="size-4 text-muted-foreground" />}
							label="From"
							onValueChange={setFrom}
							placeholder="Select origin"
							value={from}
						/>

						{/* Swap button */}
						<Button
							className="mt-5 shrink-0 rounded-full border bg-background shadow-sm"
							onClick={handleSwap}
							size="icon-xs"
							variant="outline"
						>
							<ArrowRightLeft className="size-3.5" />
							<span className="sr-only">Swap</span>
						</Button>
					</div>

					{/* To */}
					<div className="flex flex-1 items-center">
						<CityCombobox
							className="flex-1 [&_div[data-slot=input-group]]:h-9 [&_div[data-slot=input-group]]:text-sm"
							disabledValues={[from]}
							icon={<MapPinned className="size-4 text-muted-foreground" />}
							label="To"
							onValueChange={setTo}
							placeholder="Select destination"
							value={to}
						/>
					</div>

					{/* Date */}
					<div className="flex flex-1 items-start overflow-visible">
						<DatePicker
							className="[&_button]:h-9 [&_button]:text-sm"
							date={date}
							onDateChange={setDate}
						/>
					</div>

					{/* Search button */}
					<Button
						className="mt-1 h-9 shrink-0 rounded-full bg-primary px-6 font-semibold text-sm shadow-md hover:bg-primary/90 md:mt-5"
						onClick={handleSearch}
					>
						<Search className="mr-1.5 size-4" />
						Search
					</Button>
				</div>
			</div>

			{/* Sort bar */}
			<div className="border-b-2 border-b-primary/20 bg-card shadow-sm">
				<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5">
					<span className="font-bold text-sm">
						{sortedBuses.length} buses found
					</span>
					<div className="flex items-center gap-1">
						<span className="mr-1 text-muted-foreground text-sm font-medium">Sort by:</span>
						{SORT_OPTIONS.map((opt) => (
							<div className="flex items-center" key={opt}>
								<button
									className={cn(
										"rounded-md px-3 py-1 text-sm transition-colors",
										opt === activeSort
											? "font-semibold text-primary"
											: "text-foreground hover:text-primary"
									)}
									onClick={() => {
										if (activeSort === opt) {
											setSortOrder(sortOrder === "asc" ? "desc" : "asc");
										} else {
											setActiveSort(opt);
											// Smart default sorting
											if (opt === "Ratings") setSortOrder("desc");
											else setSortOrder("asc");
										}
									}}
								>
									{opt}
								</button>
								{opt === activeSort && (
									<div className="ml-1 flex flex-col -space-y-1.5">
										<ArrowUp
											className={cn(
												"size-3 cursor-pointer transition-colors hover:text-primary",
												sortOrder === "asc"
													? "text-primary"
													: "text-muted-foreground/30"
											)}
											onClick={() => setSortOrder("asc")}
										/>
										<ArrowDown
											className={cn(
												"size-3 cursor-pointer transition-colors hover:text-primary",
												sortOrder === "desc"
													? "text-primary"
													: "text-muted-foreground/30"
											)}
											onClick={() => setSortOrder("desc")}
										/>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Main content */}
			<div className="mx-auto flex w-full max-w-6xl flex-1 gap-5 overflow-hidden px-4 py-4">
				{/* Filter sidebar — sticky on desktop, hidden on mobile */}
				<aside className="hidden w-[280px] shrink-0 md:block">
					<div className="sticky top-0">
						<FilterCard
							onTimeChange={handleTimeChange}
							onTypeChange={handleTypeChange}
							selectedTimes={selectedTimes}
							selectedTypes={selectedTypes}
						/>
					</div>
				</aside>

				{/* Bus cards — scrollable */}
				<ScrollArea className="flex-1">
					<div className="space-y-3 pr-3 pb-4">
						{sortedBuses.map((bus) => (
							<BusCard bus={bus} key={bus.id} />
						))}
						{sortedBuses.length === 0 && (
							<div className="py-10 text-center text-muted-foreground">
								No buses found matching your criteria.
							</div>
						)}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
}

export { SearchResults };
