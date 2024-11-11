// src/react/components/LoginComponent.tsx
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
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const LoginPage: React.FC = () => {
	const { login } = useAuth();
	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginFormData) => {
		try {
			await login(data.username, data.password);
		} catch (err) {
			console.log(err);
			form.setError("root", {
				message: "Nie udało się zalogować. Sprawdź swoje dane.",
			});
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				{form.formState.errors.root && (
					<div className="text-red-500">
						{form.formState.errors.root.message}
					</div>
				)}
				<FormField
					name="username"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nazwa użytkownika</FormLabel>
							<FormControl>
								<Input placeholder="Wprowadź nazwę użytkownika" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="password"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Hasło</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Wprowadź hasło"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full">
					Zaloguj się
				</Button>
			</form>
		</Form>
	);
};

export default LoginPage;
