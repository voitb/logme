import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import LoginWrapper from "../layout/LoginWrapper";

const VerificationCard = () => {
	const { user, sendEmailVerification } = useAuth();
	const [isSending, setIsSending] = useState(false);
	const [lastSendTime, setLastSendTime] = useState<number | null>(null);

	const handleSendVerification = async () => {
		const now = Date.now();
		if (lastSendTime && now - lastSendTime < 10000) {
			toast({
				title: "Too Soon",
				description:
					"Please wait at least 10 seconds before resending the email.",
				type: "foreground",
			});
			return;
		}

		setIsSending(true);
		try {
			await sendEmailVerification();
			toast({
				title: "Verification Email Sent",
				description: "Please check your inbox to verify your email.",
				type: "foreground",
			});
			setLastSendTime(Date.now());
		} catch {
			toast({
				title: "Error Sending Email",
				description: "Unable to send the verification email. Please try again.",
				type: "background",
			});
		} finally {
			setIsSending(false);
		}
	};

	if (!user || user.emailVerification) {
		return null;
	}

	return (
		<LoginWrapper>
			<div className="max-w-lg mx-auto mt-6 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-md">
				<h3 className="text-lg font-semibold text-gray-800">
					Verify Your Email
				</h3>
				<p className="mt-2 text-sm text-gray-600">
					Your account is not verified yet. Please verify your email to access
					all features.
				</p>
				<Button
					onClick={handleSendVerification}
					disabled={isSending}
					className="mt-4"
				>
					{isSending
						? "Sending..."
						: lastSendTime
						? "Resend Verification Email"
						: "Send Verification Email"}
				</Button>
			</div>
		</LoginWrapper>
	);
};

export default VerificationCard;
