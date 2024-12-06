import { OAuthProvider } from "appwrite";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface SocialIconHandlerProps {
	social: OAuthProvider;
	className?: string;
}

const SocialIconHandler = ({ social, className }: SocialIconHandlerProps) => {
	if (social === OAuthProvider.Github) {
		return <FaGithub className={className} />;
	}
	if (social === OAuthProvider.Google) {
		return <FcGoogle className={className} />;
	}
	return null;
};

export default SocialIconHandler;
