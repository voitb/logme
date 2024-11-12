import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { LoginButtonSocialType } from "@/types/social.types";

interface SocialLoginButtonsProps {
	socials?: LoginButtonSocialType[];
}

const SocialLoginButtons = ({ socials }: SocialLoginButtonsProps) => {
	const handleGoogleLogin = () => {
		// Implement Google login logic
	};

	const handleGitHubLogin = () => {
		// Implement GitHub login logic
	};

	return (
		<div className="space-y-2">
			<Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
				<FcGoogle className="mr-2" />
				Login with Google
			</Button>
			<Button variant="outline" className="w-full" onClick={handleGitHubLogin}>
				<FaGithub className="mr-2" />
				Login with GitHub
			</Button>
		</div>
	);
};

export default SocialLoginButtons;
