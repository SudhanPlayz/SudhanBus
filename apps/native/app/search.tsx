import { Ionicons } from "@expo/vector-icons";
import type BottomSheet from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BusCard } from "@/components/bus-card";
import { FilterSheet } from "@/components/filter-sheet";
import { Colors } from "@/constants/colors";
import { DEMO_BUSES } from "@/data/bus.data";
import { CITIES } from "@/data/cities.data";

const SORT_OPTIONS = ["Ratings", "Departure time", "Price"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

export default function SearchScreen() {
	const { from, to, date } = useLocalSearchParams<{
		from: string;
		to: string;
		date: string;
	}>();

	const insets = useSafeAreaInsets();
	const filterRef = useRef<BottomSheet>(null);

	const [activeSort, setActiveSort] = useState<SortOption>("Ratings");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
	const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
	const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

	const fromLabel = CITIES.find((c) => c.value === from)?.label ?? from;
	const toLabel = CITIES.find((c) => c.value === to)?.label ?? to;

	const handleTypeChange = useCallback(
		(type: string, checked: boolean) => {
			setSelectedTypes((prev) =>
				checked ? [...prev, type] : prev.filter((t) => t !== type)
			);
		},
		[]
	);

	const handleTimeChange = useCallback(
		(time: string, checked: boolean) => {
			setSelectedTimes((prev) =>
				checked ? [...prev, time] : prev.filter((t) => t !== time)
			);
		},
		[]
	);

	const filteredBuses = DEMO_BUSES.filter((bus) => {
		if (selectedTypes.length > 0) {
			const typeLower = bus.type.toLowerCase();
			const matchesType = selectedTypes.some((type) => {
				if (type === "ac")
					return typeLower.includes("a/c") && !typeLower.includes("non a/c");
				if (type === "non-ac") return typeLower.includes("non a/c");
				if (type === "sleeper") return typeLower.includes("sleeper");
				if (type === "seater") return typeLower.includes("seater");
				return false;
			});
			if (!matchesType) return false;
		}
		if (selectedTimes.length > 0) {
			const hour = Number.parseInt(bus.departureTime.split(":")[0], 10);
			const matchesTime = selectedTimes.some((time) => {
				if (time === "morning") return hour >= 6 && hour < 12;
				if (time === "afternoon") return hour >= 12 && hour < 18;
				if (time === "evening") return hour >= 18 && hour < 24;
				if (time === "night") return hour >= 0 && hour < 6;
				return false;
			});
			if (!matchesTime) return false;
		}
		return true;
	});

	const sortedBuses = [...filteredBuses].sort((a, b) => {
		let comparison = 0;
		if (activeSort === "Price") comparison = a.price - b.price;
		if (activeSort === "Ratings") comparison = a.rating - b.rating;
		if (activeSort === "Departure time")
			comparison = a.departureTime.localeCompare(b.departureTime);
		return sortOrder === "asc" ? comparison : -comparison;
	});

	const handleSortPress = (opt: SortOption) => {
		if (activeSort === opt) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setActiveSort(opt);
			setSortOrder(opt === "Ratings" ? "desc" : "asc");
		}
	};

	return (
		<View style={styles.container}>
			{/* Route summary */}
			<View style={styles.routeSummary}>
				<Text style={styles.routeText}>
					{fromLabel} → {toLabel}
				</Text>
				<Text style={styles.dateText}>{date}</Text>
			</View>

			{/* Sort bar */}
			<View style={styles.sortBar}>
				<Text style={styles.busCount}>
					{sortedBuses.length} buses found
				</Text>
				<View style={styles.sortActions}>
					<Pressable
						style={styles.filterButton}
						onPress={() => filterRef.current?.expand()}
					>
						<Ionicons name="filter-outline" size={16} color={Colors.primary} />
						<Text style={styles.filterButtonText}>Filter</Text>
					</Pressable>
				</View>
			</View>

			{/* Sort chips */}
			<View style={styles.sortChips}>
				{SORT_OPTIONS.map((opt) => (
					<Pressable
						key={opt}
						style={[
							styles.sortChip,
							activeSort === opt && styles.sortChipActive,
						]}
						onPress={() => handleSortPress(opt)}
					>
						<Text
							style={[
								styles.sortChipText,
								activeSort === opt && styles.sortChipTextActive,
							]}
						>
							{opt}
						</Text>
						{activeSort === opt && (
							<Ionicons
								name={sortOrder === "asc" ? "arrow-up" : "arrow-down"}
								size={12}
								color={Colors.primary}
							/>
						)}
					</Pressable>
				))}
			</View>

			{/* Bus list */}
			<FlatList
				data={sortedBuses}
				keyExtractor={(item) => item.id}
				contentContainerStyle={[
					styles.listContent,
					{ paddingBottom: insets.bottom + 16 },
				]}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => <BusCard bus={item} />}
				ListEmptyComponent={
					<View style={styles.emptyState}>
						<Ionicons name="bus-outline" size={48} color={Colors.textMuted} />
						<Text style={styles.emptyText}>
							No buses found matching your criteria.
						</Text>
					</View>
				}
			/>

			{/* Filter bottom sheet */}
			<FilterSheet
				ref={filterRef}
				selectedTypes={selectedTypes}
				selectedTimes={selectedTimes}
				onTypeChange={handleTypeChange}
				onTimeChange={handleTimeChange}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.muted,
	},
	routeSummary: {
		backgroundColor: Colors.card,
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: Colors.border,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	routeText: {
		fontSize: 15,
		fontWeight: "600",
		color: Colors.text,
	},
	dateText: {
		fontSize: 13,
		color: Colors.textSecondary,
	},
	sortBar: {
		backgroundColor: Colors.card,
		paddingHorizontal: 16,
		paddingVertical: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomWidth: 2,
		borderBottomColor: Colors.primaryLight,
	},
	busCount: {
		fontSize: 14,
		fontWeight: "700",
		color: Colors.text,
	},
	sortActions: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	filterButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		borderWidth: 1,
		borderColor: Colors.primary,
		borderRadius: 8,
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	filterButtonText: {
		fontSize: 13,
		fontWeight: "500",
		color: Colors.primary,
	},
	sortChips: {
		flexDirection: "row",
		gap: 8,
		paddingHorizontal: 16,
		paddingVertical: 10,
		backgroundColor: Colors.card,
	},
	sortChip: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: Colors.border,
	},
	sortChipActive: {
		borderColor: Colors.primary,
		backgroundColor: Colors.primaryLight,
	},
	sortChipText: {
		fontSize: 12,
		fontWeight: "500",
		color: Colors.text,
	},
	sortChipTextActive: {
		color: Colors.primary,
		fontWeight: "600",
	},
	listContent: {
		padding: 12,
		gap: 10,
	},
	emptyState: {
		alignItems: "center",
		paddingTop: 60,
		gap: 12,
	},
	emptyText: {
		fontSize: 14,
		color: Colors.textMuted,
	},
});
