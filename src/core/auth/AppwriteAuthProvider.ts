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
		}
	}

	private convertUser = (user: RawUser) => {
		return {
			id: user.$id,
			email: user.email,
			username: user.name,
		};
	};

	private setUserFromAccount(currentUser: RawUser) {
		this.user = this.convertUser(currentUser);
		this.isLoggedIn = true;
	}

	private setCookie(user: RawUser) {
		this.convertUser(user);
		Cookies.set("auth_user", JSON.stringify(this.user), { expires: 7 });
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

	async resetPassword(email: string): Promise<void> {}

	async updateProfile(profileDetails: ProfileDetails): Promise<void> {}

	async sendEmailVerification(): Promise<void> {}

	async isEmailVerified(): Promise<boolean> {
		// const currentUser = await account.get();
		// return currentUser.emailVerification;
		return false;
	}
}

export default AppwriteAuthProvider;
