"use client";

import { OffersSection } from "@/components/home/offers-section";
import { PopularRoutesSection } from "@/components/home/popular-routes-section";
import { SearchSection } from "@/components/home/search-section";

export default function Home() {
	return (
		<div className="flex flex-col items-center gap-6 md:gap-10">
			<SearchSection />
			<OffersSection />
			<PopularRoutesSection />
		</div>
	);
}
