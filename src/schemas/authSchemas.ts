import { z } from "zod";

export const loginSchema = z.object({
	username: z.optional(z.string()),
	email: z
		.string({ required_error: "Email is required" })
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

export const forgotPasswordSchema = z.object({
	email: z.string().email("Invalid email address."),
});

export const resetPasswordSchema = z
	.object({
		password: z
			.string({ required_error: "Password is required" })
			.min(8, "Password must be at least 8 characters long"),
		confirmPassword: z.string({
			required_error: "Confirm Password is required",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const userProfileSchema = z
	.object({
		username: z.string().min(1, "Username is required."),
		email: z.string().email("Invalid email address."),
		currentPassword: z
			.string()
			.min(8, "Password must be at least 8 characters long.")
			.optional(),
		newPassword: z
			.string()
			.min(8, "Password must be at least 8 characters long.")
			.optional(),
		confirmNewPassword: z.string().optional(),
		avatar: z.instanceof(File).optional(),
		avatarPreview: z.string().optional(),
	})
	.refine(
		(data) => {
			if (data.newPassword || data.confirmNewPassword) {
				return data.newPassword === data.confirmNewPassword;
			}
			return true;
		},
		{
			message: "Passwords do not match.",
			path: ["confirmNewPassword"],
		}
	)
	.refine(
		(data) => {
			if (data.newPassword) {
				return !!data.currentPassword;
			}
			return true;
		},
		{
			message: "Current password is required to set a new password.",
			path: ["currentPassword"],
		}
	);

export type UserProfileFormData = z.infer<typeof userProfileSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
