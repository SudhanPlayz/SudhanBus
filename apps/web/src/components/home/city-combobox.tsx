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
import { CITIES } from "./cities";

const cityLabels = CITIES.map((city) => city.label);

interface CityComboboxProps {
	label: string;
	onValueChange: (value: string | null) => void;
	placeholder?: string;
	value: string | null;
}

function CityCombobox({
	label,
	value,
	onValueChange,
	placeholder = "Select city",
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
		<Field className="w-full sm:w-48">
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
				/>
				<ComboboxContent>
					<ComboboxEmpty>No city found.</ComboboxEmpty>
					<ComboboxList>
						{(item) => (
							<ComboboxItem key={item} value={item}>
								{item}
							</ComboboxItem>
						)}
					</ComboboxList>
				</ComboboxContent>
			</Combobox>
		</Field>
	);
}

export { CityCombobox };

