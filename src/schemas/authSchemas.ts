import { z } from "zod";

export const loginSchema = z.object({
	username: z
		.string({ required_error: "Username is required" })
		.min(1, "Username is required"),
	password: z
		.string({ required_error: "Password is required" })
		.min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = loginSchema
	.extend({
		confirmPassword: z
			.string({ required_error: "Confirm Password is required" })
			.min(1, "Confirm Password is required"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type RegisterFormData = z.infer<typeof registerSchema>;
