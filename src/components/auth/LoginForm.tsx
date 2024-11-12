// src/react/components/LoginForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/schemas/authSchemas";
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

const LoginForm = () => {
	const { login } = useAuth();
	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginFormData) => {
		try {
			await login(data.username, data.password);
		} catch (err) {
			console.error(err);
			form.setError("root", {
				message: "Failed to log in. Please check your credentials.",
			});
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
				{form.formState.errors.root && (
					<div className="text-red-500 text-sm">
						{form.formState.errors.root.message}
					</div>
				)}
				<FormField
					name="username"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your username"
									className="!mt-1"
									{...field}
								/>
							</FormControl>
							<FormMessage className="absolute text-[11px] !mt-1" />
						</FormItem>
					)}
				/>
				<FormField
					name="password"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Enter your password"
									className="!mt-1"
									{...field}
								/>
							</FormControl>
							<FormMessage className="absolute text-[11px] !mt-1">
								{form.formState.errors.username?.message}
							</FormMessage>
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full !mt-10">
					Log in
				</Button>
			</form>
		</Form>
	);
};

export default LoginForm;
