import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Colors } from "@/constants/colors";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors.primary,
				tabBarInactiveTintColor: Colors.textMuted,
				tabBarStyle: {
					borderTopColor: Colors.border,
					backgroundColor: Colors.background,
				},
				headerStyle: {
					backgroundColor: Colors.background,
				},
				headerTintColor: Colors.text,
				headerShadowVisible: true,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					headerTitle: "SudhanBus",
					tabBarIcon: ({ color, size }) => (
						<Ionicons color={color} name="home-outline" size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name="bookings"
				options={{
					title: "Bookings",
					tabBarIcon: ({ color, size }) => (
						<Ionicons color={color} name="ticket-outline" size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name="about"
				options={{
					title: "About",
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							color={color}
							name="information-circle-outline"
							size={size}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="contact"
				options={{
					title: "Contact",
					tabBarIcon: ({ color, size }) => (
						<Ionicons color={color} name="call-outline" size={size} />
					),
				}}
			/>
		</Tabs>
	);
}
