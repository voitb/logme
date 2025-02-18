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
import ButtonLoader from "../utils/ButtonLoader";
import { cn } from "../../lib/utils";

const LoginForm = () => {
	const { login, loading, setLoading } = useAuth();
	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: LoginFormData) => {
		try {
			setLoading("manual");
			await login(data.email, data.password);
		} catch (err) {
			setLoading(null);
			console.error(err.message);
			form.setError("root", {
				message:
					err.message || "Failed to log in. Please check your credentials.",
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
					name="email"
					disabled={!!loading}
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
					disabled={!!loading}
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
							<div className="flex justify-end">
								<a
									href="/forgot-password"
									className={cn("text-sm text-blue-500 hover:underline", {
										"pointer-events-none opacity-50": !!loading,
									})}
								>
									Forgot Password?
								</a>
							</div>
						</FormItem>
					)}
				/>

				<Button disabled={!!loading} type="submit" className="w-full !mt-10">
					<ButtonLoader loading={loading === "manual"}>Log in</ButtonLoader>
				</Button>
			</form>
		</Form>
	);
};

export default LoginForm;
