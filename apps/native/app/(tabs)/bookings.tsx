import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";

export default function BookingsScreen() {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<View style={styles.emptyCard}>
				<View style={styles.iconCircle}>
					<Ionicons color={Colors.textMuted} name="ticket-outline" size={48} />
				</View>
				<Text style={styles.emptyTitle}>No bookings yet</Text>
				<Text style={styles.emptyDescription}>
					You haven't booked any bus tickets yet. Start by searching for
					available routes and grab your seat!
				</Text>
				<Pressable
					onPress={() => router.push("/(tabs)" as any)}
					style={styles.button}
				>
					<Text style={styles.buttonText}>Book a Bus</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
		alignItems: "center",
		justifyContent: "center",
		padding: 24,
	},
	emptyCard: {
		alignItems: "center",
		borderWidth: 1,
		borderColor: Colors.border,
		borderRadius: 16,
		padding: 32,
		width: "100%",
		maxWidth: 360,
	},
	iconCircle: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: Colors.muted,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 16,
	},
	emptyTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: Colors.text,
		marginBottom: 8,
	},
	emptyDescription: {
		fontSize: 14,
		color: Colors.textSecondary,
		textAlign: "center",
		lineHeight: 20,
		marginBottom: 24,
	},
	button: {
		backgroundColor: Colors.primary,
		paddingHorizontal: 32,
		paddingVertical: 12,
		borderRadius: 24,
	},
	buttonText: {
		color: "#FFFFFF",
		fontWeight: "600",
		fontSize: 14,
	},
});
