import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";

const FEATURES = [
	{
		icon: "checkmark-circle-outline" as const,
		title: "Verified Operators",
		description:
			"Every bus operator on our platform is thoroughly verified to ensure reliability and safety.",
	},
	{
		icon: "flash-outline" as const,
		title: "Instant Booking",
		description:
			"Book your seat in seconds and receive instant confirmation — no waiting, no hassle.",
	},
	{
		icon: "shield-checkmark-outline" as const,
		title: "No Hidden Charges",
		description:
			"The price you see is the price you pay. We believe in full transparency with our customers.",
	},
	{
		icon: "phone-portrait-outline" as const,
		title: "Mobile-Friendly",
		description:
			"Our platform is optimized for mobile devices so you can book anytime, anywhere.",
	},
	{
		icon: "headset-outline" as const,
		title: "Customer Support",
		description:
			"Our dedicated support team is always ready to assist you before, during, and after your journey.",
	},
	{
		icon: "heart-outline" as const,
		title: "Comfort First",
		description:
			"We work closely with operators to ensure every journey meets our comfort and quality standards.",
	},
];

export default function AboutScreen() {
	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.content}
			showsVerticalScrollIndicator={false}
		>
			{/* Hero */}
			<View style={styles.hero}>
				<Text style={styles.heroTitle}>About SudhanBus</Text>
				<Text style={styles.heroSubtitle}>
					We're building a simple and reliable way to book bus tickets across
					cities — fast search, transparent prices, and trusted operators, all
					in one place.
				</Text>
			</View>

			<View style={styles.separator} />

			{/* Our Mission */}
			<View style={styles.section}>
				<View style={styles.sectionHeader}>
					<View style={styles.iconBox}>
						<Ionicons name="navigate-outline" size={24} color={Colors.primary} />
					</View>
					<View style={styles.sectionContent}>
						<Text style={styles.sectionTitle}>Our Mission</Text>
						<Text style={styles.sectionText}>
							Booking bus tickets shouldn't be confusing or stressful. Our goal
							is to remove friction from bus travel by offering a clean,
							easy-to-use platform that puts passengers first. We believe that
							everyone deserves access to safe, comfortable, and affordable
							transportation — and that's exactly what we're working to deliver
							every single day.
						</Text>
					</View>
				</View>
			</View>

			{/* Who We Are */}
			<View style={[styles.section, { marginTop: 24 }]}>
				<View style={styles.sectionHeader}>
					<View style={styles.iconBox}>
						<Ionicons name="people-outline" size={24} color={Colors.primary} />
					</View>
					<View style={styles.sectionContent}>
						<Text style={styles.sectionTitle}>Who We Are</Text>
						<Text style={styles.sectionText}>
							We are a passionate team dedicated to transforming the bus travel
							experience in India. We work closely with trusted operators to
							ensure safe, comfortable, and dependable journeys. Every trip
							listed on our platform meets our quality standards — because your
							trust matters to us.
						</Text>
					</View>
				</View>
			</View>

			<View style={styles.separator} />

			{/* Why Choose Us */}
			<Text style={styles.whyTitle}>Why Choose Us?</Text>
			<View style={styles.featuresGrid}>
				{FEATURES.map((feature) => (
					<View key={feature.title} style={styles.featureCard}>
						<View style={styles.featureIconBox}>
							<Ionicons name={feature.icon} size={24} color={Colors.primary} />
						</View>
						<Text style={styles.featureTitle}>{feature.title}</Text>
						<Text style={styles.featureDesc}>{feature.description}</Text>
					</View>
				))}
			</View>

			<View style={styles.separator} />

			{/* CTA */}
			<Text style={styles.ctaText}>
				Our mission is to make bus travel{" "}
				<Text style={styles.ctaBold}>accessible</Text>,{" "}
				<Text style={styles.ctaBold}>affordable</Text>, and{" "}
				<Text style={styles.ctaBold}>stress-free</Text> for everyone.
			</Text>
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
		paddingVertical: 32,
	},
	hero: {
		alignItems: "center",
	},
	heroTitle: {
		fontSize: 26,
		fontWeight: "700",
		color: Colors.text,
		letterSpacing: -0.5,
	},
	heroSubtitle: {
		marginTop: 12,
		fontSize: 15,
		color: Colors.textSecondary,
		textAlign: "center",
		lineHeight: 22,
		maxWidth: 340,
	},
	separator: {
		height: 1,
		backgroundColor: Colors.border,
		marginVertical: 28,
	},
	section: {},
	sectionHeader: {
		flexDirection: "row",
		gap: 16,
	},
	iconBox: {
		width: 48,
		height: 48,
		borderRadius: 14,
		backgroundColor: Colors.primaryLight,
		alignItems: "center",
		justifyContent: "center",
	},
	sectionContent: {
		flex: 1,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: Colors.text,
	},
	sectionText: {
		marginTop: 8,
		fontSize: 14,
		color: Colors.textSecondary,
		lineHeight: 21,
	},
	whyTitle: {
		fontSize: 20,
		fontWeight: "600",
		color: Colors.text,
		textAlign: "center",
		marginBottom: 20,
	},
	featuresGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 12,
	},
	featureCard: {
		width: "47%",
		borderWidth: 1,
		borderColor: Colors.border,
		borderRadius: 14,
		padding: 16,
		alignItems: "center",
		backgroundColor: Colors.card,
	},
	featureIconBox: {
		width: 44,
		height: 44,
		borderRadius: 12,
		backgroundColor: Colors.primaryLight,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 10,
	},
	featureTitle: {
		fontSize: 13,
		fontWeight: "600",
		color: Colors.text,
		textAlign: "center",
	},
	featureDesc: {
		marginTop: 6,
		fontSize: 11,
		color: Colors.textSecondary,
		textAlign: "center",
		lineHeight: 16,
	},
	ctaText: {
		fontSize: 16,
		color: Colors.textSecondary,
		textAlign: "center",
		lineHeight: 24,
	},
	ctaBold: {
		fontWeight: "600",
		color: Colors.text,
	},
});
