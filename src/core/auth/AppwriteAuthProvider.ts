import { ID } from "appwrite";
import { account } from "../../lib/appwrite";
import {
	User,
	AuthListener,
	AuthProvider,
	ProfileDetails,
	RegisterDetails,
} from "../../types/auth.types";
import Cookies from "js-cookie";

class AppwriteAuthProvider implements AuthProvider {
	private user: User | null = null;
	private isLoggedIn: boolean = false;
	private listeners: AuthListener[] = [];

	constructor() {
		this.loadUserFromCookies();
		this.checkCurrentSession();
	}

	private async checkCurrentSession() {
		try {
			const currentUser = await account.get();
			this.setUserFromAccount(currentUser);
		} catch {
			this.user = null;
			this.isLoggedIn = false;
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

	private setUserFromAccount(currentUser: any) {
		this.user = {
			id: currentUser.$id,
			email: currentUser.email,
			username: currentUser.name,
			emailVerified: currentUser.emailVerification,
		};
		this.isLoggedIn = true;
		Cookies.set("auth_user", JSON.stringify(this.user), { expires: 7 });
		this.notifyListeners();
	}

	async login(email: string, password: string): Promise<void> {
		await account.createSession(email, password);
		const currentUser = await account.get();
		this.setUserFromAccount(currentUser);
	}

	async register(userDetails: RegisterDetails): Promise<void> {
		const { email, password, username } = userDetails;
		await account.create(ID.unique(), email, password, username);
		await this.sendEmailVerification();
	}

	async logout(): Promise<void> {
		await account.deleteSession("current");
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
		this.listeners.forEach((listener) => listener(this.isLoggedIn, this.user));
	}

	async resetPassword(email: string): Promise<void> {
		const redirectUrl = "https://your-app.com/reset-password";
		await account.createRecovery(email, redirectUrl);
	}

	async updateProfile(profileDetails: ProfileDetails): Promise<void> {
		if (profileDetails.email) {
			await account.updateEmail(
				profileDetails.email,
				profileDetails.password as string
			);
		}
		if (profileDetails.password) {
			await account.updatePassword(profileDetails.password);
		}
		if (profileDetails.username) {
			await account.updateName(profileDetails.username);
		}
		const currentUser = await account.get();
		this.setUserFromAccount(currentUser);
	}

	async sendEmailVerification(): Promise<void> {
		const redirectUrl = "https://your-app.com/verify-email";
		await account.createVerification(redirectUrl);
	}

	async isEmailVerified(): Promise<boolean> {
		const currentUser = await account.get();
		return currentUser.emailVerification;
	}
}

export default AppwriteAuthProvider;
