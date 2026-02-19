import { Ionicons } from "@expo/vector-icons";
import { Button, useThemeColor } from "heroui-native";
import { Text, View } from "react-native";

import { POPULAR_ROUTES, type Route } from "./popular-routes-data";

function RouteItem({ route }: { route: Route }) {
	const mutedColor = useThemeColor("muted");

	return (
		<View className="mb-2 rounded-xl border border-border px-4 py-3">
			{/* Route info */}
			<View className="mb-2 flex-row items-center gap-2">
				<Text className="font-medium text-foreground text-sm">
					{route.from}
				</Text>
				<Ionicons color={mutedColor} name="arrow-forward" size={14} />
				<Text className="font-medium text-foreground text-sm">{route.to}</Text>
			</View>

			{/* Meta row */}
			<View className="mb-3 flex-row items-center gap-4">
				<View className="flex-row items-center gap-1">
					<Ionicons color={mutedColor} name="location-outline" size={12} />
					<Text className="text-muted text-xs">{route.distance}</Text>
				</View>
				<View className="flex-row items-center gap-1">
					<Ionicons color={mutedColor} name="time-outline" size={12} />
					<Text className="text-muted text-xs">{route.duration}</Text>
				</View>
			</View>

			{/* Price + Book */}
			<View className="flex-row items-center justify-between">
				<View>
					<Text className="font-semibold text-accent text-sm">
						₹{route.price}
					</Text>
					<Text className="text-muted text-xs">onwards</Text>
				</View>
				<Button className="rounded-full px-5" onPress={() => {}} size="sm">
					<Button.Label className="font-semibold text-xs">
						Book Now
					</Button.Label>
				</Button>
			</View>
		</View>
	);
}

function PopularRoutesSection() {
	return (
		<View className="w-full px-4 py-2">
			<Text className="mb-3 font-semibold text-foreground text-lg tracking-tight">
				Popular Routes
			</Text>
			{POPULAR_ROUTES.map((route) => (
				<RouteItem key={route.id} route={route} />
			))}
		</View>
	);
}

export { PopularRoutesSection };
