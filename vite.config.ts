import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { config } from "dotenv";

config({ path: ".env.local" });

export default defineConfig({
	plugins: [
		react(),
		cssInjectedByJsPlugin(),
		dts({
			insertTypesEntry: true,
			include: ["src/**/*.ts", "src/**/*.tsx"],
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	define: {
		"process.env.APPWRITE_PROJECT_ID": JSON.stringify(
			process.env.APPWRITE_PROJECT_ID
		),
		"process.env.APPWRITE_ENDPOINT": JSON.stringify(
			process.env.APPWRITE_ENDPOINT
		),
		"process.env.SUPABASE_URL": JSON.stringify(process.env.SUPABASE_URL),
		"process.env.SUPABASE_ANON_KEY": JSON.stringify(
			process.env.SUPABASE_ANON_KEY
		),
	},
});
