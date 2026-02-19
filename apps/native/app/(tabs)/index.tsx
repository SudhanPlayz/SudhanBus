import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SearchSection } from "@/components/search-section";
import { OffersSection } from "@/components/offers-section";
import { PopularRoutesSection } from "@/components/popular-routes-section";
import { Colors } from "@/constants/colors";

export default function HomeScreen() {
	const router = useRouter();
	const insets = useSafeAreaInsets();

	return (
		<View style={styles.container}>
			{/* Header right button */}
			<ScrollView
				contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 16 }]}
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
