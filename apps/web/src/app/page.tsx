"use client";

import { OffersSection } from "@/components/home/offers-section";
import { PopularRoutesSection } from "@/components/home/popular-routes-section";
import { SearchSection } from "@/components/home/search-section";

export default function Home() {
	return (
		<div className="flex flex-col items-center gap-10 py-8">
			<SearchSection />
			<OffersSection />
			<PopularRoutesSection />
		</div>
	);
}
