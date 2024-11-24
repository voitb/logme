import { AuthProvider } from "../types";
import AppwriteAuthProvider from "./auth/AppwriteAuthProvider";
import SupabaseAuthProvider from "./auth/SupabaseAuthProvider";

export class AuthProviderFactory {
	public static createAuthProvider(providerType: string): AuthProvider {
		switch (providerType) {
			case "appwrite":
				return new AppwriteAuthProvider();
			case "supabase":
				return new SupabaseAuthProvider();
			default:
				throw new Error(`Unknown AuthProvider type: ${providerType}`);
		}
	}
}
