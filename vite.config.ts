import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	build: {
		lib: {
			entry: "src/index.ts",
			name: "Logme",
			formats: ["es", "cjs"],
			fileName: (format) => `log-me.${format}.js`,
		},
		rollupOptions: {
			external: ["react", "react-dom", "axios"],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
				},
			},
		},
	},
});
