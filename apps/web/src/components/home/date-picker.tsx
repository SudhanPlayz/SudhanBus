"use client";

import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
	date: Date | undefined;
	onDateChange: (date: Date | undefined) => void;
}

function DatePicker({ date, onDateChange }: DatePickerProps) {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const handleToday = () => {
		const now = new Date();
		now.setHours(0, 0, 0, 0);
		onDateChange(now);
	};

	const handleTomorrow = () => {
		const tomorrow = addDays(new Date(), 1);
		tomorrow.setHours(0, 0, 0, 0);
		onDateChange(tomorrow);
	};

	return (
		<Field className="w-full md:w-auto">
			<FieldLabel htmlFor="date-picker">Date</FieldLabel>
			<div className="flex flex-wrap items-center gap-2">
				<Popover>
					<PopoverTrigger
						render={
							<Button
								className="w-full justify-start gap-2 font-normal sm:w-44"
								id="date-picker"
								variant="outline"
							>
								<CalendarIcon className="size-4 text-muted-foreground" />
								{date ? (
									format(date, "dd/MM/yy")
								) : (
									<span className="text-muted-foreground">Pick a date</span>
								)}
							</Button>
						}
					/>
					<PopoverContent align="start" className="w-auto p-0">
						<Calendar
							defaultMonth={date}
							disabled={{ before: today }}
							mode="single"
							onSelect={onDateChange}
							selected={date}
						/>
					</PopoverContent>
				</Popover>
				<Button onClick={handleToday} size="sm" variant="outline">
					Today
				</Button>
				<Button onClick={handleTomorrow} size="sm" variant="outline">
					Tomorrow
				</Button>
			</div>
		</Field>
	);
}

export { DatePicker };
