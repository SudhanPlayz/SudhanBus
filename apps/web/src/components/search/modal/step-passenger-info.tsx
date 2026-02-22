"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface PassengerInfo {
	age: string;
	gender: "male" | "female" | "other";
	name: string;
	seatId: string;
}

const passengerSchema = z.object({
	seatId: z.string(),
	name: z.string().min(2, "Name must be at least 2 characters."),
	age: z
		.string()
		.min(1, "Age should be a number.")
		.refine(
			(val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 120,
			"Enter a valid age."
		),
	gender: z.enum(["male", "female", "other"], {
		message: "Please select a gender.",
	}),
});

const formSchema = z.object({
	passengers: z.array(passengerSchema),
});

interface StepPassengerInfoProps {
	onPassengerChange: (passengers: PassengerInfo[]) => void;
	passengers: PassengerInfo[];
	selectedSeats: string[];
}

export function StepPassengerInfo({
	selectedSeats,
	passengers,
	onPassengerChange,
}: StepPassengerInfoProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			passengers:
				passengers.length === selectedSeats.length
					? passengers
					: selectedSeats.map((seatId) => ({
							seatId,
							name: "",
							age: "",
							gender: "male" as const,
						})),
		},
		mode: "onChange",
	});

	const { fields } = useFieldArray({
		control: form.control,
		name: "passengers",
	});

	// Sync form values to parent
	useEffect(() => {
		const subscription = form.watch((value) => {
			if (value.passengers) {
				onPassengerChange(value.passengers as PassengerInfo[]);
			}
		});
		return () => subscription.unsubscribe();
	}, [form, onPassengerChange]);

	return (
		<form className="space-y-3">
			<div>
				<h3 className="font-semibold text-base">Passenger Information</h3>
				<p className="text-muted-foreground text-sm">
					Enter details for {selectedSeats.length} passenger
					{selectedSeats.length > 1 ? "s" : ""}
				</p>
			</div>
			<div className="space-y-3">
				{fields.map((field, index) => (
					<div
						className="space-y-3 rounded-xl border-2 border-border p-3"
						key={field.id}
					>
						<div className="flex items-center gap-2">
							<div className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
								<User className="size-3.5" />
							</div>
							<span className="font-medium text-sm">
								Passenger {index + 1} — Seat {field.seatId}
							</span>
						</div>

						<div className="grid gap-3 sm:grid-cols-3">
							<Controller
								control={form.control}
								name={`passengers.${index}.name`}
								render={({ field: controllerField, fieldState }) => (
									<Field
										className="space-y-1"
										data-invalid={fieldState.invalid}
									>
										<FieldLabel
											className="font-medium text-muted-foreground text-xs"
											htmlFor={`name-${field.id}`}
										>
											Full Name
										</FieldLabel>
										<Input
											{...controllerField}
											aria-invalid={fieldState.invalid}
											autoComplete="off"
											className="h-9 w-full rounded-lg px-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary/50"
											id={`name-${field.id}`}
											placeholder="Enter name"
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>

							<Controller
								control={form.control}
								name={`passengers.${index}.age`}
								render={({ field: controllerField, fieldState }) => (
									<Field
										className="space-y-1"
										data-invalid={fieldState.invalid}
									>
										<FieldLabel
											className="font-medium text-muted-foreground text-xs"
											htmlFor={`age-${field.id}`}
										>
											Age
										</FieldLabel>
										<Input
											{...controllerField}
											aria-invalid={fieldState.invalid}
											className="h-9 w-full rounded-lg px-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary/50"
											id={`age-${field.id}`}
											placeholder="Age"
											type="number"
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>

							<Controller
								control={form.control}
								name={`passengers.${index}.gender`}
								render={({ field: controllerField, fieldState }) => (
									<Field
										className="space-y-1"
										data-invalid={fieldState.invalid}
									>
										<FieldLabel className="font-medium text-muted-foreground text-xs">
											Gender
										</FieldLabel>
										<div className="flex gap-1.5 h-9">
											{(["male", "female", "other"] as const).map((g) => (
												<button
													className={cn(
														"flex-1 rounded-lg border px-2 py-1.5 font-medium text-xs capitalize transition-colors h-full",
														controllerField.value === g
															? "border-primary bg-primary/10 text-primary"
															: "border-border hover:bg-muted/50"
													)}
													key={g}
													onClick={() => controllerField.onChange(g)}
													type="button"
												>
													{g}
												</button>
											))}
										</div>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
						</div>
					</div>
				))}
			</div>
		</form>
	);
}
