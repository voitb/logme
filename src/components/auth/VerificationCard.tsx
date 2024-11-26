import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth"; // Custom hook for authentication
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const VerificationCard = () => {
	const { user, sendEmailVerification } = useAuth();
	const [isSending, setIsSending] = useState(false);

	const handleSendVerification = async () => {
		setIsSending(true);
		try {
			await sendEmailVerification();
			toast({
				title: "Verification Email Sent",
				description: "Please check your inbox to verify your email.",
				status: "success",
			});
		} catch (err) {
			toast({
				title: "Error Sending Email",
				description: "Unable to send the verification email. Please try again.",
				status: "error",
			});
		} finally {
			setIsSending(false);
		}
	};

	if (!user || user.emailVerification) {
		return null; // Do not display if the user is null or already verified
	}

	return (
		<div className="border border-red-500 rounded-lg p-4 bg-red-50 text-red-700">
			<h3 className="font-bold text-lg">Verify Your Email</h3>
			<p className="text-sm">
				Your account is not verified yet. Please verify your email to access all
				features.
			</p>
			<Button
				onClick={handleSendVerification}
				disabled={isSending}
				className="mt-4"
			>
				{isSending ? "Sending..." : "Resend Verification Email"}
			</Button>
		</div>
	);
};

export default VerificationCard;
