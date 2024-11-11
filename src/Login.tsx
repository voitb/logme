import React, { useState } from "react";
import AuthManager from "./AuthManager";

const LoginComponent: React.FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			await AuthManager.getInstance().login(username, password);
		} catch (err) {
			console.log(err);
			setError("Nie udało się zalogować.");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="username">Nazwa użytkownika:</label>
				<input
					id="username"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="password">Hasło:</label>
				<input
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			{error && <p>{error}</p>}
			<button type="submit">Zaloguj się</button>
		</form>
	);
};

export default LoginComponent;
