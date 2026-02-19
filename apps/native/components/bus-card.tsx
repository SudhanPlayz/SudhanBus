import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";
import type { Bus } from "@/data/bus.data";

const AMENITY_ICONS: Record<string, string> = {
	WiFi: "wifi-outline",
	"Charging Point": "flash-outline",
	Blanket: "bed-outline",
	"Water Bottle": "water-outline",
	Snacks: "fast-food-outline",
	Entertainment: "tv-outline",
};

function OfferBadge({ text }: { text: string }) {
	return (
		<View style={styles.offerBadge}>
			<Ionicons color={Colors.offerBadgeText} name="pricetag" size={11} />
			<Text style={styles.offerBadgeText}>{text}</Text>
		</View>
	);
}

export function BusCard({ bus }: { bus: Bus }) {
	const router = useRouter();
	const hasDiscount = bus.price < bus.originalPrice;

	return (
		<View style={styles.card}>
			{/* Top: Name + Rating */}
			<View style={styles.topRow}>
				<View style={styles.nameRow}>
					<Text numberOfLines={1} style={styles.busName}>
						{bus.name}
					</Text>
					<View style={styles.ratingBadge}>
						<Ionicons color="#FFFFFF" name="star" size={11} />
						<Text style={styles.ratingText}>{bus.rating}</Text>
					</View>
					<Text style={styles.totalRatings}>
						({bus.totalRatings.toLocaleString()})
					</Text>
				</View>
				<Text style={styles.busType}>{bus.type}</Text>
			</View>

			{/* Amenities */}
			{bus.amenities.length > 0 && (
				<View style={styles.amenitiesRow}>
					{bus.amenities.map((amenity) => (
						<View key={amenity} style={styles.amenityChip}>
							<Ionicons
								color={Colors.textSecondary}
								name={(AMENITY_ICONS[amenity] || "ellipse-outline") as any}
								size={10}
							/>
							<Text style={styles.amenityText}>{amenity}</Text>
						</View>
					))}
				</View>
			)}

			{/* Time + Price row */}
			<View style={styles.bottomRow}>
				{/* Time info */}
				<View style={styles.timeRow}>
					<Text style={styles.timeText}>{bus.departureTime}</Text>
					<View style={styles.durationCol}>
						<Text style={styles.durationText}>{bus.duration}</Text>
						<View style={styles.durationLine}>
							<View style={styles.line} />
							<View style={styles.dot} />
						</View>
					</View>
					<Text style={styles.timeText}>{bus.arrivalTime}</Text>
				</View>

				{/* Price + CTA */}
				<View style={styles.priceCol}>
					{bus.offer && <OfferBadge text={bus.offer} />}
					<View style={styles.priceRow}>
						{hasDiscount && (
							<Text style={styles.originalPrice}>
								₹{bus.originalPrice.toLocaleString()}
							</Text>
						)}
						<Text style={styles.price}>₹{bus.price.toLocaleString()}</Text>
					</View>
					<Text style={styles.seatsLeft}>{bus.seatsAvailable} seats left</Text>
					<Pressable
						onPress={() => router.push(`/booking/${bus.id}` as any)}
						style={styles.viewSeatsButton}
					>
						<Text style={styles.viewSeatsText}>View seats</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: Colors.card,
		borderWidth: 1,
		borderColor: Colors.border,
		borderRadius: 14,
		padding: 14,
		gap: 10,
	},
	topRow: {
		gap: 2,
	},
	nameRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
	busName: {
		fontSize: 14,
		fontWeight: "600",
		color: Colors.text,
		flexShrink: 1,
	},
	ratingBadge: {
		flexDirection: "row",
		alignItems: "center",
		gap: 3,
		backgroundColor: Colors.primary,
		paddingHorizontal: 5,
		paddingVertical: 2,
		borderRadius: 5,
	},
	ratingText: {
		color: "#FFFFFF",
		fontSize: 11,
		fontWeight: "600",
	},
	totalRatings: {
		fontSize: 11,
		color: Colors.textMuted,
	},
	busType: {
		fontSize: 12,
		color: Colors.textSecondary,
	},
	amenitiesRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 6,
	},
	amenityChip: {
		flexDirection: "row",
		alignItems: "center",
		gap: 3,
		borderWidth: 1,
		borderColor: Colors.border,
		borderRadius: 6,
		paddingHorizontal: 6,
		paddingVertical: 3,
	},
	amenityText: {
		fontSize: 10,
		color: Colors.textSecondary,
	},
	bottomRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	timeRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	timeText: {
		fontSize: 16,
		fontWeight: "700",
		color: Colors.text,
	},
	durationCol: {
		alignItems: "center",
		gap: 2,
	},
	durationText: {
		fontSize: 10,
		color: Colors.textMuted,
	},
	durationLine: {
		flexDirection: "row",
		alignItems: "center",
		gap: 2,
	},
	line: {
		width: 28,
		height: 1,
		backgroundColor: Colors.border,
	},
	dot: {
		width: 5,
		height: 5,
		borderRadius: 3,
		borderWidth: 1,
		borderColor: Colors.textMuted,
	},
	priceCol: {
		alignItems: "flex-end",
		gap: 2,
	},
	priceRow: {
		flexDirection: "row",
		alignItems: "baseline",
		gap: 6,
	},
	originalPrice: {
		fontSize: 12,
		color: Colors.textMuted,
		textDecorationLine: "line-through",
	},
	price: {
		fontSize: 16,
		fontWeight: "700",
		color: Colors.text,
	},
	seatsLeft: {
		fontSize: 11,
		color: Colors.textMuted,
	},
	viewSeatsButton: {
		backgroundColor: Colors.primary,
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		marginTop: 4,
	},
	viewSeatsText: {
		color: "#FFFFFF",
		fontWeight: "600",
		fontSize: 13,
	},
	offerBadge: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		backgroundColor: Colors.offerBadgeBg,
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 6,
		marginBottom: 2,
	},
	offerBadgeText: {
		fontSize: 10,
		fontWeight: "500",
		color: Colors.offerBadgeText,
	},
});
