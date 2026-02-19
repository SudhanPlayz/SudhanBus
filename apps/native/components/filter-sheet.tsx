import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { forwardRef, useCallback, useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";

const BUS_TYPES = [
	{ id: "ac", label: "AC" },
	{ id: "non-ac", label: "Non AC" },
	{ id: "sleeper", label: "Sleeper" },
	{ id: "seater", label: "Seater" },
];

const DEPARTURE_TIMES = [
	{ id: "morning", label: "06:00 – 12:00" },
	{ id: "afternoon", label: "12:00 – 18:00" },
	{ id: "evening", label: "18:00 – 24:00" },
	{ id: "night", label: "00:00 – 06:00" },
];

interface FilterSheetProps {
	selectedTypes: string[];
	selectedTimes: string[];
	onTypeChange: (type: string, checked: boolean) => void;
	onTimeChange: (time: string, checked: boolean) => void;
}

export const FilterSheet = forwardRef<BottomSheet, FilterSheetProps>(
	function FilterSheet(
		{ selectedTypes, selectedTimes, onTypeChange, onTimeChange },
		ref
	) {
		const snapPoints = useMemo(() => ["45%", "70%"], []);

		const renderCheckbox = (
			id: string,
			label: string,
			checked: boolean,
			onChange: (id: string, checked: boolean) => void
		) => (
			<Pressable
				key={id}
				style={styles.checkboxRow}
				onPress={() => onChange(id, !checked)}
			>
				<View
					style={[styles.checkbox, checked && styles.checkboxChecked]}
				>
					{checked && (
						<Ionicons name="checkmark" size={14} color="#FFFFFF" />
					)}
				</View>
				<Text style={styles.checkboxLabel}>{label}</Text>
			</Pressable>
		);

		return (
			<BottomSheet
				ref={ref}
				index={-1}
				snapPoints={snapPoints}
				enablePanDownToClose
				backgroundStyle={styles.sheetBackground}
				handleIndicatorStyle={styles.handle}
			>
				<BottomSheetScrollView
					contentContainerStyle={styles.sheetContent}
				>
					<Text style={styles.sheetTitle}>Filter buses</Text>
					<View style={styles.separator} />

					{/* Bus Type */}
					<Text style={styles.sectionLabel}>BUS TYPE</Text>
					<View style={styles.checkboxGrid}>
						{BUS_TYPES.map((type) =>
							renderCheckbox(
								type.id,
								type.label,
								selectedTypes.includes(type.id),
								onTypeChange
							)
						)}
					</View>

					<View style={styles.separator} />

					{/* Departure Time */}
					<Text style={styles.sectionLabel}>DEPARTURE TIME</Text>
					<View style={styles.checkboxGrid}>
						{DEPARTURE_TIMES.map((time) =>
							renderCheckbox(
								time.id,
								time.label,
								selectedTimes.includes(time.id),
								onTimeChange
							)
						)}
					</View>
				</BottomSheetScrollView>
			</BottomSheet>
		);
	}
);

const styles = StyleSheet.create({
	sheetBackground: {
		backgroundColor: Colors.background,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		borderWidth: 1,
		borderColor: Colors.border,
	},
	handle: {
		backgroundColor: Colors.textMuted,
		width: 36,
	},
	sheetContent: {
		padding: 20,
	},
	sheetTitle: {
		fontSize: 16,
		fontWeight: "700",
		color: Colors.text,
		textAlign: "center",
	},
	separator: {
		height: 1,
		backgroundColor: Colors.border,
		marginVertical: 16,
	},
	sectionLabel: {
		fontSize: 11,
		fontWeight: "600",
		color: Colors.textMuted,
		letterSpacing: 1,
		marginBottom: 12,
	},
	checkboxGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 12,
	},
	checkboxRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		width: "45%",
	},
	checkbox: {
		width: 22,
		height: 22,
		borderRadius: 5,
		borderWidth: 1.5,
		borderColor: Colors.border,
		alignItems: "center",
		justifyContent: "center",
	},
	checkboxChecked: {
		backgroundColor: Colors.primary,
		borderColor: Colors.primary,
	},
	checkboxLabel: {
		fontSize: 14,
		color: Colors.text,
	},
});
