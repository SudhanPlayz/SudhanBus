import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
	Alert,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SeatLayout } from "@/components/seat-layout";
import { Colors } from "@/constants/colors";
import { DEMO_BUSES } from "@/data/bus.data";
import {
	BOARDING_POINTS,
	DROPPING_POINTS,
	generateDemoSeatLayout,
	type Seat,
} from "@/data/seat.data";

interface PassengerInfo {
	age: string;
	gender: "male" | "female" | "other";
	name: string;
	seatId: string;
}

const STEP_LABELS = [
	"Seat Selection",
	"Boarding",
	"Dropping",
	"Passenger Info",
	"Review",
	"Payment",
];

export default function BookingScreen() {
	const { busId } = useLocalSearchParams<{ busId: string }>();
	const router = useRouter();
	const insets = useSafeAreaInsets();

	const bus = DEMO_BUSES.find((b) => b.id === busId);
	const decks = useMemo(() => generateDemoSeatLayout(), []);

	const [step, setStep] = useState(0);
	const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
	const [boardingPoint, setBoardingPoint] = useState<string | null>(null);
	const [droppingPoint, setDroppingPoint] = useState<string | null>(null);
	const [passengers, setPassengers] = useState<PassengerInfo[]>([]);

	if (!bus) {
		return (
			<View style={[styles.centered, { paddingTop: insets.top }]}>
				<Text style={styles.errorText}>Bus not found</Text>
				<Pressable onPress={() => router.back()} style={styles.backBtn}>
					<Text style={styles.backBtnText}>Go back</Text>
				</Pressable>
			</View>
		);
	}

	// Helper: flat list of all seats in all decks
	const allSeats = decks.flatMap((d) =>
		d.seats.flatMap((row) => row.filter((s): s is Seat => s !== null))
	);

	const totalPrice = selectedSeats.reduce((sum, sId) => {
		const seat = allSeats.find((s) => s.id === sId);
		return sum + (seat?.price ?? 0);
	}, 0);

	const handleSeatPress = (seatId: string) => {
		setSelectedSeats((prev) =>
			prev.includes(seatId)
				? prev.filter((s) => s !== seatId)
				: [...prev, seatId]
		);
	};

	const initPassengers = () => {
		setPassengers(
			selectedSeats.map((seatId) => ({
				seatId,
				name: "",
				age: "",
				gender: "male" as const,
			}))
		);
	};

	const updatePassenger = (
		seatId: string,
		field: keyof PassengerInfo,
		value: string
	) => {
		setPassengers((prev) =>
			prev.map((p) => (p.seatId === seatId ? { ...p, [field]: value } : p))
		);
	};

	const canGoNext = () => {
		switch (step) {
			case 0:
				return selectedSeats.length > 0;
			case 1:
				return boardingPoint !== null;
			case 2:
				return droppingPoint !== null;
			case 3:
				return passengers.every((p) => p.name.trim() && p.age.trim());
			default:
				return true;
		}
	};

	const handleNext = () => {
		if (step === 0) {
			initPassengers();
		}
		if (step < STEP_LABELS.length - 1) {
			setStep(step + 1);
		}
	};

	const handleConfirm = () => {
		Alert.alert(
			"Booking Confirmed! 🎉",
			`Your booking for ${bus.name} has been confirmed.\n\nSeats: ${selectedSeats.join(", ")}\nTotal: ₹${totalPrice.toLocaleString()}`,
			[{ text: "Done", onPress: () => router.dismissAll() }]
		);
	};

	// ─── Step 0: Seat Selection ───
	const renderSeatStep = () => (
		<View style={styles.stepContainer}>
			<Text style={styles.stepTitle}>Select Your Seats</Text>
			<Text style={styles.stepSubtitle}>
				Tap on available seats to select them
			</Text>
			<SeatLayout
				decks={decks}
				onSeatPress={handleSeatPress}
				selectedSeats={selectedSeats}
			/>
			{selectedSeats.length > 0 && (
				<View style={styles.selectionSummary}>
					<Text style={styles.summaryLabel}>
						{selectedSeats.length} seat{selectedSeats.length > 1 ? "s" : ""}{" "}
						selected
					</Text>
					<Text style={styles.summaryPrice}>
						₹{totalPrice.toLocaleString()}
					</Text>
				</View>
			)}
		</View>
	);

	// ─── Step 1: Boarding ───
	const renderBoardingStep = () => (
		<View style={styles.stepContainer}>
			<Text style={styles.stepTitle}>Select Boarding Point</Text>
			<Text style={styles.stepSubtitle}>Choose your pickup location</Text>
			{BOARDING_POINTS.map((point) => (
				<Pressable
					key={point.id}
					onPress={() => setBoardingPoint(point.id)}
					style={[
						styles.pointCard,
						boardingPoint === point.id && styles.pointCardActive,
					]}
				>
					<View
						style={[
							styles.pointIcon,
							boardingPoint === point.id && styles.pointIconActive,
						]}
					>
						<Ionicons
							color={boardingPoint === point.id ? "#FFFFFF" : Colors.textMuted}
							name="location"
							size={16}
						/>
					</View>
					<View style={styles.pointContent}>
						<View style={styles.pointHeader}>
							<Text style={styles.pointName}>{point.name}</Text>
							<Text style={styles.pointTime}>{point.time}</Text>
						</View>
						<Text style={styles.pointAddress}>{point.address}</Text>
					</View>
				</Pressable>
			))}
		</View>
	);

	// ─── Step 2: Dropping ───
	const renderDroppingStep = () => (
		<View style={styles.stepContainer}>
			<Text style={styles.stepTitle}>Select Dropping Point</Text>
			<Text style={styles.stepSubtitle}>Choose your drop-off location</Text>
			{DROPPING_POINTS.map((point) => (
				<Pressable
					key={point.id}
					onPress={() => setDroppingPoint(point.id)}
					style={[
						styles.pointCard,
						droppingPoint === point.id && styles.pointCardActive,
					]}
				>
					<View
						style={[
							styles.pointIcon,
							droppingPoint === point.id && styles.pointIconActive,
						]}
					>
						<Ionicons
							color={droppingPoint === point.id ? "#FFFFFF" : Colors.textMuted}
							name="navigate"
							size={16}
						/>
					</View>
					<View style={styles.pointContent}>
						<View style={styles.pointHeader}>
							<Text style={styles.pointName}>{point.name}</Text>
							<Text style={styles.pointTime}>{point.time}</Text>
						</View>
						<Text style={styles.pointAddress}>{point.address}</Text>
					</View>
				</Pressable>
			))}
		</View>
	);

	// ─── Step 3: Passenger Info ───
	const renderPassengerStep = () => (
		<View style={styles.stepContainer}>
			<Text style={styles.stepTitle}>Passenger Information</Text>
			<Text style={styles.stepSubtitle}>
				Enter details for {passengers.length} passenger
				{passengers.length > 1 ? "s" : ""}
			</Text>
			{passengers.map((passenger, idx) => (
				<View key={passenger.seatId} style={styles.passengerCard}>
					<View style={styles.passengerHeader}>
						<View style={styles.passengerBadge}>
							<Ionicons color="#FFFFFF" name="person" size={12} />
						</View>
						<Text style={styles.passengerLabel}>
							Passenger {idx + 1} — Seat {passenger.seatId}
						</Text>
					</View>
					<TextInput
						onChangeText={(val) =>
							updatePassenger(passenger.seatId, "name", val)
						}
						placeholder="Full Name"
						placeholderTextColor={Colors.textMuted}
						style={styles.input}
						value={passenger.name}
					/>
					<TextInput
						keyboardType="numeric"
						onChangeText={(val) =>
							updatePassenger(passenger.seatId, "age", val)
						}
						placeholder="Age"
						placeholderTextColor={Colors.textMuted}
						style={styles.input}
						value={passenger.age}
					/>
					<View style={styles.genderRow}>
						{(["male", "female", "other"] as const).map((g) => (
							<Pressable
								key={g}
								onPress={() => updatePassenger(passenger.seatId, "gender", g)}
								style={[
									styles.genderBtn,
									passenger.gender === g && styles.genderBtnActive,
								]}
							>
								<Text
									style={[
										styles.genderBtnText,
										passenger.gender === g && styles.genderBtnTextActive,
									]}
								>
									{g.charAt(0).toUpperCase() + g.slice(1)}
								</Text>
							</Pressable>
						))}
					</View>
				</View>
			))}
		</View>
	);

	// ─── Step 4: Review ───
	const boarding = BOARDING_POINTS.find((b) => b.id === boardingPoint);
	const dropping = DROPPING_POINTS.find((d) => d.id === droppingPoint);

	const renderReviewStep = () => (
		<View style={styles.stepContainer}>
			<Text style={styles.stepTitle}>Review Your Booking</Text>
			<Text style={styles.stepSubtitle}>
				Please verify all details before proceeding.
			</Text>

			{/* Seats */}
			<View style={styles.reviewSection}>
				<View style={styles.reviewHeader}>
					<Text style={styles.reviewLabel}>Selected Seats</Text>
					<Pressable onPress={() => setStep(0)}>
						<Text style={styles.editLink}>Edit</Text>
					</Pressable>
				</View>
				<View style={styles.seatChips}>
					{selectedSeats.map((s) => (
						<View key={s} style={styles.seatChip}>
							<Text style={styles.seatChipText}>{s}</Text>
						</View>
					))}
				</View>
			</View>

			{/* Journey */}
			<View style={styles.reviewSection}>
				<View style={styles.reviewHeader}>
					<Text style={styles.reviewLabel}>Journey Details</Text>
					<Pressable onPress={() => setStep(1)}>
						<Text style={styles.editLink}>Edit</Text>
					</Pressable>
				</View>
				<Text style={styles.reviewBusName}>{bus.name}</Text>
				{boarding && (
					<View style={styles.journeyRow}>
						<Ionicons color={Colors.success} name="location" size={14} />
						<Text style={styles.journeyText}>
							{boarding.name} · {boarding.time}
						</Text>
					</View>
				)}
				{dropping && (
					<View style={styles.journeyRow}>
						<Ionicons color={Colors.danger} name="navigate" size={14} />
						<Text style={styles.journeyText}>
							{dropping.name} · {dropping.time}
						</Text>
					</View>
				)}
			</View>

			{/* Passengers */}
			<View style={styles.reviewSection}>
				<View style={styles.reviewHeader}>
					<Text style={styles.reviewLabel}>Passengers</Text>
					<Pressable onPress={() => setStep(3)}>
						<Text style={styles.editLink}>Edit</Text>
					</Pressable>
				</View>
				{passengers.map((p, i) => (
					<View key={p.seatId} style={styles.passengerRow}>
						<Text style={styles.passengerName}>
							{p.name || `Passenger ${i + 1}`}
						</Text>
						<Text style={styles.passengerMeta}>
							{p.age ? `${p.age} yrs` : "—"} · {p.gender} · {p.seatId}
						</Text>
					</View>
				))}
			</View>

			{/* Price */}
			<View style={styles.totalCard}>
				<Text style={styles.totalLabel}>Total Amount</Text>
				<Text style={styles.totalPrice}>₹{totalPrice.toLocaleString()}</Text>
			</View>
		</View>
	);

	// ─── Step 5: Payment ───
	const renderPaymentStep = () => (
		<View style={styles.stepContainer}>
			<Text style={styles.stepTitle}>Payment Summary</Text>
			<Text style={styles.stepSubtitle}>Review your booking details</Text>

			<View style={styles.paymentCard}>
				<View style={styles.paymentRow}>
					<Text style={styles.paymentLabel}>{bus.name}</Text>
					<Text style={styles.paymentMeta}>
						{selectedSeats.length} seat{selectedSeats.length > 1 ? "s" : ""}
					</Text>
				</View>
				<View style={styles.paymentDivider} />

				<View style={styles.paymentRow}>
					<Text style={styles.paymentMeta}>Seats</Text>
					<Text style={styles.paymentValue}>{selectedSeats.join(", ")}</Text>
				</View>

				{boarding && (
					<View style={styles.paymentRow}>
						<Text style={styles.paymentMeta}>Pickup</Text>
						<Text style={styles.paymentValue}>
							{boarding.name} ({boarding.time})
						</Text>
					</View>
				)}

				{dropping && (
					<View style={styles.paymentRow}>
						<Text style={styles.paymentMeta}>Drop</Text>
						<Text style={styles.paymentValue}>
							{dropping.name} ({dropping.time})
						</Text>
					</View>
				)}

				<View style={styles.paymentDivider} />

				{passengers.map((p, i) => (
					<View key={p.seatId} style={styles.paymentRow}>
						<Text style={styles.paymentValue}>
							{p.name || `Passenger ${i + 1}`}
						</Text>
						<Text style={styles.paymentMeta}>
							{p.age} yrs · {p.gender} · {p.seatId}
						</Text>
					</View>
				))}

				<View style={styles.paymentDivider} />

				<View style={styles.paymentRow}>
					<Text style={styles.paymentTotalLabel}>Total Amount</Text>
					<Text style={styles.paymentTotalValue}>
						₹{totalPrice.toLocaleString()}
					</Text>
				</View>
			</View>

			<Pressable onPress={handleConfirm} style={styles.payButton}>
				<Ionicons color="#FFFFFF" name="card" size={18} />
				<Text style={styles.payButtonText}>
					Proceed to Pay ₹{totalPrice.toLocaleString()}
				</Text>
			</Pressable>
		</View>
	);

	const renderStep = () => {
		switch (step) {
			case 0:
				return renderSeatStep();
			case 1:
				return renderBoardingStep();
			case 2:
				return renderDroppingStep();
			case 3:
				return renderPassengerStep();
			case 4:
				return renderReviewStep();
			case 5:
				return renderPaymentStep();
			default:
				return null;
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : undefined}
			style={styles.root}
		>
			{/* Modal header */}
			<View style={[styles.header, { paddingTop: insets.top + 8 }]}>
				<Pressable hitSlop={12} onPress={() => router.back()}>
					<Ionicons color={Colors.text} name="close" size={24} />
				</Pressable>
				<View style={styles.headerCenter}>
					<Text numberOfLines={1} style={styles.headerTitle}>
						{bus.name}
					</Text>
					<Text style={styles.headerSubtitle}>{STEP_LABELS[step]}</Text>
				</View>
				<Text style={styles.stepIndicator}>
					{step + 1}/{STEP_LABELS.length}
				</Text>
			</View>

			{/* Progress bar */}
			<View style={styles.progressBar}>
				<View
					style={[
						styles.progressFill,
						{ width: `${((step + 1) / STEP_LABELS.length) * 100}%` },
					]}
				/>
			</View>

			{/* Content */}
			<ScrollView
				contentContainerStyle={[
					styles.scrollContent,
					{ paddingBottom: insets.bottom + 80 },
				]}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
				style={styles.scrollView}
			>
				{renderStep()}
			</ScrollView>

			{/* Bottom bar */}
			{step < 5 && (
				<View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
					{step > 0 && (
						<Pressable
							onPress={() => setStep(step - 1)}
							style={styles.backButton}
						>
							<Ionicons color={Colors.text} name="arrow-back" size={18} />
							<Text style={styles.backButtonText}>Back</Text>
						</Pressable>
					)}
					<View style={{ flex: 1 }} />
					<Pressable
						disabled={!canGoNext()}
						onPress={handleNext}
						style={[
							styles.nextButton,
							!canGoNext() && styles.nextButtonDisabled,
						]}
					>
						<Text style={styles.nextButtonText}>
							{step === 4 ? "Proceed to Payment" : "Continue"}
						</Text>
						<Ionicons color="#FFFFFF" name="arrow-forward" size={16} />
					</Pressable>
				</View>
			)}
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: Colors.background,
	},
	centered: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	errorText: {
		fontSize: 16,
		color: Colors.textSecondary,
		marginBottom: 12,
	},
	backBtn: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: Colors.primary,
		borderRadius: 10,
	},
	backBtnText: {
		color: "#FFFFFF",
		fontWeight: "600",
	},
	// ─── Header ───
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingBottom: 12,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: Colors.border,
	},
	headerCenter: {
		flex: 1,
		marginHorizontal: 12,
	},
	headerTitle: {
		fontSize: 15,
		fontWeight: "600",
		color: Colors.text,
	},
	headerSubtitle: {
		fontSize: 12,
		color: Colors.textMuted,
	},
	stepIndicator: {
		fontSize: 13,
		fontWeight: "500",
		color: Colors.textMuted,
	},
	progressBar: {
		height: 3,
		backgroundColor: Colors.muted,
	},
	progressFill: {
		height: 3,
		backgroundColor: Colors.primary,
	},
	// ─── Content ───
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		padding: 16,
	},
	stepContainer: {
		gap: 12,
	},
	stepTitle: {
		fontSize: 17,
		fontWeight: "700",
		color: Colors.text,
	},
	stepSubtitle: {
		fontSize: 13,
		color: Colors.textSecondary,
		marginBottom: 4,
	},
	// ─── Seat step ───
	selectionSummary: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: Colors.primaryLight,
		padding: 12,
		borderRadius: 10,
		marginTop: 4,
	},
	summaryLabel: {
		fontSize: 14,
		fontWeight: "500",
		color: Colors.text,
	},
	summaryPrice: {
		fontSize: 16,
		fontWeight: "700",
		color: Colors.primary,
	},
	// ─── Boarding / Dropping ───
	pointCard: {
		flexDirection: "row",
		gap: 12,
		borderWidth: 2,
		borderColor: Colors.border,
		borderRadius: 14,
		padding: 14,
	},
	pointCardActive: {
		borderColor: Colors.primary,
		backgroundColor: Colors.primaryLight,
	},
	pointIcon: {
		width: 34,
		height: 34,
		borderRadius: 17,
		backgroundColor: Colors.muted,
		alignItems: "center",
		justifyContent: "center",
	},
	pointIconActive: {
		backgroundColor: Colors.primary,
	},
	pointContent: {
		flex: 1,
	},
	pointHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	pointName: {
		fontSize: 14,
		fontWeight: "500",
		color: Colors.text,
	},
	pointTime: {
		fontSize: 13,
		fontWeight: "600",
		color: Colors.primary,
	},
	pointAddress: {
		fontSize: 12,
		color: Colors.textMuted,
		marginTop: 2,
	},
	// ─── Passenger Info ───
	passengerCard: {
		borderWidth: 2,
		borderColor: Colors.border,
		borderRadius: 14,
		padding: 14,
		gap: 10,
	},
	passengerHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	passengerBadge: {
		width: 26,
		height: 26,
		borderRadius: 13,
		backgroundColor: Colors.primary,
		alignItems: "center",
		justifyContent: "center",
	},
	passengerLabel: {
		fontSize: 14,
		fontWeight: "500",
		color: Colors.text,
	},
	input: {
		borderWidth: 1,
		borderColor: Colors.border,
		borderRadius: 10,
		paddingHorizontal: 12,
		paddingVertical: 10,
		fontSize: 14,
		color: Colors.text,
	},
	genderRow: {
		flexDirection: "row",
		gap: 8,
	},
	genderBtn: {
		flex: 1,
		borderWidth: 1.5,
		borderColor: Colors.border,
		borderRadius: 10,
		paddingVertical: 8,
		alignItems: "center",
	},
	genderBtnActive: {
		borderColor: Colors.primary,
		backgroundColor: Colors.primaryLight,
	},
	genderBtnText: {
		fontSize: 13,
		fontWeight: "500",
		color: Colors.text,
	},
	genderBtnTextActive: {
		color: Colors.primary,
		fontWeight: "600",
	},
	// ─── Review ───
	reviewSection: {
		borderWidth: 1,
		borderColor: Colors.border,
		borderRadius: 14,
		padding: 14,
		gap: 8,
	},
	reviewHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	reviewLabel: {
		fontSize: 14,
		fontWeight: "600",
		color: Colors.text,
	},
	editLink: {
		fontSize: 12,
		fontWeight: "500",
		color: Colors.primary,
	},
	seatChips: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 6,
	},
	seatChip: {
		borderWidth: 1,
		borderColor: Colors.primary,
		backgroundColor: Colors.primaryLight,
		borderRadius: 8,
		paddingHorizontal: 10,
		paddingVertical: 4,
	},
	seatChipText: {
		fontSize: 12,
		fontWeight: "600",
		color: Colors.primary,
	},
	reviewBusName: {
		fontSize: 14,
		fontWeight: "500",
		color: Colors.textSecondary,
	},
	journeyRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
	journeyText: {
		fontSize: 13,
		color: Colors.textSecondary,
	},
	passengerRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 6,
		borderTopWidth: StyleSheet.hairlineWidth,
		borderTopColor: Colors.border,
	},
	passengerName: {
		fontSize: 13,
		fontWeight: "500",
		color: Colors.text,
	},
	passengerMeta: {
		fontSize: 11,
		color: Colors.textMuted,
	},
	totalCard: {
		backgroundColor: Colors.primaryLight,
		borderRadius: 14,
		padding: 14,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	totalLabel: {
		fontSize: 14,
		fontWeight: "600",
		color: Colors.text,
	},
	totalPrice: {
		fontSize: 18,
		fontWeight: "700",
		color: Colors.primary,
	},
	// ─── Payment ───
	paymentCard: {
		backgroundColor: Colors.muted,
		borderRadius: 14,
		padding: 16,
		gap: 8,
	},
	paymentRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	paymentLabel: {
		fontSize: 14,
		fontWeight: "600",
		color: Colors.text,
	},
	paymentMeta: {
		fontSize: 12,
		color: Colors.textMuted,
	},
	paymentValue: {
		fontSize: 13,
		fontWeight: "500",
		color: Colors.text,
	},
	paymentDivider: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: Colors.border,
		marginVertical: 4,
	},
	paymentTotalLabel: {
		fontSize: 16,
		fontWeight: "700",
		color: Colors.text,
	},
	paymentTotalValue: {
		fontSize: 18,
		fontWeight: "700",
		color: Colors.primary,
	},
	payButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		backgroundColor: Colors.primary,
		paddingVertical: 16,
		borderRadius: 14,
		marginTop: 4,
	},
	payButtonText: {
		color: "#FFFFFF",
		fontWeight: "700",
		fontSize: 15,
	},
	// ─── Bottom bar ───
	bottomBar: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingTop: 12,
		borderTopWidth: StyleSheet.hairlineWidth,
		borderTopColor: Colors.border,
		backgroundColor: Colors.background,
	},
	backButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	backButtonText: {
		fontSize: 14,
		fontWeight: "500",
		color: Colors.text,
	},
	nextButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		backgroundColor: Colors.primary,
		paddingHorizontal: 22,
		paddingVertical: 12,
		borderRadius: 24,
	},
	nextButtonDisabled: {
		opacity: 0.45,
	},
	nextButtonText: {
		color: "#FFFFFF",
		fontWeight: "600",
		fontSize: 14,
	},
});
