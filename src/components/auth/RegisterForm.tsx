import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "@/schemas/authSchemas";
import { useAuth } from "@/hooks/useAuth";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "../../hooks/use-toast";

const RegisterForm = () => {
	const { register } = useAuth();
	const form = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterFormData) => {
		try {
			await register(data.email, data.password, data.username);
		} catch (err) {
			const description = (err as any).message as string;
			toast({ title: "Register error", description });
			form.setError("root", {
				message: description,
			});
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="">
				{form.formState.errors.root && (
					<div className="text-red-500 text-sm mb-2">
						{form.formState.errors.root.message}
					</div>
				)}
				<FormField
					name="username"
					control={form.control}
					render={({ field }) => (
						<FormItem className="mb-6">
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
					name="email"
					control={form.control}
					render={({ field }) => (
						<FormItem className="mb-6">
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your email"
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
						<FormItem className="mb-6">
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Enter your password"
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
						<FormItem className="mb-6">
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Confirm your password"
									className="!mt-1"
									{...field}
								/>
							</FormControl>
							<FormMessage className="absolute text-[11px] !mt-1" />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full !mt-4">
					Register
				</Button>
			</form>
		</Form>
	);
};

export default RegisterForm;
