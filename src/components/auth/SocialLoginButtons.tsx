import { LoginButtonSocialType } from "@/types/social.types";
import GoogleLoginButton from "./socialButtons/GoogleLoginButton";
import GitHubLoginButton from "./socialButtons/GitHubLoginButton";

interface SocialLoginButtonsProps {
	socials?: LoginButtonSocialType[];
}

const SocialLoginButtons = ({ socials }: SocialLoginButtonsProps) => {
	return (
		<div className="space-y-2">
			{(!socials || socials.includes("google")) && <GoogleLoginButton />}
			{(!socials || socials.includes("github")) && <GitHubLoginButton />}
		</div>
	);
};

export default SocialLoginButtons;
