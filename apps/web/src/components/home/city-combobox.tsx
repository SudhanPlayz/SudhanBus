"use client";

import {
	getRecentRoutes,
	type Route,
	useUserStore,
} from "@sudhanbus/zustand/stores/user";
import { useEffect, useMemo, useState } from "react";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxInput,
	ComboboxItem,
	ComboboxLabel,
	ComboboxList,
	ComboboxSeparator,
} from "@/components/ui/combobox";
import { Field, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { CITIES, OTHER_CITIES, POPULAR_CITIES } from "./cities";

const getRouteLabel = (route: Route) => {
	const fromCity =
		CITIES.find((c) => c.value === route.from)?.label || route.from;
	const toCity = CITIES.find((c) => c.value === route.to)?.label || route.to;
	return `${fromCity} → ${toCity}`;
};

interface CityComboboxProps {
	className?: string;
	disabledValues?: (string | null)[];
	icon?: React.ReactNode;
	label: string;
	onRouteSelect?: (from: string, to: string) => void;
	onValueChange: (value: string | null) => void;
	placeholder?: string;
	value: string | null;
}

function CityCombobox({
	className,
	icon,
	label,
	value,
	onValueChange,
	onRouteSelect,
	placeholder = "Select city",
	disabledValues = [],
}: CityComboboxProps) {
	const [inputValue, setInputValue] = useState("");

	const recentRoutes = useUserStore(getRecentRoutes);

	const selectedCity = CITIES.find((city) => city.value === value);

	// Sync inputValue with the actual label when it changes externally (e.g. Route Selection)
	useEffect(() => {
		setInputValue(selectedCity?.label ?? "");
	}, [selectedCity?.label]);

	const { filteredRecent, filteredPopular, filteredOther } = useMemo(() => {
		const lowerInput = inputValue.trim().toLowerCase();

		const fRecent = recentRoutes.filter((r) =>
			getRouteLabel(r).toLowerCase().includes(lowerInput)
		);
		const fPopular = POPULAR_CITIES.filter((c) =>
			c.label.toLowerCase().includes(lowerInput)
		);
		const fOther = OTHER_CITIES.filter((c) =>
			c.label.toLowerCase().includes(lowerInput)
		);

		return {
			filteredRecent: fRecent,
			filteredPopular: fPopular,
			filteredOther: fOther,
		};
	}, [inputValue, recentRoutes]);

	const handleValueChange = (selectedValue: string | null) => {
		if (!selectedValue) {
			onValueChange(null);
			return;
		}

		const route = recentRoutes.find((r) => r.id === selectedValue);
		if (route && onRouteSelect) {
			onRouteSelect(route.from, route.to);
			return;
		}

		// When a built-in city is chosen, it passes its label as selectedValue
		const city = CITIES.find((c) => c.label === selectedValue);
		if (city) {
			onValueChange(city.value);
		} else {
			onValueChange(selectedValue);
		}
	};

	const hasNoResults =
		filteredRecent.length === 0 &&
		filteredPopular.length === 0 &&
		filteredOther.length === 0;

	return (
		<Field className={cn("w-full sm:w-56", className)}>
			<FieldLabel htmlFor={`city-${label.toLowerCase()}`}>{label}</FieldLabel>
			<Combobox
				inputValue={inputValue}
				onInputValueChange={setInputValue}
				onValueChange={handleValueChange}
				value={selectedCity?.label ?? null}
			>
				<ComboboxInput
					className="h-12 px-4 shadow-none outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 group-data-[invalid]:border-transparent group-data-[invalid]:ring-0"
					id={`city-${label.toLowerCase()}`}
					placeholder={placeholder}
					showTrigger
					startIcon={icon}
				/>
				<ComboboxContent className="w-64 p-2">
					{hasNoResults && <ComboboxEmpty>No city found.</ComboboxEmpty>}
					{!hasNoResults && (
						<ComboboxList>
							{/* Recent Searches */}
							{filteredRecent.length > 0 && (
								<ComboboxGroup>
									<ComboboxLabel>Recent Searches</ComboboxLabel>
									{filteredRecent.map((route) => (
										<ComboboxItem key={route.id} value={route.id}>
											{getRouteLabel(route)}
										</ComboboxItem>
									))}
									{(filteredPopular.length > 0 || filteredOther.length > 0) && (
										<ComboboxSeparator />
									)}
								</ComboboxGroup>
							)}

							{/* Popular Places */}
							{filteredPopular.length > 0 && (
								<ComboboxGroup>
									<ComboboxLabel>Popular Places</ComboboxLabel>
									{filteredPopular.map((city) => {
										const isDisabled = disabledValues.includes(city.value);
										return (
											<ComboboxItem
												disabled={isDisabled}
												key={city.value}
												value={city.label}
											>
												{city.label}
											</ComboboxItem>
										);
									})}
									{filteredOther.length > 0 && <ComboboxSeparator />}
								</ComboboxGroup>
							)}

							{/* Other Cities */}
							{filteredOther.length > 0 && (
								<ComboboxGroup>
									<ComboboxLabel>Other Cities</ComboboxLabel>
									{filteredOther.map((city) => {
										const isDisabled = disabledValues.includes(city.value);
										return (
											<ComboboxItem
												disabled={isDisabled}
												key={city.value}
												value={city.label}
											>
												{city.label}
											</ComboboxItem>
										);
									})}
								</ComboboxGroup>
							)}
						</ComboboxList>
					)}
				</ComboboxContent>
			</Combobox>
		</Field>
	);
}

export { CityCombobox };
