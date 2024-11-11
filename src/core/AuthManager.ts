import axios from "axios";
import { User, AuthListener } from "./types";

class AuthManager {
	private static instance: AuthManager;
	private user: User | null = null;
	private isLoggedIn: boolean = false;
	private listeners: AuthListener[] = [];
	private apiEndpoint: string;

	private constructor(apiEndpoint: string) {
		this.apiEndpoint = apiEndpoint;
		console.log(`AuthManager initialized with endpoint: ${apiEndpoint}`);
	}

	public static getInstance(apiEndpoint?: string): AuthManager {
		if (!AuthManager.instance) {
			if (!apiEndpoint) {
				throw new Error(
					"AuthManager nie został zainicjalizowany. Przekaż apiEndpoint przy pierwszym wywołaniu."
				);
			}
			AuthManager.instance = new AuthManager(apiEndpoint);
			console.log("AuthManager instance created.");
		}
		return AuthManager.instance;
	}

	public async login(username: string, password: string): Promise<void> {
		console.log(`Attempting to log in with username: ${username}`);
		try {
			const response = await axios.post(`${this.apiEndpoint}/login`, {
				username,
				password,
			});
			this.user = response.data.user;
			this.isLoggedIn = true;
			this.notifyListeners();
			console.log(`Login successful for user: ${username}`);
		} catch (error) {
			console.error(`Login failed for user: ${username}`, error);
			throw error;
		}
	}

	public logout(): void {
		console.log(`Logging out user: ${this.user}`);
		this.user = null;
		this.isLoggedIn = false;
		this.notifyListeners();
		console.log("Logout successful.");
	}

	public getUser(): User | null {
		console.log(`Getting user: ${this.user}`);
		return this.user;
	}

	public isUserLoggedIn(): boolean {
		console.log(`Is user logged in: ${this.isLoggedIn}`);
		return this.isLoggedIn;
	}

	public subscribe(listener: AuthListener): void {
		this.listeners.push(listener);
		console.log("Listener subscribed.");
	}

	public unsubscribe(listener: AuthListener): void {
		this.listeners = this.listeners.filter((l) => l !== listener);
		console.log("Listener unsubscribed.");
	}

	private notifyListeners(): void {
		console.log("Notifying listeners.");
		this.listeners.forEach((listener) => listener(this.isLoggedIn, this.user));
	}
}

export default AuthManager;
