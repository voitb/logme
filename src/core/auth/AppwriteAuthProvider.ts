// AppwriteAuthProvider.ts
import { ID } from "appwrite";
import { account } from "../../lib/appwrite";
import {
	User,
	AuthListener,
	AuthProvider,
	ProfileDetails,
	RegisterDetails,
	AppwriteRawUser,
} from "../../types/auth.types";
import Cookies from "js-cookie";

class AppwriteAuthProvider implements AuthProvider {
	private user: User | null = null;
	private isLoggedIn: boolean = false;
	private isInitialized: boolean = false;
	private listeners: AuthListener[] = [];
	private isLoadingUser: boolean = false;

	public async initialize() {
		if (this.isLoadingUser) return;

		this.isLoadingUser = true;
		try {
			const currentUser = await account.get();
			await this.setUserFromAccount(currentUser);
		} catch (error) {
			console.error("Failed to fetch user from Appwrite:", error);
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

	private convertUser = (user: AppwriteRawUser): User => {
		return {
			id: user.$id,
			email: user.email,
			username: user.name,
			emailVerification: user.emailVerification,
		};
	};

	private async setUserFromAccount(user: AppwriteRawUser) {
		this.user = this.convertUser(user);
		this.isLoggedIn = true;
		this.notifyListeners();
	}

	public async fetchLoggedUser() {
		try {
			const currentUser = await account.get();
			await this.setUserFromAccount(currentUser);
		} catch (error) {
			console.error("Failed to fetch user from Appwrite:", error);
			this.clearAuthState();
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
		this.isLoadingUser = true;
		try {
			await account.createSession(userId, secret);
			await this.fetchLoggedUser();
		} catch (error) {
			console.error("Failed to set session:", error);
			this.clearAuthState();
		} finally {
			this.isLoadingUser = false;
			this.notifyListeners();
		}
	}

	async sendResetPassword(
		userId: string,
		secret: string,
		newPassword: string
	): Promise<void> {
		await account.updateRecovery(userId, secret, newPassword);
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
		await account.createRecovery(
			email,
			`${window.location.origin}/reset-password`
		);
	}

	async updateProfile(profileDetails: ProfileDetails): Promise<void> {
		await account.updateName(profileDetails.username as string);
		await this.fetchLoggedUser();
	}

	async sendEmailVerification(): Promise<void> {
		const { origin } = window.location;
		await account.createVerification(`${origin}/verification-complete`);
	}

	async sendConfirmVerification(userId: string, secret: string): Promise<void> {
		await account.updateVerification(userId, secret);
		await this.fetchLoggedUser();
	}

	async getIsEmailVerified(): Promise<boolean> {
		return this.user?.emailVerification || false;
	}

	setCookie(): void {
		Cookies.set("auth_session", "active", { expires: 7 });
	}
}

export default AppwriteAuthProvider;
