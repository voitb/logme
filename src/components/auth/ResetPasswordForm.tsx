// src/react/components/ResetPasswordForm.tsx
import React, { useEffect, useState } from "react";
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
import { useAuth } from "@/hooks/useAuth";
import useNavigationHandler from "../../hooks/useNavigationHandler";

const ResetPasswordForm = () => {
	const { sendResetPassword } = useAuth();
	const [userId, setUserId] = useState<string | null>(null);
	const [secret, setSecret] = useState<string | null>(null);
	const [isResetSuccessful, setIsResetSuccessful] = useState<boolean>(false);
	const form = useForm<ResetPasswordFormData>({
		resolver: zodResolver(resetPasswordSchema),
	});
	const navigate = useNavigationHandler();
	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		const userIdParam = searchParams.get("userId");
		const secretParam = searchParams.get("secret");

		if (userIdParam && secretParam) {
			setUserId(userIdParam);
			setSecret(secretParam);
		} else {
			form.setError("root", {
				message: "Invalid or missing reset parameters.",
			});
		}
	}, []);

	useEffect(() => {
		if (isResetSuccessful) {
			const timer = setTimeout(() => {
				navigate("/login");
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [isResetSuccessful, navigate]);

	const onSubmit = async (data: ResetPasswordFormData) => {
		if (!userId || !secret) {
			form.setError("root", {
				message: "Invalid or missing reset parameters.",
			});
			return;
		}

		try {
			await sendResetPassword(userId, secret, data.password);
			form.reset();
			setIsResetSuccessful(true);
			form.setError("root", {
				message:
					"Your password has been reset successfully. You will be redirected to the login page.",
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
				{!isResetSuccessful && (
					<>
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
					</>
				)}
				{/* Back to Login link */}
				<div className="flex justify-center mt-4">
					<span className="text-sm text-gray-500">
						Remembered your password?{" "}
						<a href="/login" className="text-blue-500 hover:underline">
							Back to Login
						</a>
					</span>
				</div>
			</form>
		</Form>
	);
};

export default ResetPasswordForm;
