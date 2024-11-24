import {
	User,
	AuthListener,
	AuthProvider,
	RegisterDetails,
	ProfileDetails,
} from "../../types/auth.types";

class AuthManager {
	private authProvider: AuthProvider;

	constructor(authProvider: AuthProvider) {
		this.authProvider = authProvider;
	}

	public async login(email: string, password: string): Promise<void> {
		return this.authProvider.login(email, password);
	}

	public async register(userDetails: RegisterDetails): Promise<void> {
		return this.authProvider.register(userDetails);
	}

	public async logout(): Promise<void> {
		return this.authProvider.logout();
	}

	public getUser(): User | null {
		return this.authProvider.getUser();
	}

	public isUserLoggedIn(): boolean {
		return this.authProvider.isUserLoggedIn();
	}

	public subscribe(listener: AuthListener): void {
		this.authProvider.subscribe(listener);
	}

	public unsubscribe(listener: AuthListener): void {
		this.authProvider.unsubscribe(listener);
	}

	public async resetPassword(email: string): Promise<void> {
		return this.authProvider.resetPassword(email);
	}

	public async updateProfile(profileDetails: ProfileDetails): Promise<void> {
		return this.authProvider.updateProfile(profileDetails);
	}

	public async sendEmailVerification(): Promise<void> {
		return this.authProvider.sendEmailVerification();
	}

	public async isEmailVerified(): Promise<boolean> {
		return this.authProvider.isEmailVerified();
	}
}

export default AuthManager;
