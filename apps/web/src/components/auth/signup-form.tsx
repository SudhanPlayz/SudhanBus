"use client";

import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function SignupForm({
	className,
	onSwitchToLogin,
	...props
}: Omit<React.ComponentProps<"div">, "ref"> & {
	onSwitchToLogin?: () => void;
}) {
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<form className="flex flex-col gap-6">
				<FieldGroup>
					<div className="flex flex-col items-center gap-2 text-center">
						<h1 className="font-bold text-2xl">Create your account</h1>
						<p className="text-balance text-muted-foreground text-sm">
							Sign up to start booking buses on SudhanBus
						</p>
					</div>
					<Field>
						<FieldLabel htmlFor="signup-name">Full Name</FieldLabel>
						<Input
							id="signup-name"
							placeholder="John Doe"
							required
							type="text"
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="signup-email">Email</FieldLabel>
						<Input
							id="signup-email"
							placeholder="you@example.com"
							required
							type="email"
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="signup-phone">Phone Number</FieldLabel>
						<Input
							id="signup-phone"
							placeholder="+91 98765 43210"
							required
							type="tel"
						/>
					</Field>
					<Field>
						<div className="grid grid-cols-2 gap-4">
							<Field>
								<FieldLabel htmlFor="signup-password">Password</FieldLabel>
								<Input id="signup-password" required type="password" />
							</Field>
							<Field>
								<FieldLabel htmlFor="signup-confirm-password">
									Confirm
								</FieldLabel>
								<Input id="signup-confirm-password" required type="password" />
							</Field>
						</div>
						<FieldDescription>
							Must be at least 8 characters long.
						</FieldDescription>
					</Field>
					<Field>
						<Button className="w-full" type="submit">
							Create Account
						</Button>
					</Field>
					<FieldDescription className="text-center text-sm">
						Already have an account?{" "}
						<button
							className="cursor-pointer font-medium underline underline-offset-2 hover:text-foreground"
							onClick={onSwitchToLogin}
							type="button"
						>
							Sign in
						</button>
					</FieldDescription>
				</FieldGroup>
			</form>
		</div>
	);
}
