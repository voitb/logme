import { Client, Account, OAuthProvider } from "appwrite";
import { PROJECT_ID, APPWRITE_ENDPOINT } from "../config";
export const client = new Client();

client.setEndpoint(APPWRITE_ENDPOINT).setProject(PROJECT_ID);

export const loginWithOAuth = async (provider: OAuthProvider) => {
	const { origin } = window.location;
	await account.createOAuth2Token(
		provider,
		`${origin}/logging`,
		`${origin}/fail`
	);
};

export const account = new Account(client);
export { ID } from "appwrite";
