import { ID } from "appwrite";
import { account } from "../../lib/appwrite";
import {
	User,
	AuthListener,
	AuthProvider,
	ProfileDetails,
	RegisterDetails,
	RawUser,
} from "../../types/auth.types";
import Cookies from "js-cookie";

class AppwriteAuthProvider implements AuthProvider {
	private user: User | null = null;
	private isLoggedIn: boolean = false;
	private isInitialized: boolean = false;
	private listeners: AuthListener[] = [];
	private isLoadingUser: boolean = false;

	constructor() {
		this.loadUserFromCookies();
	}

	private async loadUserFromCookies() {
		if (this.isLoadingUser) return;

		this.isLoadingUser = true;

		const userCookie = Cookies.get("auth_user");
		if (userCookie) {
			const parsedCookie = JSON.parse(userCookie);
			const expiresAt = new Date(parsedCookie.expiresAt);

			if (expiresAt > new Date()) {
				try {
					await this.fetchLoggedUser(null);
				} catch (error) {
					console.error("Failed to fetch user from Appwrite:", error);
					this.clearAuthState();
				}
			} else {
				await this.logout();
				console.log("User cookie has expired");
				await this.clearAuthState();
			}
		} else {
			console.log("No user cookie found");
			await this.clearAuthState();
		}

		this.isLoadingUser = false;
	}

	private clearAuthState() {
		this.user = null;
		this.isLoggedIn = false;
		this.isInitialized = true;
		Cookies.remove("auth_user");
		// this.notifyListeners();
	}

	private convertUser = (user: RawUser): User => {
		return {
			id: user.$id,
			email: user.email,
			username: user.name,
			emailVerification: user.emailVerification,
		};
	};

	private async setUserFromAccount(currentUser: RawUser) {
		this.user = this.convertUser(currentUser);
		this.isLoggedIn = true;
		this.isInitialized = true;
		this.notifyListeners();
	}
	public async setCookie(user: RawUser) {
		const expires = new Date();
		expires.setDate(expires.getDate() + 7);
		const cookieData = { user, expiresAt: expires.toISOString() };
		Cookies.set("auth_user", JSON.stringify(cookieData), { expires: 7 });
	}

	public fetchLoggedUser = async (
		setter: ((user: RawUser) => Promise<void>) | null = this.setCookie
	) => {
		const user = await account.get();
		await setter?.(user);
		await this.setUserFromAccount(user);
	};

	private async updateCookie(updatedUser: Partial<RawUser>) {
		const existingCookie = Cookies.get("auth_user");
		if (existingCookie) {
			const parsedCookie = JSON.parse(existingCookie);
			const newUser = { ...parsedCookie.user, ...updatedUser };
			const expiresAt = parsedCookie.expiresAt;

			Cookies.set("auth_user", JSON.stringify({ user: newUser, expiresAt }), {
				expires: new Date(expiresAt),
			});
		}
	}

	async login(email: string, password: string): Promise<void> {
		await account.createEmailPasswordSession(email, password);
		await this.fetchLoggedUser();
	}

	async register(userDetails: RegisterDetails): Promise<void> {
		const { email, password, username } = userDetails;
		await account.create(ID.unique(), email, password, username);
		await account.createEmailPasswordSession(email, password);
		await this.fetchLoggedUser();
		await this.sendEmailVerification();
	}

	async logout(): Promise<void> {
		await account.deleteSession("current");
		this.clearAuthState();
	}

	async setSession(userId: string, secret: string): Promise<void> {
		const user = await account.createSession(userId, secret);
		console.log(user);
		await this.fetchLoggedUser(this.updateCookie);
		// this.notifyListeners();
	}

	getUser(): User | null {
		return this.user;
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

	async resetPassword(password: string): Promise<void> {}

	async forgotPassword(email: string): Promise<void> {}

	async updateProfile(profileDetails: ProfileDetails): Promise<void> {}

	async sendEmailVerification(): Promise<void> {
		const { origin } = window.location;
		await account.createVerification(`${origin}/verification-complete`);
	}

	async sendConfirmVerification(userId: string, secret: string): Promise<void> {
		await account.updateVerification(userId, secret);
		await this.fetchLoggedUser(this.updateCookie);
	}

	async getIsEmailVerified(): Promise<boolean> {
		return this.user?.emailVerification || false;
	}
}

export default AppwriteAuthProvider;
