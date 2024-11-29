import { FaGithub } from "react-icons/fa";
import { Button } from "../../ui/button";
import { OAuthProvider } from "appwrite";
import { loginWithOAuth } from "../../../lib/appwrite";

const GitHubLoginButton = () => {
	const handleGitHubLogin = () => {
		loginWithOAuth(OAuthProvider.Github);
	};
	return (
		<Button variant="outline" className="w-full" onClick={handleGitHubLogin}>
			<FaGithub className="mr-2" />
			Login with GitHub
		</Button>
	);
};

export default GitHubLoginButton;
