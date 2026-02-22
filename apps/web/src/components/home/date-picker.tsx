"use client";

import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
	className?: string;
	date: Date | undefined;
	onDateChange: (date: Date | undefined) => void;
}

function DatePicker({ className, date, onDateChange }: DatePickerProps) {
	const [isOpen, setIsOpen] = React.useState(false);

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const handleToday = () => {
		const now = new Date();
		now.setHours(0, 0, 0, 0);
		onDateChange(now);
		setIsOpen(false);
	};

	const handleTomorrow = () => {
		const tomorrow = addDays(new Date(), 1);
		tomorrow.setHours(0, 0, 0, 0);
		onDateChange(tomorrow);
		setIsOpen(false);
	};

	return (
		<Field className={cn("w-full md:w-auto", className)}>
			<FieldLabel className="text-base font-bold" htmlFor="date-picker">
				Date
			</FieldLabel>
			<div className="flex flex-wrap items-center gap-4 md:flex-nowrap">
				<Popover onOpenChange={setIsOpen} open={isOpen}>
					<PopoverTrigger
						className={cn(
							buttonVariants({ variant: "ghost" }),
							"h-12 w-fit justify-start gap-3 px-4 font-normal shadow-none hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2"
						)}
						id="date-picker"
					>
						<CalendarIcon className="size-5 text-muted-foreground" />
						{date ? (
							<span className="text-base font-medium">
								{format(date, "dd/MM/yy")}
							</span>
						) : (
							<span className="text-base text-muted-foreground">
								Pick a date
							</span>
						)}
					</PopoverTrigger>
					<PopoverContent align="start" className="w-auto p-0">
						<Calendar
							captionLayout="dropdown"
							disabled={{ before: today }}
							mode="single"
							onSelect={(d) => {
								onDateChange(d);
								setIsOpen(false);
							}}
							selected={date}
							showOutsideDays={false}
							startMonth={today}
						/>
					</PopoverContent>
				</Popover>

				<div className="flex w-full flex-wrap gap-2 md:w-auto md:flex-nowrap">
					<Button
						className="h-10 px-4 text-base font-medium hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2"
						onClick={handleToday}
						variant="ghost"
					>
						Today
					</Button>
					<Button
						className="h-10 px-4 text-base font-medium hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2"
						onClick={handleTomorrow}
						variant="ghost"
					>
						Tomorrow
					</Button>
				</div>
			</div>
		</Field>
	);
}

export { DatePicker };
