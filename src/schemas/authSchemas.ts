import { z } from "zod";

export const loginSchema = z.object({
	username: z.string().min(1, "Nazwa użytkownika jest wymagana"),
	password: z.string().min(6, "Hasło musi mieć co najmniej 6 znaków"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
