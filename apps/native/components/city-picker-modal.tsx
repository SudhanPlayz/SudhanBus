import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
	FlatList,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { CITIES, type City } from "@/data/cities.data";

interface CityPickerModalProps {
	disabledValues?: (string | null)[];
	onClose: () => void;
	onSelect: (value: string) => void;
	title: string;
	visible: boolean;
}

export function CityPickerModal({
	visible,
	onClose,
	onSelect,
	disabledValues = [],
	title,
}: CityPickerModalProps) {
	const insets = useSafeAreaInsets();
	const [search, setSearch] = useState("");

	const filtered = CITIES.filter(
		(c) =>
			c.label.toLowerCase().includes(search.toLowerCase()) &&
			!disabledValues.includes(c.value)
	);

	const handleSelect = (city: City) => {
		onSelect(city.value);
		setSearch("");
		onClose();
	};

	return (
		<Modal
			animationType="slide"
			onRequestClose={onClose}
			presentationStyle="pageSheet"
			visible={visible}
		>
			<View style={[styles.container, { paddingTop: insets.top + 8 }]}>
				{/* Header */}
				<View style={styles.header}>
					<Text style={styles.headerTitle}>{title}</Text>
					<Pressable hitSlop={12} onPress={onClose}>
						<Ionicons color={Colors.text} name="close" size={24} />
					</Pressable>
				</View>

				{/* Search bar */}
				<View style={styles.searchBar}>
					<Ionicons color={Colors.textMuted} name="search" size={18} />
					<TextInput
						autoFocus
						onChangeText={setSearch}
						placeholder="Search city..."
						placeholderTextColor={Colors.textMuted}
						style={styles.searchInput}
						value={search}
					/>
				</View>

				{/* City list */}
				<FlatList
					contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
					data={filtered}
					keyExtractor={(item) => item.value}
					ListEmptyComponent={
						<Text style={styles.emptyText}>No cities found</Text>
					}
					renderItem={({ item }) => (
						<Pressable
							onPress={() => handleSelect(item)}
							style={styles.cityRow}
						>
							<Ionicons
								color={Colors.textSecondary}
								name="location-outline"
								size={18}
							/>
							<Text style={styles.cityLabel}>{item.label}</Text>
						</Pressable>
					)}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingVertical: 12,
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: Colors.text,
	},
	searchBar: {
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 20,
		marginBottom: 8,
		borderWidth: 1,
		borderColor: Colors.border,
		borderRadius: 10,
		paddingHorizontal: 12,
		paddingVertical: 10,
		backgroundColor: Colors.muted,
		gap: 8,
	},
	searchInput: {
		flex: 1,
		fontSize: 15,
		color: Colors.text,
		padding: 0,
	},
	cityRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		paddingHorizontal: 20,
		paddingVertical: 14,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: Colors.border,
	},
	cityLabel: {
		fontSize: 15,
		color: Colors.text,
	},
	emptyText: {
		textAlign: "center",
		marginTop: 32,
		fontSize: 14,
		color: Colors.textMuted,
	},
});
