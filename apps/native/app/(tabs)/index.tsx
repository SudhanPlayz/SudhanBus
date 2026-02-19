import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { OffersSection } from "@/components/offers-section";
import { PopularRoutesSection } from "@/components/popular-routes-section";
import { SearchSection } from "@/components/search-section";
import { Colors } from "@/constants/colors";

export default function HomeScreen() {
	const _router = useRouter();
	const insets = useSafeAreaInsets();

	return (
		<View style={styles.container}>
			{/* Header right button */}
			<ScrollView
				contentContainerStyle={[
					styles.scrollContent,
					{ paddingBottom: insets.bottom + 16 },
				]}
				showsVerticalScrollIndicator={false}
			>
				<SearchSection />
				<OffersSection />
				<PopularRoutesSection />
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
	},
	scrollContent: {
		gap: 24,
	},
});
