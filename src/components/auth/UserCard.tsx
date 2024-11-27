import { useAuth } from "@/hooks/useAuth"; // Assuming useAuth provides the current user info and logout
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const UserCard = () => {
	const { user, logout } = useAuth();

	const handleLogout = async () => {
		try {
			await logout();
		} catch (err) {
			console.error("Logout failed:", err);
		}
	};

	const name = user?.username || user?.email?.split("@")[0] || "User";
	const email = user?.email || "No email available";

	return (
		<div className="relative">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button className="flex items-center space-x-2 cursor-pointer focus:outline-none">
						<Avatar className="w-10 h-10">
							<AvatarImage
								src={user?.avatar || "/default-avatar.png"}
								alt={name}
							/>
							<AvatarFallback>{name[0]?.toUpperCase() || "?"}</AvatarFallback>
						</Avatar>
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56 p-2 bg-white dark:bg-gray-800 rounded-md shadow-lg">
					<div className="px-2 py-2">
						<p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
							{name}
						</p>
						<p className="text-xs text-gray-500 dark:text-gray-400">{email}</p>
					</div>
					<DropdownMenuSeparator className="my-1 border-t border-gray-200 dark:border-gray-700" />
					<DropdownMenuItem
						onClick={handleLogout}
						className="flex justify-center cursor-pointer text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900 dark:text-red-500 rounded-md px-2 py-2"
					>
						Logout
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default UserCard;
