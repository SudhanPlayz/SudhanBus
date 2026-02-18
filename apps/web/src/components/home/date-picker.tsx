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
import { cn } from "@/lib/utils";

interface DatePickerProps {
	className?: string; // Added className
	date: Date | undefined;
	onDateChange: (date: Date | undefined) => void;
}

function DatePicker({ className, date, onDateChange }: DatePickerProps) {
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
		<Field className={cn("w-full md:w-auto", className)}>
			<FieldLabel htmlFor="date-picker">Date</FieldLabel>
			<div className="flex flex-wrap items-center gap-2 md:flex-nowrap">
				<Popover>
					<PopoverTrigger
						render={
							<Button
								className="w-full justify-start gap-2 font-normal md:w-40"
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
							disabled={{ before: today }}
							fromDate={today}
							mode="single"
							onSelect={onDateChange}
							selected={date}
							showOutsideDays={false}
						/>
					</PopoverContent>
				</Popover>

				<div className="flex w-full flex-wrap gap-2 md:w-auto md:flex-nowrap">
					<Button onClick={handleToday} size="sm" variant="outline">
						Today
					</Button>
					<Button onClick={handleTomorrow} size="sm" variant="outline">
						Tomorrow
					</Button>
				</div>
			</div>
		</Field>
	);
}

export { DatePicker };
