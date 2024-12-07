import { z } from "zod";
import { UserProfileCardUpdates } from "../components/auth/UserProfileCard";

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

const checkIsUpdatePossible = <U extends Record<string, boolean>>(
	updateAllowance: U
) => {
	return function <T extends z.ZodTypeAny, K extends keyof U>(
		schema: T,
		key: K
	): z.ZodTypeAny {
		return updateAllowance[key] ? schema : schema.optional();
	};
};

export const getUserProfileSchema = (
	updateAllowance: UserProfileCardUpdates,
	updatedEmail: boolean
) => {
	const check = checkIsUpdatePossible<UserProfileCardUpdates>(updateAllowance);

	return z
		.object({
			username: check(z.string().min(1, "Username is required."), "username"),
			email: check(z.string().email("Invalid email address."), "email"),
			currentPassword: check(z.string().optional(), "email"),
			newPassword: check(
				z
					.string()
					.transform((val) => (val === "" ? undefined : val))
					.optional()
					.refine((val) => val === undefined || val.length >= 8, {
						message: "Password must be at least 8 characters long.",
					}),
				"password"
			),
			confirmNewPassword: check(z.string().optional(), "password"),
			avatar: check(z.instanceof(File).optional(), "avatar"),
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
				if (updateAllowance.email && updatedEmail) {
					return !!data.currentPassword;
				}
				return true;
			},
			{
				message: "Current password is required to set a new password.",
				path: ["currentPassword"],
			}
		);
};

export type UserProfileFormData = z.infer<
	ReturnType<typeof getUserProfileSchema>
>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
