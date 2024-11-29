import { supabase } from "../../lib/supabase";
import {
	User,
	AuthListener,
	AuthProvider,
	RegisterDetails,
	ProfileDetails,
} from "../../types/auth.types";
import Cookies from "js-cookie";

class SupabaseAuthProvider implements AuthProvider {
	private user: User | null = null;
	private isLoggedIn: boolean = false;
	private listeners: AuthListener[] = [];

	constructor() {
		this.loadUserFromCookies();
		this.initializeUser();

		supabase.auth.onAuthStateChange((event, session) => {
			if (event === "SIGNED_IN" && session) {
				this.setUserFromSession(session);
			} else if (event === "SIGNED_OUT") {
				this.user = null;
				this.isLoggedIn = false;
				Cookies.remove("auth_user");
				this.notifyListeners();
			}
		});
	}

	private async initializeUser() {
		const { data, error } = await supabase.auth.getSession();
		if (error) return;
		const { session } = data;
		if (session) {
			this.setUserFromSession(session);
		}
	}

	private loadUserFromCookies() {
		const userCookie = Cookies.get("auth_user");
		if (userCookie) {
			this.user = JSON.parse(userCookie);
			this.isLoggedIn = true;
		} else {
			this.user = null;
			this.isLoggedIn = false;
		}
	}

	private setUserFromSession(session: any) {
		const { user } = session;
		this.user = {
			id: user.id,
			email: user.email,
			username: user.user_metadata?.username,
		};
		this.isLoggedIn = true;
		Cookies.set("auth_user", JSON.stringify(this.user), { expires: 7 });
		this.notifyListeners();
	}

	async login(email: string, password: string): Promise<void> {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error || !data.session) throw error || new Error("Login failed");
		this.setUserFromSession(data.session);
	}

	async register(userDetails: RegisterDetails): Promise<void> {
		const { email, password, username } = userDetails;
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: { username },
			},
		});
		if (error || !data.user) throw error || new Error("Registration failed");
	}

	async logout(): Promise<void> {
		const { error } = await supabase.auth.signOut();
		if (error) throw error;
		this.user = null;
		this.isLoggedIn = false;
		Cookies.remove("auth_user");
		this.notifyListeners();
	}

	getUser(): User | null {
		return this.user;
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

	private notifyListeners(): void {
		this.listeners.forEach((listener) =>
			listener(this.isLoggedIn, this.user, this.isInitialized)
		);
	}

	async resetPassword(email: string): Promise<void> {
		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: "https://your-app.com/reset-password",
		});
		if (error) throw error;
	}

	async updateProfile(profileDetails: ProfileDetails): Promise<void> {
		const updates: any = {};

		if (profileDetails.email) {
			updates.email = profileDetails.email;
		}
		if (profileDetails.password) {
			updates.password = profileDetails.password;
		}
		if (profileDetails.username) {
			updates.data = { username: profileDetails.username };
		}

		const { data, error } = await supabase.auth.updateUser(updates);
		if (error || !data.user) throw error || new Error("Profile update failed");

		this.user = {
			id: data.user.id,
			email: data.user.email as string,
			username: data.user.user_metadata?.username,
		};
		Cookies.set("auth_user", JSON.stringify(this.user), { expires: 7 });
		this.notifyListeners();
	}

	async sendEmailVerification(): Promise<void> {
		// Supabase does not provide a direct method to resend verification emails
	}

	async getIsEmailVerified(): Promise<boolean> {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw error || new Error("Failed to fetch user");
		return data.user.email_confirmed_at !== null;
	}
}

export default SupabaseAuthProvider;
