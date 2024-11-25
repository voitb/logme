// src/react/components/ForgotPasswordForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	ForgotPasswordFormData,
	forgotPasswordSchema,
} from "@/schemas/authSchemas";
import { useAuth } from "@/hooks/useAuth";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const ForgotPasswordForm = () => {
	const { forgotPassword } = useAuth();
	const form = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(forgotPasswordSchema),
	});

	const onSubmit = async (data: ForgotPasswordFormData) => {
		try {
			await forgotPassword(data.email);
			form.setError("root", {
				message: "Password forgot email sent. Please check your inbox.",
				type: "info",
			});
		} catch (err) {
			console.error(err);
			form.setError("root", {
				message: "Failed to send forgot email. Please try again later.",
			});
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
				{form.formState.errors.root && (
					<div
						className={`text-sm ${
							form.formState.errors.root.type === "info"
								? "text-green-500"
								: "text-red-500"
						}`}
					>
						{form.formState.errors.root.message}
					</div>
				)}
				<FormField
					name="email"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="Enter your email"
									className="!mt-1"
									{...field}
								/>
							</FormControl>
							<FormMessage className="absolute text-[11px] !mt-1" />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full !mt-10">
					Send Forgot Link
				</Button>
			</form>
		</Form>
	);
};

export default ForgotPasswordForm;
