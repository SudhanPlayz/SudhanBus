import { Ionicons } from "@expo/vector-icons";
import { Button, Card, Select, cn, useThemeColor } from "heroui-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { CITIES } from "./cities";

type SelectOption = { value: string; label: string } | undefined;

function SearchSection() {
	const [from, setFrom] = useState<SelectOption>(undefined);
	const [to, setTo] = useState<SelectOption>(undefined);
	const [dateLabel, setDateLabel] = useState<string | null>(null);

	const foregroundColor = useThemeColor("foreground");

	const handleSwap = () => {
		const prev = from;
		setFrom(to);
		setTo(prev);
	};

	const handleToday = () => {
		const now = new Date();
		setDateLabel(
			now.toLocaleDateString("en-IN", {
				day: "2-digit",
				month: "2-digit",
				year: "2-digit",
			}),
		);
	};

	const handleTomorrow = () => {
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		setDateLabel(
			tomorrow.toLocaleDateString("en-IN", {
				day: "2-digit",
				month: "2-digit",
				year: "2-digit",
			}),
		);
	};

	const fromDisabledKeys = to ? [to.value] : [];
	const toDisabledKeys = from ? [from.value] : [];

	return (
		<View className="w-full">
			{/* Hero */}
			<View className="items-center justify-center bg-accent px-4 py-12">
				<Text className="mb-2 text-center font-bold text-3xl text-accent-foreground">
					Book Your Bus Ticket
				</Text>
				<Text className="text-center text-base text-accent-foreground opacity-80">
					Search and book bus tickets across India
				</Text>
			</View>

			{/* Search Card */}
			<View className="-mt-6 px-4 pb-6">
				<Card className="rounded-2xl p-4">
					{/* From */}
					<View className="mb-3">
						<Text className="mb-1 font-medium text-foreground text-xs">
							From
						</Text>
						<Select
							value={from}
							onValueChange={(opt) => setFrom(opt)}
							presentation="bottom-sheet"
						>
							<Select.Trigger className="w-full">
								<View className="flex-row items-center gap-2">
									<Ionicons
										name="location-outline"
										size={16}
										color={foregroundColor}
									/>
									<Select.Value placeholder="Select origin" />
								</View>
							</Select.Trigger>
							<Select.Portal>
								<Select.Overlay />
								<Select.Content presentation="bottom-sheet">
									{CITIES.filter(
										(c) => !fromDisabledKeys.includes(c.value),
									).map((city) => (
										<Select.Item
											key={city.value}
											value={city.value}
											label={city.label}
										>
											<Select.ItemLabel />
										</Select.Item>
									))}
								</Select.Content>
							</Select.Portal>
						</Select>
					</View>

					{/* Swap button */}
					<View className="mb-3 items-center">
						<Pressable
							className="h-8 w-8 items-center justify-center rounded-full border border-border bg-background active:opacity-70"
							onPress={handleSwap}
						>
							<Ionicons
								name="swap-vertical"
								size={16}
								color={foregroundColor}
							/>
						</Pressable>
					</View>

					{/* To */}
					<View className="mb-3">
						<Text className="mb-1 font-medium text-foreground text-xs">
							To
						</Text>
						<Select
							value={to}
							onValueChange={(opt) => setTo(opt)}
							presentation="bottom-sheet"
						>
							<Select.Trigger className="w-full">
								<View className="flex-row items-center gap-2">
									<Ionicons
										name="navigate-outline"
										size={16}
										color={foregroundColor}
									/>
									<Select.Value placeholder="Select destination" />
								</View>
							</Select.Trigger>
							<Select.Portal>
								<Select.Overlay />
								<Select.Content presentation="bottom-sheet">
									{CITIES.filter(
										(c) => !toDisabledKeys.includes(c.value),
									).map((city) => (
										<Select.Item
											key={city.value}
											value={city.value}
											label={city.label}
										>
											<Select.ItemLabel />
										</Select.Item>
									))}
								</Select.Content>
							</Select.Portal>
						</Select>
					</View>

					{/* Date */}
					<View className="mb-4">
						<Text className="mb-1 font-medium text-foreground text-xs">
							Date
						</Text>
						<View className="flex-row items-center gap-2">
							<View className="flex-1 flex-row items-center gap-2 rounded-lg border border-border px-3 py-2.5">
								<Ionicons
									name="calendar-outline"
									size={16}
									color={foregroundColor}
								/>
								<Text
									className={cn(
										"text-sm",
										dateLabel ? "text-foreground" : "text-muted",
									)}
								>
									{dateLabel ?? "Pick a date"}
								</Text>
							</View>
							<Button variant="outline" size="sm" onPress={handleToday}>
								<Button.Label>Today</Button.Label>
							</Button>
							<Button variant="outline" size="sm" onPress={handleTomorrow}>
								<Button.Label>Tomorrow</Button.Label>
							</Button>
						</View>
					</View>

					{/* Search button */}
					<Button
						className="w-full rounded-full"
						size="lg"
						onPress={() => {}}
					>
						<View className="flex-row items-center gap-2">
							<Ionicons name="search" size={18} color="white" />
							<Button.Label className="font-semibold text-base">
								Search buses
							</Button.Label>
						</View>
					</Button>
				</Card>
			</View>
		</View>
	);
}

export { SearchSection };
