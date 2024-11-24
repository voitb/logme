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
import { account, ID } from "../../lib/appwrite";

const RegisterForm = () => {
	const { register: registerUser } = useAuth();
	const form = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});

	async function register(email: string, password: string) {
		await account.create(ID.unique(), email, password);
	}

	const onSubmit = async (data: RegisterFormData) => {
		try {
			await register(data.username, data.password);
		} catch (err) {
			console.log(err);
			form.setError("root", {
				message: "Failed to register. Please try again.",
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
									placeholder="Confirm your password"
									className="!mt-1"
									{...field}
								/>
							</FormControl>
							<FormMessage className="absolute text-[11px] !mt-1" />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full !mt-10">
					Register
				</Button>
			</form>
		</Form>
	);
};

export default RegisterForm;
