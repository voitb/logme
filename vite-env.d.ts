/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly APPWRITE_PROJECT_ID: string;
	readonly APPWRITE_STORAGE_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
