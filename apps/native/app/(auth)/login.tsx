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

export default function LoginScreen() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : undefined}
		>
			<ScrollView
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.header}>
					<Text style={styles.title}>Welcome back</Text>
					<Text style={styles.subtitle}>
						Sign in to your SudhanBus account
					</Text>
				</View>

				<View style={styles.form}>
					<View style={styles.field}>
						<Text style={styles.label}>Email</Text>
						<TextInput
							style={styles.input}
							placeholder="you@example.com"
							placeholderTextColor={Colors.textMuted}
							keyboardType="email-address"
							autoCapitalize="none"
							autoComplete="email"
							value={email}
							onChangeText={setEmail}
						/>
					</View>

					<View style={styles.field}>
						<View style={styles.labelRow}>
							<Text style={styles.label}>Password</Text>
							<Pressable>
								<Text style={styles.forgotLink}>Forgot password?</Text>
							</Pressable>
						</View>
						<TextInput
							style={styles.input}
							secureTextEntry
							autoCapitalize="none"
							value={password}
							onChangeText={setPassword}
						/>
					</View>

					<Pressable style={styles.button}>
						<Text style={styles.buttonText}>Sign In</Text>
					</Pressable>

					<View style={styles.switchRow}>
						<Text style={styles.switchText}>Don't have an account? </Text>
						<Pressable onPress={() => router.replace("/(auth)/signup")}>
							<Text style={styles.switchLink}>Create one</Text>
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
		marginBottom: 32,
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
		gap: 20,
	},
	field: {
		gap: 6,
	},
	label: {
		fontSize: 14,
		fontWeight: "500",
		color: Colors.text,
	},
	labelRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	forgotLink: {
		fontSize: 13,
		color: Colors.textSecondary,
		textDecorationLine: "underline",
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
