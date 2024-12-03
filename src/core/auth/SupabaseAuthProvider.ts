// SupabaseAuthProvider.ts
import { supabase } from "../../lib/supabase";
import {
	User,
	AuthListener,
	AuthProvider,
	ProfileDetails,
	RegisterDetails,
} from "../../types/auth.types";
import Cookies from "js-cookie";

class SupabaseAuthProvider implements AuthProvider {
	private user: User | null = null;
	private isLoggedIn: boolean = false;
	private isInitialized: boolean = false;
	private listeners: AuthListener[] = [];
	private isLoadingUser: boolean = false;

	constructor() {}

	public async initialize() {
		const sessionCookie = Cookies.get("auth_session");
		if (this.isLoadingUser) return;

		this.isLoadingUser = true;

		if (sessionCookie) {
			try {
				const {
					data: { session },
					error,
				} = await supabase.auth.getSession();
				if (error || !session || !session.user) {
					throw error || new Error("No active session");
				}
				await this.setUserFromSession(session);
			} catch (error) {
				console.error("Failed to fetch user from Supabase:", error);
				this.clearAuthState();
			} finally {
				this.isLoadingUser = false;
				this.isInitialized = true;
				this.notifyListeners();
			}
		} else {
			// No session cookie exists
			this.isLoadingUser = false;
			this.isInitialized = true;
			this.notifyListeners();
		}
	}

	private clearAuthState() {
		this.user = null;
		this.isLoggedIn = false;
		Cookies.remove("auth_session");
		this.notifyListeners();
	}

	private convertUser = (user: any): User => {
		return {
			id: user.id,
			email: user.email,
			username: user.user_metadata?.username || "",
			emailVerification: user.email_confirmed_at ? true : false,
		};
	};

	private async setUserFromSession(session: any) {
		this.user = this.convertUser(session.user);
		this.isLoggedIn = true;
		this.setCookie();
		this.notifyListeners();
	}

	public async fetchLoggedUser() {
		try {
			const {
				data: { session },
				error,
			} = await supabase.auth.getSession();
			if (error || !session || !session.user) {
				throw error || new Error("No active session");
			}
			await this.setUserFromSession(session);
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
			data: { user, session },
			error,
		} = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					username: username || "",
				},
			},
		});
		if (error || !user) {
			throw error || new Error("Registration failed");
		}
		// Supabase may or may not create a session upon sign-up depending on your settings
		if (session) {
			await this.setUserFromSession(session);
		}
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

	async sendResetPassword(): // accessToken: string,
	// secret: string,
	// newPassword: string
	Promise<void> {
		// Supabase handles password reset via email
		// const { error } = await supabase.auth.updateUser(
		//   { password: newPassword },
		//   { accessToken }
		// );
		// if (error) {
		//   throw error;
		// }
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

	async resetPassword(email: string): Promise<void> {
		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${window.location.origin}/reset-password`,
		});
		if (error) {
			throw error;
		}
	}

	async forgotPassword(email: string): Promise<void> {
		await this.resetPassword(email);
	}

	async updateProfile(profileDetails: ProfileDetails): Promise<void> {
		const { error } = await supabase.auth.updateUser({
			email: profileDetails.email,
			password: profileDetails.password,
			data: {
				username: profileDetails.username,
				...profileDetails,
			},
		});
		if (error) {
			throw error;
		}
		await this.fetchLoggedUser();
	}

	async sendEmailVerification(): Promise<void> {
		// Supabase sends email verification automatically on sign up
		// To resend, use supabase.auth.resend()
		const { error } = await supabase.auth.resend({
			type: "signup",
			email: this.user?.email as string,
		});
		if (error) {
			throw error;
		}
	}

	async sendConfirmVerification(): // userId: string,
	// secret: string
	Promise<void> {
		// Supabase handles email verification via magic link
		// Typically, this is handled automatically
		// Implement any additional logic if necessary
	}

	async getIsEmailVerified(): Promise<boolean> {
		await this.fetchLoggedUser();
		return this.user?.emailVerification || false;
	}

	setCookie(): void {
		Cookies.set("auth_session", "active", { expires: 7 });
	}
}

export default SupabaseAuthProvider;
