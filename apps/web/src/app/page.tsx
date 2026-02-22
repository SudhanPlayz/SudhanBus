export const runtime = "edge";

import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";
import { FAQSection } from "@/components/home/faq-section";
import { OffersSection } from "@/components/home/offers-section";
import { PopularRoutesSection } from "@/components/home/popular-routes-section";
import { SearchSection } from "@/components/home/search-section";

export default function Home() {
	return (
		<div className="flex flex-col items-center gap-6 md:gap-10">
			<SearchSection />
			<OffersSection />
			<PopularRoutesSection />
			<AboutSection />
			<FAQSection />
			<ContactSection />
		</div>
	);
}
