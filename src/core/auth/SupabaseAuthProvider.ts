// SupabaseAuthProvider.ts
import { supabase } from "../../lib/supabase";
import {
	User,
	AuthListener,
	AuthProvider,
	ProfileDetails,
	RegisterDetails,
} from "../../types/auth.types";

class SupabaseAuthProvider implements AuthProvider {
	private user: User | null = null;
	private isLoggedIn: boolean = false;
	private isInitialized: boolean = false;
	private listeners: AuthListener[] = [];
	private isLoadingUser: boolean = false;

	constructor() {}

	public async initialize() {
		if (this.isLoadingUser) return;

		this.isLoadingUser = true;
		try {
			const {
				data: { session },
				error,
			} = await supabase.auth.getSession();
			if (error || !session || !session.user) {
				this.clearAuthState();
			} else {
				await this.setUserFromSession(session);
			}
		} catch (error) {
			console.error("Failed to fetch user from Supabase:", error);
			this.clearAuthState();
		} finally {
			this.isLoadingUser = false;
			this.isInitialized = true;
			this.notifyListeners();
		}
	}

	private clearAuthState() {
		this.user = null;
		this.isLoggedIn = false;
		this.notifyListeners();
	}

	private convertUser = (user: any): User => {
		return {
			id: user.id,
			email: user.email,
			username: user.user_metadata?.username || "",
			emailVerification: user.email_confirmed_at ? true : false,
			avatar: user.user_metadata?.avatar_url || null,
		};
	};

	private async setUserFromSession(session: any) {
		this.user = this.convertUser(session.user);
		this.isLoggedIn = true;
		this.notifyListeners();
	}

	public async fetchLoggedUser() {
		try {
			const data = await supabase.auth.getSession();
			console.log(data);
			// if (error || !session || !session.user) {
			// 	throw error || new Error("No active session");
			// }
			// await this.setUserFromSession(session);
			// return session.user;
		} catch (error) {
			console.error("Failed to fetch user from Supabase:", error);
			this.clearAuthState();
		}
	}

	async login(email: string, password: string): Promise<void> {
		const {
			data: { session },
			error,
		} = await supabase.auth.signInWithPassword({ email, password });
		if (error || !session || !session.user) {
			throw error || new Error("Login failed");
		}
		await this.setUserFromSession(session);
	}

	async register(userDetails: RegisterDetails): Promise<void> {
		const { email, password, username } = userDetails;

		const {
			data: { user },
			error: signUpError,
		} = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					username: username || "",
				},
				emailRedirectTo: `${window.location.origin}/verification-complete`,
			},
		});

		if (signUpError || !user) {
			throw signUpError || new Error("Registration failed");
		}

		this.user = {
			id: user.id,
			email: user.email!,
			username: user.user_metadata?.username || "",
			emailVerification: false,
		};

		this.notifyListeners();
		this.fetchLoggedUser();
		// await this.sendEmailVerification();
	}

	async logout(): Promise<void> {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error("Logout failed:", error);
		}
		this.clearAuthState();
	}

	async setSession(accessToken: string, refreshToken: string): Promise<void> {
		this.isLoadingUser = true;
		try {
			const {
				data: { session },
				error,
			} = await supabase.auth.setSession({
				access_token: accessToken,
				refresh_token: refreshToken,
			});
			if (error || !session || !session.user) {
				throw error || new Error("Failed to set session");
			}
			await this.setUserFromSession(session);
		} catch (error) {
			console.error("Failed to set session:", error);
			this.clearAuthState();
		} finally {
			this.isLoadingUser = false;
			this.notifyListeners();
		}
	}

	async updatePrefs(prefs: { [key: string]: any }): Promise<void> {
		const {
			data: { user },
			error,
		} = await supabase.auth.updateUser({
			data: {
				...this.user?.prefs,
				...prefs,
			},
		});

		if (error) {
			throw error;
		}

		await this.fetchLoggedUser();
	}

	async updateAvatar(file: File): Promise<void> {
		try {
			const fileExt = file.name.split(".").pop();
			const fileName = `${this.user?.id}-avatar.${fileExt}`;
			const filePath = `avatars/${fileName}`;

			// Upload the file to Supabase Storage
			const { error: uploadError } = await supabase.storage
				.from("avatars")
				.upload(filePath, file, { upsert: true });

			if (uploadError) {
				throw uploadError;
			}

			// Get the public URL
			const {
				data: { publicUrl },
			} = supabase.storage.from("avatars").getPublicUrl(filePath);

			// Update user metadata with avatar URL
			const { error: updateError } = await supabase.auth.updateUser({
				data: {
					avatar_url: publicUrl,
				},
			});

			if (updateError) {
				throw updateError;
			}

			await this.fetchLoggedUser();
		} catch (error) {
			console.error("Failed to update avatar:", error);
			throw error;
		}
	}

	async sendResetPassword(
		userId: string,
		secret: string,
		newPassword: string
	): Promise<void> {
		// Supabase handles password reset via email
		const { error } = await supabase.auth.updateUser({
			password: newPassword,
		});
		if (error) {
			throw error;
		}
	}

	getUser(): User | null {
		return this.user;
	}

	public getIsLoading(): boolean {
		return this.isLoadingUser;
	}

	getInitialized(): boolean {
		return this.isInitialized;
	}

	isUserLoggedIn(): boolean {
		return this.isLoggedIn;
	}

	subscribe(listener: AuthListener): void {
		this.listeners.push(listener);
	}

	unsubscribe(listener: AuthListener): void {
		this.listeners = this.listeners.filter((l) => l !== listener);
	}

	private notifyListeners() {
		this.listeners.forEach((listener) =>
			listener(this.isLoggedIn, this.user, this.isInitialized)
		);
	}

	async forgotPassword(email: string): Promise<void> {
		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${window.location.origin}/reset-password`,
		});
		if (error) {
			throw error;
		}
	}

	async updateProfile(profileDetails: ProfileDetails): Promise<void> {
		const updates: any = {};
		const metadata: any = {};

		if (profileDetails.email) {
			updates.email = profileDetails.email;
		}
		if (profileDetails.username) {
			metadata.username = profileDetails.username;
		}
		if (profileDetails.password) {
			updates.password = profileDetails.password;
		}
		if (Object.keys(metadata).length > 0) {
			updates.data = metadata;
		}

		const { error } = await supabase.auth.updateUser(updates);
		if (error) {
			throw error;
		}

		if (profileDetails.avatar) {
			await this.updateAvatar(profileDetails.avatar);
		}

		if (profileDetails.prefs) {
			await this.updatePrefs(profileDetails.prefs);
		}

		await this.fetchLoggedUser();
	}

	async sendEmailVerification(): Promise<void> {
		const { error } = await supabase.auth.resend({
			type: "signup",
			email: this.user?.email as string,
		});
		if (error) {
			throw error;
		}
	}

	async sendConfirmVerification(userId: string, secret: string): Promise<void> {
		// Supabase handles email verification via magic link
		// Typically, this is handled automatically
		// Implement any additional logic if necessary
	}

	async getIsEmailVerified(): Promise<boolean> {
		await this.fetchLoggedUser();
		return this.user?.emailVerification || false;
	}

	// Remove setCookie method
}

export default SupabaseAuthProvider;
