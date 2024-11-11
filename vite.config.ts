import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
	plugins: [
		react(),
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
	build: {
		lib: {
			entry: "src/index.ts",
			name: "LogMe",
			formats: ["es", "cjs"],
			fileName: (format) => `log-me.${format}.js`,
		},
		rollupOptions: {
			external: ["react", "react-dom", "axios"],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
					axios: "axios",
				},
			},
		},
	},
});
