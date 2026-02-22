"use client";

import { format } from "date-fns";
import {
	ArrowDown,
	ArrowRightLeft,
	ArrowUp,
	MapPin,
	MapPinned,
	Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { CityCombobox } from "@/components/home/city-combobox";
import { DatePicker } from "@/components/home/date-picker";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { BusCard } from "./bus-card";
import { DEMO_BUSES } from "./bus-data";
import {
	AMENITIES,
	BUS_FEATURES,
	BUS_OPERATORS,
	FilterCard,
	type FilterState,
} from "./filter-card";

const SORT_OPTIONS = ["Ratings", "Departure time", "Price"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

interface SearchResultsProps {
	date: string;
	from: string;
	to: string;
}

function SearchResults({
	from: initialFrom,
	to: initialTo,
	date: initialDate,
}: SearchResultsProps) {
	const router = useRouter();
	const [activeSort, setActiveSort] = useState<SortOption>("Ratings");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

	const [filters, setFilters] = useState<FilterState>({
		departureTimes: [],
		arrivalTimes: [],
		busTypes: [],
		seaterSleeper: [],
		features: [],
		operators: [],
		boardingPoints: [],
		droppingPoints: [],
		amenities: [],
		specialFeatures: [],
	});

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

	const handleFilterChange = (
		category: keyof FilterState,
		id: string,
		checked: boolean
	) => {
		setFilters((prev) => ({
			...prev,
			[category]: checked
				? [...prev[category], id]
				: prev[category].filter((val) => val !== id),
		}));
	};

	const filteredBuses = DEMO_BUSES.filter((bus) => {
		// Bus Type
		if (filters.busTypes.length > 0) {
			const typeLower = bus.type.toLowerCase();
			const matchesType = filters.busTypes.some((type) => {
				if (type === "ac") {
					return typeLower.includes("a/c") && !typeLower.includes("non a/c");
				}
				if (type === "non-ac") {
					return typeLower.includes("non a/c");
				}
				if (type === "sleeper") {
					return typeLower.includes("sleeper");
				}
				if (type === "seater") {
					return typeLower.includes("seater");
				}
				return false;
			});
			if (!matchesType) {
				return false;
			}
		}

		// Departure Time
		if (filters.departureTimes.length > 0) {
			const hour = Number.parseInt(bus.departureTime.split(":")[0], 10);
			const matchesTime = filters.departureTimes.some((time) => {
				if (time === "morning") return hour >= 6 && hour < 12;
				if (time === "afternoon") return hour >= 12 && hour < 18;
				if (time === "evening") return hour >= 18 && hour < 24;
				if (time === "night") return hour >= 0 && hour < 6;
				return false;
			});
			if (!matchesTime) return false;
		}

		// Arrival Time
		if (filters.arrivalTimes.length > 0) {
			const hour = Number.parseInt(bus.arrivalTime.split(":")[0], 10);
			const matchesTime = filters.arrivalTimes.some((time) => {
				if (time === "morning") return hour >= 6 && hour < 12;
				if (time === "afternoon") return hour >= 12 && hour < 18;
				if (time === "evening") return hour >= 18 && hour < 24;
				if (time === "night") return hour >= 0 && hour < 6;
				return false;
			});
			if (!matchesTime) return false;
		}

		// Operators
		if (filters.operators.length > 0) {
			const matchesOperator = filters.operators.some((opId) => {
				const opDef = BUS_OPERATORS.find((op) => op.id === opId);
				return opDef
					? bus.name.toLowerCase().includes(opDef.label.toLowerCase())
					: false;
			});
			if (!matchesOperator) return false;
		}

		// Features
		if (filters.features.length > 0) {
			const matchesAllFeatures = filters.features.map((fId) => {
				const fDef = BUS_FEATURES.find((f) => f.id === fId);
				return fDef
					? bus.amenities.some(
							(a) => a.toLowerCase() === fDef.label.toLowerCase()
						)
					: false;
			});
			// Must have ALL selected features? Let's use EVERY. Wait, if array of booleans, use .every
			const hasAll = matchesAllFeatures.every(Boolean);
			if (!hasAll) return false;
		}

		// Amenities
		if (filters.amenities.length > 0) {
			const matchesAllAmenities = filters.amenities.map((aId) => {
				const aDef = AMENITIES.find((a) => a.id === aId);
				return aDef
					? bus.amenities.some(
							(a) => a.toLowerCase() === aDef.label.toLowerCase()
						)
					: false;
			});
			const hasAll = matchesAllAmenities.every(Boolean);
			if (!hasAll) return false;
		}

		// Single Window Seater/Sleeper
		if (filters.seaterSleeper.length > 0) {
			const matchesSeaterSleeper = filters.seaterSleeper.some((id) => {
				if (id === "single") {
					return (
						bus.type.includes("2+1") ||
						bus.type.includes("1+1") ||
						bus.type.includes("1+2")
					);
				}
				return false;
			});
			if (!matchesSeaterSleeper) return false;
		}

		return true;
	});

	const sortedBuses = [...filteredBuses].sort((a, b) => {
		let comparison = 0;
		if (activeSort === "Price") {
			comparison = a.price - b.price;
		}
		if (activeSort === "Ratings") {
			comparison = a.rating - b.rating;
		}
		if (activeSort === "Departure time") {
			comparison = a.departureTime.localeCompare(b.departureTime);
		}

		return sortOrder === "asc" ? comparison : -comparison;
	});

	return (
		<div className="flex min-h-[calc(100svh-4rem)] flex-col bg-gray-100/50">
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
						className="cursor-pointer mt-1 h-9 shrink-0 rounded-full bg-primary px-6 font-semibold text-sm shadow-md hover:bg-primary/90 md:mt-5"
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
						<span className="mr-1 font-medium text-muted-foreground text-sm">
							Sort by:
						</span>
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
											if (opt === "Ratings") {
												setSortOrder("desc");
											} else {
												setSortOrder("asc");
											}
										}
									}}
								>
									{opt}
								</button>
								{opt === activeSort && (
									<div className="ml-1 flex flex-col -space-y-1.5">
										<button
											className="cursor-pointer"
											onClick={() => setSortOrder("asc")}
											type="button"
										>
											<ArrowUp
												className={cn(
													"size-3 transition-colors hover:text-primary",
													sortOrder === "asc"
														? "text-primary"
														: "text-muted-foreground/30"
												)}
											/>
											<span className="sr-only">Sort ascending</span>
										</button>
										<button
											className="cursor-pointer"
											onClick={() => setSortOrder("desc")}
											type="button"
										>
											<ArrowDown
												className={cn(
													"size-3 transition-colors hover:text-primary",
													sortOrder === "desc"
														? "text-primary"
														: "text-muted-foreground/30"
												)}
											/>
											<span className="sr-only">Sort descending</span>
										</button>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Main content */}
			<div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-6 px-4 py-6 md:grid-cols-[280px_1fr]">
				{/* Filter sidebar — sticky on desktop, hidden on mobile */}
				<aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] overflow-hidden md:block">
					<FilterCard filters={filters} onFilterChange={handleFilterChange} />
				</aside>

				{/* Bus cards */}
				<main>
					<div className="space-y-3 pb-4">
						{sortedBuses.map((bus) => (
							<BusCard bus={bus} key={bus.id} />
						))}
						{sortedBuses.length === 0 && (
							<div className="py-10 text-center text-muted-foreground">
								No buses found matching your criteria.
							</div>
						)}
					</div>
				</main>
			</div>
		</div>
	);
}

export { SearchResults };
