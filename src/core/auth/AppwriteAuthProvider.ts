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

	constructor() {
		this.loadUserFromCookies();
	}

	private loadUserFromCookies() {
		const userCookie = Cookies.get("auth_user");
		if (userCookie) {
			this.setUserFromAccount(JSON.parse(userCookie));
		} else {
			this.user = null;
			this.isLoggedIn = false;
			this.isInitialized = true;
			console.log("No user cookie found");
		}
	}

	private convertUser = (user: RawUser) => {
		console.log(user);
		return {
			id: user.$id,
			email: user.email,
			username: user.name,
			emailVerification: user.emailVerification,
		};
	};

	private setUserFromAccount(currentUser: RawUser) {
		this.user = this.convertUser(currentUser);
		this.isLoggedIn = true;
		this.isInitialized = true;
	}

	private setCookie(user: RawUser) {
		Cookies.set("auth_user", JSON.stringify(user), { expires: 7 });
		this.notifyListeners();
	}

	async login(email: string, password: string): Promise<void> {
		await account.createEmailPasswordSession(email, password);
		const currentUser = await account.get();
		this.setUserFromAccount(currentUser);
		this.setCookie(currentUser);
	}

	async register(userDetails: RegisterDetails): Promise<void> {
		const { email, password, username } = userDetails;
		await account.create(ID.unique(), email, password, username);
		const currentUser = await account.get();
		this.setUserFromAccount(currentUser);
		this.setCookie(currentUser);
	}

	async logout(): Promise<void> {
		await account.deleteSession("current");
		this.user = null;
		this.isLoggedIn = false;
		this.isInitialized = true;
		Cookies.remove("auth_user");
		this.notifyListeners();
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

	private notifyListeners(): void {
		this.listeners.forEach((listener) =>
			listener(this.isLoggedIn, this.user, this.isInitialized)
		);
	}

	async resetPassword(password: string): Promise<void> {}

	async forgotPassword(email: string): Promise<void> {}

	async updateProfile(profileDetails: ProfileDetails): Promise<void> {}

	async sendEmailVerification(): Promise<void> {
		await account.createVerification(
			window.location.origin + "/verification-complete"
		);
	}
	async sendConfirmVerification(userId: string, secret: string): Promise<void> {
		await account.updateVerification(userId, secret);
		window.location.href = "/";
	}

	async isEmailVerified(): Promise<boolean> {
		// const currentUser = await account.get();
		// return currentUser.emailVerification;
		return false;
	}
}

export default AppwriteAuthProvider;
