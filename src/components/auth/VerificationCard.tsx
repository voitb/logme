import React, { useCallback, useEffect, useState } from "react";
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
		return null;
	}

	return (
		<div className="max-w-lg mx-auto mt-6 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-md">
			<h3 className="text-lg font-semibold text-gray-800">Verify Your Email</h3>
			<p className="mt-2 text-sm text-gray-600">
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
