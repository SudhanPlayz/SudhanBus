import { useRouter } from "expo-router";
import { useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { Colors } from "@/constants/colors";

export default function SignupScreen() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : undefined}
			style={styles.container}
		>
			<ScrollView
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.header}>
					<Text style={styles.title}>Create your account</Text>
					<Text style={styles.subtitle}>
						Sign up to start booking buses on SudhanBus
					</Text>
				</View>

				<View style={styles.form}>
					<View style={styles.field}>
						<Text style={styles.label}>Full Name</Text>
						<TextInput
							autoCapitalize="words"
							autoComplete="name"
							onChangeText={setName}
							placeholder="John Doe"
							placeholderTextColor={Colors.textMuted}
							style={styles.input}
							value={name}
						/>
					</View>

					<View style={styles.field}>
						<Text style={styles.label}>Email</Text>
						<TextInput
							autoCapitalize="none"
							autoComplete="email"
							keyboardType="email-address"
							onChangeText={setEmail}
							placeholder="you@example.com"
							placeholderTextColor={Colors.textMuted}
							style={styles.input}
							value={email}
						/>
					</View>

					<View style={styles.field}>
						<Text style={styles.label}>Phone Number</Text>
						<TextInput
							autoComplete="tel"
							keyboardType="phone-pad"
							onChangeText={setPhone}
							placeholder="+91 98765 43210"
							placeholderTextColor={Colors.textMuted}
							style={styles.input}
							value={phone}
						/>
					</View>

					<View style={styles.field}>
						<View style={styles.passwordRow}>
							<View style={styles.passwordField}>
								<Text style={styles.label}>Password</Text>
								<TextInput
									autoCapitalize="none"
									onChangeText={setPassword}
									secureTextEntry
									style={styles.input}
									value={password}
								/>
							</View>
							<View style={styles.passwordField}>
								<Text style={styles.label}>Confirm</Text>
								<TextInput
									autoCapitalize="none"
									onChangeText={setConfirmPassword}
									secureTextEntry
									style={styles.input}
									value={confirmPassword}
								/>
							</View>
						</View>
						<Text style={styles.hint}>Must be at least 8 characters long.</Text>
					</View>

					<Pressable style={styles.button}>
						<Text style={styles.buttonText}>Create Account</Text>
					</Pressable>

					<View style={styles.switchRow}>
						<Text style={styles.switchText}>Already have an account? </Text>
						<Pressable onPress={() => router.replace("/(auth)/login")}>
							<Text style={styles.switchLink}>Sign in</Text>
						</Pressable>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
	},
	scrollContent: {
		flexGrow: 1,
		paddingHorizontal: 24,
		paddingVertical: 32,
	},
	header: {
		alignItems: "center",
		marginBottom: 28,
	},
	title: {
		fontSize: 24,
		fontWeight: "700",
		color: Colors.text,
	},
	subtitle: {
		marginTop: 8,
		fontSize: 14,
		color: Colors.textSecondary,
	},
	form: {
		gap: 18,
	},
	field: {
		gap: 6,
	},
	label: {
		fontSize: 14,
		fontWeight: "500",
		color: Colors.text,
	},
	input: {
		borderWidth: 1,
		borderColor: Colors.border,
		borderRadius: 10,
		paddingHorizontal: 14,
		paddingVertical: 12,
		fontSize: 15,
		color: Colors.text,
		backgroundColor: Colors.background,
	},
	passwordRow: {
		flexDirection: "row",
		gap: 12,
	},
	passwordField: {
		flex: 1,
		gap: 6,
	},
	hint: {
		fontSize: 12,
		color: Colors.textMuted,
		marginTop: 2,
	},
	button: {
		backgroundColor: Colors.primary,
		paddingVertical: 14,
		borderRadius: 10,
		alignItems: "center",
		marginTop: 4,
	},
	buttonText: {
		color: "#FFFFFF",
		fontWeight: "600",
		fontSize: 15,
	},
	switchRow: {
		flexDirection: "row",
		justifyContent: "center",
	},
	switchText: {
		fontSize: 14,
		color: Colors.textSecondary,
	},
	switchLink: {
		fontSize: 14,
		fontWeight: "500",
		color: Colors.text,
		textDecorationLine: "underline",
	},
});
