import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { Colors } from "@/constants/colors";
import { type Offer, OFFERS } from "@/data/offers.data";

type Filter = "All" | "Bus";
const FILTERS: Filter[] = ["All", "Bus"];

function OfferCard({ offer }: { offer: Offer }) {
	return (
		<View style={styles.offerCard}>
			<View style={styles.offerBadge}>
				<Text style={styles.offerBadgeText}>{offer.category}</Text>
			</View>
			<Text style={styles.offerTitle}>{offer.title}</Text>
			<Text style={styles.offerValidity}>{offer.validity}</Text>
			<View style={styles.offerCodeRow}>
				<Ionicons name="pricetag-outline" size={13} color={Colors.primary} />
				<Text style={styles.offerCode}>{offer.code}</Text>
			</View>
		</View>
	);
}

export function OffersSection() {
	const [filter, setFilter] = useState<Filter>("All");

	const filteredOffers =
		filter === "All" ? OFFERS : OFFERS.filter((o) => o.category === filter);

	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Offers for you</Text>
				<Pressable>
					<Text style={styles.viewMore}>View more</Text>
				</Pressable>
			</View>

			{/* Filter chips */}
			<View style={styles.filters}>
				{FILTERS.map((f) => (
					<Pressable
						key={f}
						style={[
							styles.chip,
							filter === f ? styles.chipActive : styles.chipInactive,
						]}
						onPress={() => setFilter(f)}
					>
						<Text
							style={[
								styles.chipText,
								filter === f
									? styles.chipTextActive
									: styles.chipTextInactive,
							]}
						>
							{f}
						</Text>
					</Pressable>
				))}
			</View>

			{/* Horizontal carousel */}
			<FlatList
				data={filteredOffers}
				keyExtractor={(item) => item.id}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.carousel}
				snapToInterval={272}
				decelerationRate="fast"
				renderItem={({ item }) => <OfferCard offer={item} />}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingLeft: 20,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
		paddingRight: 20,
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: Colors.text,
		letterSpacing: -0.3,
	},
	viewMore: {
		fontSize: 13,
		fontWeight: "500",
		color: Colors.primary,
	},
	filters: {
		flexDirection: "row",
		gap: 8,
		marginBottom: 12,
	},
	chip: {
		paddingHorizontal: 14,
		paddingVertical: 6,
		borderRadius: 20,
	},
	chipActive: {
		backgroundColor: Colors.primary,
	},
	chipInactive: {
		borderWidth: 1,
		borderColor: Colors.border,
		backgroundColor: Colors.background,
	},
	chipText: {
		fontSize: 12,
		fontWeight: "600",
	},
	chipTextActive: {
		color: "#FFFFFF",
	},
	chipTextInactive: {
		color: Colors.text,
	},
	carousel: {
		gap: 12,
		paddingRight: 20,
	},
	offerCard: {
		width: 260,
		padding: 16,
		borderWidth: 1,
		borderColor: Colors.border,
		borderRadius: 16,
		backgroundColor: Colors.card,
	},
	offerBadge: {
		alignSelf: "flex-start",
		backgroundColor: Colors.primary,
		paddingHorizontal: 8,
		paddingVertical: 3,
		borderRadius: 6,
	},
	offerBadgeText: {
		color: "#FFFFFF",
		fontSize: 11,
		fontWeight: "600",
	},
	offerTitle: {
		marginTop: 10,
		fontSize: 14,
		fontWeight: "600",
		color: Colors.text,
		lineHeight: 20,
	},
	offerValidity: {
		marginTop: 4,
		fontSize: 12,
		color: Colors.textMuted,
	},
	offerCodeRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		marginTop: 12,
	},
	offerCode: {
		fontSize: 12,
		fontWeight: "700",
		color: Colors.primary,
		letterSpacing: 0.5,
	},
});
