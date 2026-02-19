import { View } from "react-native";
import { Container } from "@/components/container";
import { OffersSection } from "@/components/home/offers-section";
import { PopularRoutesSection } from "@/components/home/popular-routes-section";
import { SearchSection } from "@/components/home/search-section";

export default function Home() {
	return (
		<Container>
			<View className="gap-6 pb-8">
				<SearchSection />
				<OffersSection />
				<PopularRoutesSection />
			</View>
		</Container>
	);
}
