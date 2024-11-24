import { Client, Account } from "appwrite";
import { PROJECT_ID, APPWRITE_ENDPOINT } from "../config";
export const client = new Client();

client.setEndpoint(APPWRITE_ENDPOINT).setProject(PROJECT_ID);

export const account = new Account(client);
export { ID } from "appwrite";
