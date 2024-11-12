import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";

interface AuthCardProps {
	title: string;
	description: string;
	children: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({
	title,
	description,
	children,
}) => (
	<Card className="w-[350px]">
		<CardHeader>
			<CardTitle className="text-2xl">{title}</CardTitle>
			<CardDescription>{description}</CardDescription>
		</CardHeader>
		<CardContent>{children}</CardContent>
	</Card>
);

export default AuthCard;
