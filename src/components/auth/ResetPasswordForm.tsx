// src/react/components/ResetPasswordForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	ResetPasswordFormData,
	resetPasswordSchema,
} from "@/schemas/authSchemas";
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

const ResetPasswordForm = () => {
	const form = useForm<ResetPasswordFormData>({
		resolver: zodResolver(resetPasswordSchema),
	});

	const onSubmit = async (data: ResetPasswordFormData) => {
		try {
			console.log("Password Reset Data:", data);
			// Call the API to reset the password
			// Example: await resetPasswordAPI(data.password);
			form.reset();
			form.setError("root", {
				message: "Your password has been reset successfully.",
				type: "success",
			});
		} catch (err) {
			console.error(err);
			form.setError("root", {
				message: "Failed to reset password. Please try again later.",
			});
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
				{form.formState.errors.root && (
					<div
						className={`text-sm ${
							form.formState.errors.root.type === "success"
								? "text-green-500"
								: "text-red-500"
						}`}
					>
						{form.formState.errors.root.message}
					</div>
				)}
				<FormField
					name="password"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>New Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Enter your new password"
									className="!mt-1"
									{...field}
								/>
							</FormControl>
							<FormMessage className="absolute text-[11px] !mt-1" />
						</FormItem>
					)}
				/>
				<FormField
					name="confirmPassword"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Confirm your new password"
									className="!mt-1"
									{...field}
								/>
							</FormControl>
							<FormMessage className="absolute text-[11px] !mt-1" />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full !mt-10">
					Reset Password
				</Button>
			</form>
		</Form>
	);
};

export default ResetPasswordForm;
