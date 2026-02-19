import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";
import type { DeckLayout, Seat, SeatStatus } from "@/data/seat.data";

const STATUS_COLORS: Record<
	SeatStatus,
	{ bg: string; border: string; text: string }
> = {
	available: { bg: Colors.background, border: Colors.border, text: Colors.text },
	booked: { bg: "#E5E7EB", border: "#D1D5DB", text: "#9CA3AF" },
	selected: { bg: Colors.primary, border: Colors.primary, text: "#FFFFFF" },
	"available-female": {
		bg: "#FCE7F3",
		border: "#F9A8D4",
		text: "#EC4899",
	},
	"booked-female": { bg: "#FBCFE8", border: "#F9A8D4", text: "#F472B6" },
	"booked-male": { bg: "#DBEAFE", border: "#93C5FD", text: "#60A5FA" },
};

interface SeatLayoutProps {
	decks: DeckLayout[];
	selectedSeats: string[];
	onSeatPress: (seatId: string) => void;
}

function SeatButton({
	seat,
	isSelected,
	onPress,
}: {
	seat: Seat;
	isSelected: boolean;
	onPress: () => void;
}) {
	const status = isSelected ? "selected" : seat.status;
	const colors = STATUS_COLORS[status];
	const isDisabled =
		seat.status === "booked" ||
		seat.status === "booked-female" ||
		seat.status === "booked-male";
	const isSleeper = seat.type === "sleeper";

	return (
		<Pressable
			style={[
				styles.seatBase,
				isSleeper ? styles.sleeper : styles.seater,
				{
					backgroundColor: colors.bg,
					borderColor: colors.border,
				},
			]}
			onPress={onPress}
			disabled={isDisabled}
		>
			<Text
				style={[
					styles.seatId,
					{ color: colors.text },
					isDisabled && styles.seatDisabledText,
				]}
			>
				{seat.id}
			</Text>
			<Text
				style={[styles.seatPrice, { color: colors.text }]}
			>
				₹{seat.price}
			</Text>
		</Pressable>
	);
}

export function SeatLayout({
	decks,
	selectedSeats,
	onSeatPress,
}: SeatLayoutProps) {
	return (
		<View style={styles.container}>
			{/* Legend */}
			<View style={styles.legend}>
				{[
					{ label: "Available", color: Colors.background, border: Colors.border },
					{ label: "Selected", color: Colors.primary, border: Colors.primary },
					{ label: "Booked", color: "#E5E7EB", border: "#D1D5DB" },
					{ label: "Female", color: "#FCE7F3", border: "#F9A8D4" },
				].map((item) => (
					<View key={item.label} style={styles.legendItem}>
						<View
							style={[
								styles.legendDot,
								{
									backgroundColor: item.color,
									borderColor: item.border,
								},
							]}
						/>
						<Text style={styles.legendText}>{item.label}</Text>
					</View>
				))}
			</View>

			{/* Decks */}
			{decks.map((deck) => (
				<View key={deck.name} style={styles.deck}>
					<Text style={styles.deckTitle}>{deck.name}</Text>
					<View style={styles.deckGrid}>
						{deck.seats.map((row, rowIndex) => (
							<View key={rowIndex} style={styles.seatRow}>
								{row.map((seat, colIndex) =>
									seat ? (
										<SeatButton
											key={seat.id}
											seat={seat}
											isSelected={selectedSeats.includes(seat.id)}
											onPress={() => onSeatPress(seat.id)}
										/>
									) : (
										<View key={`empty-${colIndex}`} style={styles.emptySlot} />
									)
								)}
							</View>
						))}
					</View>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 16,
	},
	legend: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 14,
		justifyContent: "center",
		marginBottom: 8,
	},
	legendItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
	},
	legendDot: {
		width: 14,
		height: 14,
		borderRadius: 3,
		borderWidth: 1.5,
	},
	legendText: {
		fontSize: 11,
		color: Colors.textSecondary,
	},
	deck: {
		gap: 10,
	},
	deckTitle: {
		fontSize: 13,
		fontWeight: "600",
		color: Colors.text,
		textAlign: "center",
	},
	deckGrid: {
		borderWidth: 1,
		borderColor: Colors.border,
		borderRadius: 12,
		padding: 10,
		gap: 6,
	},
	seatRow: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 6,
	},
	seatBase: {
		borderWidth: 1.5,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		padding: 3,
	},
	seater: {
		width: 50,
		height: 46,
	},
	sleeper: {
		width: 50,
		height: 62,
	},
	seatId: {
		fontSize: 10,
		fontWeight: "700",
	},
	seatPrice: {
		fontSize: 8,
		marginTop: 1,
	},
	seatDisabledText: {
		opacity: 0.5,
	},
	emptySlot: {
		width: 50,
		height: 46,
	},
});
