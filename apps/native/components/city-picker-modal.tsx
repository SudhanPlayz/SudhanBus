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
import { type City, CITIES } from "@/data/cities.data";
import { Colors } from "@/constants/colors";

interface CityPickerModalProps {
	visible: boolean;
	onClose: () => void;
	onSelect: (value: string) => void;
	disabledValues?: (string | null)[];
	title: string;
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
			visible={visible}
			animationType="slide"
			presentationStyle="pageSheet"
			onRequestClose={onClose}
		>
			<View style={[styles.container, { paddingTop: insets.top + 8 }]}>
				{/* Header */}
				<View style={styles.header}>
					<Text style={styles.headerTitle}>{title}</Text>
					<Pressable onPress={onClose} hitSlop={12}>
						<Ionicons name="close" size={24} color={Colors.text} />
					</Pressable>
				</View>

				{/* Search bar */}
				<View style={styles.searchBar}>
					<Ionicons name="search" size={18} color={Colors.textMuted} />
					<TextInput
						style={styles.searchInput}
						placeholder="Search city..."
						placeholderTextColor={Colors.textMuted}
						value={search}
						onChangeText={setSearch}
						autoFocus
					/>
				</View>

				{/* City list */}
				<FlatList
					data={filtered}
					keyExtractor={(item) => item.value}
					contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => (
						<Pressable
							style={styles.cityRow}
							onPress={() => handleSelect(item)}
						>
							<Ionicons
								name="location-outline"
								size={18}
								color={Colors.textSecondary}
							/>
							<Text style={styles.cityLabel}>{item.label}</Text>
						</Pressable>
					)}
					ListEmptyComponent={
						<Text style={styles.emptyText}>No cities found</Text>
					}
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
