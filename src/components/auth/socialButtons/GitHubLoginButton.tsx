import { FaGithub } from "react-icons/fa";
import { Button } from "../../ui/button";

const GitHubLoginButton = () => {
	const handleGitHubLogin = () => {
		// Implement GitHub login logic
	};
	return (
		<Button variant="outline" className="w-full" onClick={handleGitHubLogin}>
			<FaGithub className="mr-2" />
			Login with GitHub
		</Button>
	);
};

export default GitHubLoginButton;
