import { Ionicons } from "@expo/vector-icons";
import { Button, useThemeColor } from "heroui-native";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

import { OFFERS, type Offer } from "./offers-data";

type Filter = "All" | "Bus";

const FILTERS: Filter[] = ["All", "Bus"];

function OfferCard({ offer }: { offer: Offer }) {
	const accentColor = useThemeColor("accent");

	return (
		<View className="mr-3 w-56 rounded-2xl border border-border bg-card p-4">
			{/* Category badge */}
			<View className="mb-2 self-start rounded-md bg-accent px-2 py-0.5">
				<Text className="font-semibold text-accent-foreground text-xs">
					{offer.category}
				</Text>
			</View>

			<Text className="mb-1 font-semibold text-foreground text-sm leading-snug">
				{offer.title}
			</Text>
			<Text className="mb-3 text-muted text-xs">{offer.validity}</Text>

			{/* Coupon code */}
			<View className="flex-row items-center gap-1.5">
				<Ionicons color={accentColor} name="pricetag-outline" size={12} />
				<Text className="font-bold text-accent text-xs tracking-wide">
					{offer.code}
				</Text>
			</View>
		</View>
	);
}

function OffersSection() {
	const [filter, setFilter] = useState<Filter>("All");

	const filteredOffers =
		filter === "All" ? OFFERS : OFFERS.filter((o) => o.category === filter);

	return (
		<View className="w-full px-4 py-2">
			{/* Header */}
			<View className="mb-3 flex-row items-center justify-between">
				<Text className="font-semibold text-foreground text-lg tracking-tight">
					Offers for you
				</Text>
				<Pressable>
					<Text className="font-medium text-accent text-sm">View more</Text>
				</Pressable>
			</View>

			{/* Filter tabs */}
			<View className="mb-3 flex-row gap-2">
				{FILTERS.map((f) => (
					<Button
						className="rounded-full px-3"
						key={f}
						onPress={() => setFilter(f)}
						size="sm"
						variant={filter === f ? "primary" : "outline"}
					>
						<Button.Label className="text-xs">{f}</Button.Label>
					</Button>
				))}
			</View>

			{/* Horizontal list */}
			<FlatList
				contentContainerStyle={{ paddingRight: 16 }}
				data={filteredOffers}
				horizontal
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <OfferCard offer={item} />}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
}

export { OffersSection };
