"use client";

import {
	Bed,
	Cookie,
	Droplet,
	PlugZap,
	Star,
	Tag,
	Tv,
	Wifi,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Bus } from "./bus-data";

interface BusCardProps {
	bus: Bus;
}

const AMENITY_ICONS: Record<string, React.ReactNode> = {
	WiFi: <Wifi className="size-3" />,
	"Charging Point": <PlugZap className="size-3" />,
	Blanket: <Bed className="size-3" />,
	"Water Bottle": <Droplet className="size-3" />,
	Snacks: <Cookie className="size-3" />,
	Entertainment: <Tv className="size-3" />,
};

function OfferBadge({ text }: { text: string }) {
	return (
		<div className="relative mb-2 inline-flex items-center gap-1 overflow-hidden rounded-md bg-[#FCE39E] px-3 py-1 font-medium text-[#212121] text-[11px]">
			{/* Left cutout */}
			<div className="absolute top-1/2 -left-1.5 size-3 -translate-y-1/2 rounded-full bg-white" />
			{/* Right cutout */}
			<div className="absolute top-1/2 -right-1.5 size-3 -translate-y-1/2 rounded-full bg-white" />

			<Tag className="size-3 fill-current" />
			{text}
		</div>
	);
}

function getRatingDemographics(rating: number, total: number) {
	// Simple deterministic breakdown
	const r5 = Math.floor(total * (rating / 5) * 0.8);
	const r4 = Math.floor(total * (rating / 5) * 0.15);
	const r3 = Math.floor(total * 0.05);
	const r2 = Math.floor(total * 0.02);
	const r1 = total - (r5 + r4 + r3 + r2);

	return [
		{ stars: 5, count: Math.max(0, r5) },
		{ stars: 4, count: Math.max(0, r4) },
		{ stars: 3, count: Math.max(0, r3) },
		{ stars: 2, count: Math.max(0, r2) },
		{ stars: 1, count: Math.max(0, r1) },
	];
}

function BusCard({ bus }: BusCardProps) {
	const hasDiscount = bus.price < bus.originalPrice;
	const ratingData = getRatingDemographics(bus.rating, bus.totalRatings);

	return (
		<Card className="border-gray-300 transition-shadow hover:shadow-md">
			<CardContent className="p-4 md:p-5">
				<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
					{/* Left: Operator info */}
					<div className="min-w-0 flex-1 space-y-1">
						<div className="flex flex-wrap items-center gap-2">
							<h4 className="truncate font-semibold text-sm">{bus.name}</h4>
							{/* Rating badge */}
							<Tooltip>
								<TooltipTrigger className="cursor-pointer">
									<Badge
										className="gap-1 rounded-md px-1.5 py-0.5 text-[11px]"
										variant="default"
									>
										<Star className="size-3 fill-current" />
										{bus.rating.toFixed(1)}
									</Badge>
								</TooltipTrigger>
								<TooltipContent className="w-64 p-3 bg-popover text-popover-foreground border shadow-md">
									<div className="space-y-2">
										<p className="font-semibold text-sm">Rating Breakdown</p>
										{ratingData.map((row) => (
											<div
												className="flex items-center gap-2 text-xs"
												key={row.stars}
											>
												<div className="flex w-8 items-center gap-1 font-medium">
													{row.stars}{" "}
													<Star className="size-3 fill-current text-muted-foreground" />
												</div>
												<div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
													<div
														className="h-full bg-primary"
														style={{
															width: `${Math.max(0, Math.min(100, (row.count / bus.totalRatings) * 100))}%`,
														}}
													/>
												</div>
												<div className="w-8 text-right text-muted-foreground">
													{row.count}
												</div>
											</div>
										))}
									</div>
								</TooltipContent>
							</Tooltip>
							<span className="text-muted-foreground text-xs">
								({bus.totalRatings.toLocaleString()})
							</span>
						</div>
						<p className="text-muted-foreground text-xs">{bus.type}</p>
						{bus.amenities.length > 0 && (
							<div className="flex flex-wrap gap-1.5 pt-1">
								{bus.amenities.map((amenity) => (
									<Badge
										className="gap-1 px-1.5 py-0.5 text-[10px]"
										key={amenity}
										variant="outline"
									>
										{AMENITY_ICONS[amenity]}
										{amenity}
									</Badge>
								))}
							</div>
						)}
					</div>

					{/* Center: Time info */}
					<div className="flex items-center gap-3 md:gap-6">
						<div className="text-center">
							<p className="font-bold text-base">{bus.departureTime}</p>
						</div>
						<div className="flex flex-col items-center gap-0.5">
							<span className="text-[11px] text-muted-foreground">
								{bus.duration}
							</span>
							<div className="flex items-center gap-1">
								<div className="h-px w-8 bg-border md:w-12" />
								<div className="size-1.5 rounded-full border border-muted-foreground" />
							</div>
						</div>
						<div className="text-center">
							<p className="font-bold text-base">{bus.arrivalTime}</p>
						</div>
					</div>

					{/* Right: Price + Seats + CTA */}
					<div className="flex items-center justify-between gap-4 md:flex-col md:items-end md:justify-center">
						<div className="flex flex-col items-end">
							{bus.offer && <OfferBadge text={bus.offer} />}
							<div className="flex items-baseline gap-1.5">
								{hasDiscount && (
									<span className="text-muted-foreground text-xs line-through">
										₹{bus.originalPrice.toLocaleString()}
									</span>
								)}
								<span className="font-bold text-base">
									₹{bus.price.toLocaleString()}
								</span>
							</div>
							<p className="text-muted-foreground text-xs">
								{bus.seatsAvailable} seats left
							</p>
						</div>
						<Link
							className="inline-flex h-9 min-w-[120px] items-center justify-center rounded-full bg-primary font-bold text-sm text-white shadow-md hover:bg-primary/90"
							href={`/search/book/${bus.id}`}
						>
							View seats
						</Link>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export { BusCard };
