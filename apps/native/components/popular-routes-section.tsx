import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";
import { type Route, POPULAR_ROUTES } from "@/data/popular-routes.data";

function RouteItem({ route }: { route: Route }) {
	const router = useRouter();

	const handleBookNow = () => {
		router.push({
			pathname: "/search" as any,
			params: {
				from: route.from.toLowerCase(),
				to: route.to.toLowerCase(),
				date: format(new Date(), "yyyy-MM-dd"),
			},
		});
	};

	return (
		<View style={styles.routeCard}>
			{/* Route info */}
			<View style={styles.routeInfo}>
				<View style={styles.routeRow}>
					<Text style={styles.routeCity}>{route.from}</Text>
					<Ionicons
						name="arrow-forward"
						size={12}
						color={Colors.textMuted}
					/>
					<Text style={styles.routeCity}>{route.to}</Text>
				</View>
				<View style={styles.routeMeta}>
					<View style={styles.metaItem}>
						<Ionicons name="location-outline" size={12} color={Colors.textMuted} />
						<Text style={styles.metaText}>{route.distance}</Text>
					</View>
					<View style={styles.metaItem}>
						<Ionicons name="time-outline" size={12} color={Colors.textMuted} />
						<Text style={styles.metaText}>{route.duration}</Text>
					</View>
				</View>
			</View>

			{/* Price + Book */}
			<View style={styles.routeAction}>
				<View>
					<Text style={styles.routePrice}>₹{route.price}</Text>
					<Text style={styles.routePriceLabel}>onwards</Text>
				</View>
				<Pressable style={styles.bookButton} onPress={handleBookNow}>
					<Text style={styles.bookButtonText}>Book Now</Text>
					<Ionicons name="arrow-forward" size={14} color={Colors.primary} />
				</Pressable>
			</View>
		</View>
	);
}

export function PopularRoutesSection() {
	return (
		<View style={styles.container}>
			<View style={styles.sectionCard}>
				<Text style={styles.sectionTitle}>Popular Routes</Text>
				<View style={styles.routesList}>
					{POPULAR_ROUTES.map((route) => (
						<RouteItem key={route.id} route={route} />
					))}
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
	},
	sectionCard: {
		borderWidth: 1,
		borderColor: Colors.border,
		borderRadius: 16,
		padding: 16,
		backgroundColor: Colors.card,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: Colors.text,
		letterSpacing: -0.3,
		marginBottom: 12,
	},
	routesList: {
		gap: 8,
	},
	routeCard: {
		borderWidth: 1,
		borderColor: Colors.border,
		borderRadius: 12,
		padding: 14,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	routeInfo: {
		flex: 1,
		gap: 6,
	},
	routeRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
	routeCity: {
		fontSize: 14,
		fontWeight: "500",
		color: Colors.text,
	},
	routeMeta: {
		flexDirection: "row",
		gap: 12,
	},
	metaItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 3,
	},
	metaText: {
		fontSize: 11,
		color: Colors.textMuted,
	},
	routeAction: {
		alignItems: "flex-end",
		gap: 8,
	},
	routePrice: {
		fontSize: 14,
		fontWeight: "700",
		color: Colors.primary,
		textAlign: "right",
	},
	routePriceLabel: {
		fontSize: 11,
		color: Colors.textMuted,
		textAlign: "right",
	},
	bookButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		borderWidth: 1,
		borderColor: Colors.primary,
		borderRadius: 20,
		paddingHorizontal: 14,
		paddingVertical: 6,
	},
	bookButtonText: {
		fontSize: 12,
		fontWeight: "600",
		color: Colors.primary,
	},
});
