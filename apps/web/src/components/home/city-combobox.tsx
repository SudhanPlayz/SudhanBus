"use client";

import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/components/ui/combobox";
import { Field, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { CITIES } from "./cities";

const cityLabels = CITIES.map((city) => city.label);

interface CityComboboxProps {
	className?: string;
	disabledValues?: (string | null)[];
	icon?: React.ReactNode;
	label: string;
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
	placeholder = "Select city",
	disabledValues = [],
}: CityComboboxProps) {
	const selectedCity = CITIES.find((city) => city.value === value);

	const handleValueChange = (cityLabel: string | null) => {
		if (!cityLabel) {
			onValueChange(null);
			return;
		}
		const city = CITIES.find((c) => c.label === cityLabel);
		onValueChange(city?.value ?? null);
	};

	return (
		<Field className={cn("w-full sm:w-48", className)}>
			<FieldLabel htmlFor={`city-${label.toLowerCase()}`}>{label}</FieldLabel>
			<Combobox
				items={cityLabels}
				onValueChange={handleValueChange}
				value={selectedCity?.label ?? null}
			>
				<ComboboxInput
					id={`city-${label.toLowerCase()}`}
					placeholder={placeholder}
					showTrigger
					startIcon={icon}
				/>
				<ComboboxContent>
					<ComboboxEmpty>No city found.</ComboboxEmpty>
					<ComboboxList>
						{(item) => {
							const isDisabled = disabledValues.includes(
								CITIES.find((c) => c.label === item)?.value ?? null
							);
							return (
								<ComboboxItem disabled={isDisabled} key={item} value={item}>
									{item}
								</ComboboxItem>
							);
						}}
					</ComboboxList>
				</ComboboxContent>
			</Combobox>
		</Field>
	);
}

export { CityCombobox };
