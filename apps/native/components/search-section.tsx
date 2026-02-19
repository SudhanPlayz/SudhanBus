import { Ionicons } from "@expo/vector-icons";
import { Calendar, toDateId } from "@marceloterreiro/flash-calendar";
import { format, parseISO } from "date-fns";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
	Modal,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CityPickerModal } from "./city-picker-modal";
import { Colors } from "@/constants/colors";
import { CITIES } from "@/data/cities.data";

const todayId = toDateId(new Date());

export function SearchSection() {
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const [from, setFrom] = useState<string | null>(null);
	const [to, setTo] = useState<string | null>(null);
	const [selectedDateId, setSelectedDateId] = useState<string | null>(null);

	const [showFromPicker, setShowFromPicker] = useState(false);
	const [showToPicker, setShowToPicker] = useState(false);
	const [showDatePicker, setShowDatePicker] = useState(false);

	const fromLabel = CITIES.find((c) => c.value === from)?.label;
	const toLabel = CITIES.find((c) => c.value === to)?.label;

	const handleSwap = () => {
		setFrom(to);
		setTo(from);
	};

	const handleSearch = () => {
		if (!from || !to || !selectedDateId) return;
		router.push({
			pathname: "/search" as any,
			params: {
				from,
				to,
				date: selectedDateId,
			},
		});
	};

	const handleDateSelect = (dateId: string) => {
		setSelectedDateId(dateId);
		setShowDatePicker(false);
	};

	const displayDate = selectedDateId
		? format(parseISO(selectedDateId), "EEE, dd MMM yyyy")
		: null;

	return (
		<View>
			{/* Hero banner */}
			<View style={styles.hero}>
				<Text style={styles.heroTitle}>Book Your Bus Ticket</Text>
				<Text style={styles.heroSubtitle}>
					Search and book bus tickets across India
				</Text>
			</View>

			{/* Search Card */}
			<View style={styles.cardWrapper}>
				<View style={styles.card}>
					{/* From */}
					<Pressable
						style={styles.fieldRow}
						onPress={() => setShowFromPicker(true)}
					>
						<Ionicons name="location-outline" size={18} color={Colors.textSecondary} />
						<View style={styles.fieldContent}>
							<Text style={styles.fieldLabel}>From</Text>
							<Text
								style={[
									styles.fieldValue,
									!fromLabel && styles.fieldPlaceholder,
								]}
							>
								{fromLabel || "Select origin"}
							</Text>
						</View>
					</Pressable>

					{/* Swap button */}
					<View style={styles.swapRow}>
						<View style={styles.divider} />
						<Pressable style={styles.swapButton} onPress={handleSwap}>
							<Ionicons name="swap-vertical" size={16} color={Colors.primary} />
						</Pressable>
						<View style={styles.divider} />
					</View>

					{/* To */}
					<Pressable
						style={styles.fieldRow}
						onPress={() => setShowToPicker(true)}
					>
						<Ionicons name="navigate-outline" size={18} color={Colors.textSecondary} />
						<View style={styles.fieldContent}>
							<Text style={styles.fieldLabel}>To</Text>
							<Text
								style={[
									styles.fieldValue,
									!toLabel && styles.fieldPlaceholder,
								]}
							>
								{toLabel || "Select destination"}
							</Text>
						</View>
					</Pressable>

					<View style={styles.fieldDivider} />

					{/* Date */}
					<Pressable
						style={styles.fieldRow}
						onPress={() => setShowDatePicker(true)}
					>
						<Ionicons name="calendar-outline" size={18} color={Colors.textSecondary} />
						<View style={styles.fieldContent}>
							<Text style={styles.fieldLabel}>Travel Date</Text>
							<Text
								style={[
									styles.fieldValue,
									!displayDate && styles.fieldPlaceholder,
								]}
							>
								{displayDate || "Pick a date"}
							</Text>
						</View>
					</Pressable>

					{/* Search button */}
					<Pressable
						style={[
							styles.searchButton,
							(!from || !to || !selectedDateId) && styles.searchButtonDisabled,
						]}
						onPress={handleSearch}
						disabled={!from || !to || !selectedDateId}
					>
						<Ionicons name="search" size={20} color="#FFFFFF" />
						<Text style={styles.searchButtonText}>Search buses</Text>
					</Pressable>
				</View>
			</View>

			{/* Modals */}
			<CityPickerModal
				visible={showFromPicker}
				onClose={() => setShowFromPicker(false)}
				onSelect={setFrom}
				disabledValues={[to]}
				title="Select Origin"
			/>
			<CityPickerModal
				visible={showToPicker}
				onClose={() => setShowToPicker(false)}
				onSelect={setTo}
				disabledValues={[from]}
				title="Select Destination"
			/>

			{/* Date picker modal */}
			<Modal
				visible={showDatePicker}
				animationType="slide"
				transparent={true}
				onRequestClose={() => setShowDatePicker(false)}
			>
				<Pressable
					style={styles.modalOverlay}
					onPress={() => setShowDatePicker(false)}
				/>
				<View style={[styles.dateModalContainer, { paddingBottom: insets.bottom }]}>
					<View style={styles.dateModalHeader}>
						<Text style={styles.dateModalTitle}>Select Travel Date</Text>
						<Pressable onPress={() => setShowDatePicker(false)} hitSlop={12}>
							<Ionicons name="close" size={24} color={Colors.text} />
						</Pressable>
					</View>
					<Calendar
						calendarActiveDateRanges={
							selectedDateId
								? [{ startId: selectedDateId, endId: selectedDateId }]
								: []
						}
						calendarMinDateId={todayId}
						calendarMonthId={todayId}
						onCalendarDayPress={handleDateSelect}
					/>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	hero: {
		backgroundColor: Colors.primary,
		paddingTop: 32,
		paddingBottom: 64,
		paddingHorizontal: 24,
		alignItems: "center",
	},
	heroTitle: {
		fontSize: 24,
		fontWeight: "700",
		color: "#FFFFFF",
		letterSpacing: -0.5,
	},
	heroSubtitle: {
		marginTop: 6,
		fontSize: 14,
		color: "rgba(255,255,255,0.85)",
	},
	cardWrapper: {
		marginTop: -44,
		paddingHorizontal: 16,
	},
	card: {
		backgroundColor: Colors.card,
		borderRadius: 16,
		padding: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 12,
		elevation: 6,
	},
	fieldRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		paddingVertical: 8,
	},
	fieldContent: {
		flex: 1,
	},
	fieldLabel: {
		fontSize: 11,
		fontWeight: "600",
		color: Colors.textMuted,
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},
	fieldValue: {
		fontSize: 15,
		fontWeight: "500",
		color: Colors.text,
		marginTop: 2,
	},
	fieldPlaceholder: {
		color: Colors.textMuted,
	},
	swapRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginVertical: 4,
	},
	divider: {
		flex: 1,
		height: StyleSheet.hairlineWidth,
		backgroundColor: Colors.border,
	},
	swapButton: {
		width: 32,
		height: 32,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: Colors.border,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.background,
	},
	fieldDivider: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: Colors.border,
		marginVertical: 8,
	},
	searchButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		backgroundColor: Colors.primary,
		paddingVertical: 14,
		borderRadius: 26,
		marginTop: 16,
	},
	searchButtonDisabled: {
		opacity: 0.5,
	},
	searchButtonText: {
		color: "#FFFFFF",
		fontWeight: "600",
		fontSize: 15,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	dateModalContainer: {
		height: "50%",
		backgroundColor: Colors.background,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		paddingHorizontal: 16,
		paddingTop: 16,
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
	},
	dateModalHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 12,
	},
	dateModalTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: Colors.text,
	},
});
