import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const unstable_settings = {
	initialRouteName: "(tabs)",
};

export default function RootLayout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaProvider>
				<KeyboardProvider>
					<StatusBar style="dark" />
					<Stack
						screenOptions={{
							headerShown: false,
							contentStyle: { backgroundColor: "#FFFFFF" },
						}}
					>
						<Stack.Screen name="(tabs)" />
						<Stack.Screen
							name="(auth)/login"
							options={{
								headerShown: true,
								title: "Sign In",
								headerBackTitle: "Back",
							}}
						/>
						<Stack.Screen
							name="(auth)/signup"
							options={{
								headerShown: true,
								title: "Sign Up",
								headerBackTitle: "Back",
							}}
						/>
						<Stack.Screen
							name="search"
							options={{
								headerShown: true,
								title: "Search Results",
								headerBackTitle: "Back",
							}}
						/>
						<Stack.Screen
							name="booking/[busId]"
							options={{
								presentation: "modal",
								headerShown: false,
							}}
						/>
					</Stack>
				</KeyboardProvider>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	);
}
