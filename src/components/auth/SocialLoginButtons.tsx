import { LoginButtonSocialType } from "@/types/social.types";
import SocialLoginButton from "./SocialLoginButton";
import { OAuthProvider } from "appwrite";

interface SocialLoginButtonsProps {
	socials?: LoginButtonSocialType[];
	type?: "login" | "register";
}

const SocialLoginButtons = ({
	socials,
	type = "login",
}: SocialLoginButtonsProps) => {
	return (
		<div className="space-y-2">
			{(!socials || socials.includes("google")) && (
				<SocialLoginButton social={OAuthProvider.Google} type={type} />
			)}
			{(!socials || socials.includes("github")) && (
				<SocialLoginButton social={OAuthProvider.Github} type={type} />
			)}
		</div>
	);
};

export default SocialLoginButtons;
