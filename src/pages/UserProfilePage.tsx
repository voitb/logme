import AuthCard from "@/components/auth/AuthCard";
import LoginWrapper from "@/components/layout/LoginWrapper";
import UserProfileCard from "@/components/auth/UserProfileCard";

interface Props {
	title?: string;
	description?: string;
}

const UserProfilePage = (props: Props) => {
	const { title, description } = props;

	return (
		<LoginWrapper>
			<AuthCard
				title={title || "User Profile"}
				description={description || "Update your account information."}
			>
				<div className="space-y-4">
					<UserProfileCard />
				</div>
			</AuthCard>
		</LoginWrapper>
	);
};

export default UserProfilePage;
