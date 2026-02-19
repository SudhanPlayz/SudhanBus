"use client";

import { Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

import { OFFERS, type Offer } from "./offers-data";

type Filter = "All" | "Bus";

const FILTERS: Filter[] = ["All", "Bus"];

function OfferCard({ offer }: { offer: Offer }) {
	return (
		<div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-5">
			{/* Category badge */}
			<div>
				<span className="inline-block rounded-md bg-primary px-2 py-0.5 font-semibold text-primary-foreground text-xs">
					{offer.category}
				</span>
				<h3 className="mt-3 font-semibold text-card-foreground text-sm leading-snug">
					{offer.title}
				</h3>
				<p className="mt-1 text-muted-foreground text-xs">{offer.validity}</p>
			</div>

			{/* Coupon code */}
			<div className="mt-4 flex items-center gap-1.5 text-primary">
				<Tag className="size-3.5" />
				<span className="font-bold text-xs tracking-wide">{offer.code}</span>
			</div>

			{/* Border beam effect */}
			<BorderBeam
				borderWidth={1.5}
				colorFrom="#ef4444"
				colorTo="#f97316"
				duration={8}
				size={60}
			/>
		</div>
	);
}

function OffersSection() {
	const [filter, setFilter] = useState<Filter>("All");
	const [api, setApi] = useState<CarouselApi>();
	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(false);

	useEffect(() => {
		if (!api) {
			return;
		}

		setCanScrollPrev(api.canScrollPrev());
		setCanScrollNext(api.canScrollNext());

		api.on("select", () => {
			setCanScrollPrev(api.canScrollPrev());
			setCanScrollNext(api.canScrollNext());
		});

		api.on("reInit", () => {
			setCanScrollPrev(api.canScrollPrev());
			setCanScrollNext(api.canScrollNext());
		});
	}, [api]);

	const filteredOffers =
		filter === "All" ? OFFERS : OFFERS.filter((o) => o.category === filter);

	return (
		<div className="w-full px-4">
			<div className="mx-auto max-w-3xl">
				{/* Header */}
				<div className="mb-4 flex items-center justify-between">
					<h2 className="font-semibold text-lg tracking-tight">
						Offers for you
					</h2>
					<button
						className="font-medium text-primary text-sm hover:underline"
						type="button"
					>
						View more
					</button>
				</div>

				{/* Filter tabs */}
				<div className="mb-4 flex gap-2">
					{FILTERS.map((f) => (
						<Button
							className="h-7 rounded-full px-3 text-xs"
							key={f}
							onClick={() => setFilter(f)}
							size="sm"
							variant={filter === f ? "default" : "outline"}
						>
							{f}
						</Button>
					))}
				</div>

				{/* Carousel */}
				<Carousel className="w-full" opts={{ align: "start" }} setApi={setApi}>
					<CarouselContent className="-ml-3">
						{filteredOffers.map((offer) => (
							<CarouselItem
								className="basis-[80%] pl-3 sm:basis-1/2 lg:basis-1/3"
								key={offer.id}
							>
								<OfferCard offer={offer} />
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious
						className={cn(
							"-left-4 hidden sm:-left-5 sm:flex",
							!canScrollPrev && "hidden sm:hidden"
						)}
					/>
					<CarouselNext
						className={cn(
							"-right-4 hidden sm:-right-5 sm:flex",
							!canScrollNext && "hidden sm:hidden"
						)}
					/>
				</Carousel>
			</div>
		</div>
	);
}

export { OffersSection };
