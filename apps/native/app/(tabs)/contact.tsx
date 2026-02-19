import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";

const CONTACT_ITEMS = [
	{
		icon: "location-outline" as const,
		title: "Office Address",
		value: "2/34A, Udangudi Road, Megnanapuram,\nTamil Nadu 628210",
	},
	{
		icon: "call-outline" as const,
		title: "Phone",
		value: "1800-123-4567",
		action: () => Linking.openURL("tel:18001234567"),
	},
	{
		icon: "mail-outline" as const,
		title: "Email",
		value: "support@sudhanbus.com",
		action: () => Linking.openURL("mailto:support@sudhanbus.com"),
	},
	{
		icon: "time-outline" as const,
		title: "Working Hours",
		value: "Mon – Sat: 9:00 AM – 6:00 PM\nSun: Closed",
	},
];

const MAPS_URL =
	"https://www.google.com/maps/search/?api=1&query=Sudhan+Bus+Megnanapuram";

export default function ContactScreen() {
	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.content}
			showsVerticalScrollIndicator={false}
		>
			{/* Map button */}
			<Pressable
				style={styles.mapButton}
				onPress={() => Linking.openURL(MAPS_URL)}
			>
				<Ionicons name="map-outline" size={24} color="#FFFFFF" />
				<Text style={styles.mapButtonText}>View on Google Maps</Text>
			</Pressable>

			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Get in Touch</Text>
				<Text style={styles.headerSubtitle}>
					We'd love to hear from you. Whether you have a question about our
					services, need help with a booking, or just want to say hello — reach
					out to us.
				</Text>
			</View>

			<View style={styles.separator} />

			{/* Contact Card */}
			<View style={styles.card}>
				{CONTACT_ITEMS.map((item, index) => (
					<Pressable
						key={item.title}
						style={[
							styles.contactRow,
							index < CONTACT_ITEMS.length - 1 && styles.contactRowBorder,
						]}
						onPress={item.action}
						disabled={!item.action}
					>
						<View style={styles.contactIcon}>
							<Ionicons name={item.icon} size={20} color={Colors.primary} />
						</View>
						<View style={styles.contactContent}>
							<Text style={styles.contactTitle}>{item.title}</Text>
							<Text
								style={[
									styles.contactValue,
									item.action && styles.contactLink,
								]}
							>
								{item.value}
							</Text>
						</View>
					</Pressable>
				))}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
	},
	content: {
		paddingHorizontal: 20,
		paddingVertical: 24,
	},
	mapButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
		backgroundColor: Colors.primary,
		paddingVertical: 16,
		borderRadius: 14,
		marginBottom: 24,
	},
	mapButtonText: {
		color: "#FFFFFF",
		fontWeight: "600",
		fontSize: 16,
	},
	header: {
		alignItems: "center",
	},
	headerTitle: {
		fontSize: 22,
		fontWeight: "700",
		color: Colors.text,
		letterSpacing: -0.3,
	},
	headerSubtitle: {
		marginTop: 8,
		fontSize: 14,
		color: Colors.textSecondary,
		textAlign: "center",
		lineHeight: 20,
		maxWidth: 340,
	},
	separator: {
		height: 1,
		backgroundColor: Colors.border,
		marginVertical: 24,
		alignSelf: "center",
		width: 200,
	},
	card: {
		borderWidth: 1,
		borderColor: Colors.border,
		borderRadius: 14,
		backgroundColor: Colors.card,
		overflow: "hidden",
	},
	contactRow: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 14,
		padding: 16,
	},
	contactRowBorder: {
		borderBottomWidth: 1,
		borderBottomColor: Colors.border,
	},
	contactIcon: {
		width: 40,
		height: 40,
		borderRadius: 10,
		backgroundColor: Colors.primaryLight,
		alignItems: "center",
		justifyContent: "center",
	},
	contactContent: {
		flex: 1,
	},
	contactTitle: {
		fontSize: 13,
		fontWeight: "600",
		color: Colors.text,
	},
	contactValue: {
		marginTop: 2,
		fontSize: 13,
		color: Colors.textSecondary,
		lineHeight: 18,
	},
	contactLink: {
		color: Colors.primary,
	},
});
