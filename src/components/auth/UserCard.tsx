import { useState } from "react";
import { useAuth } from "@/hooks/useAuth"; // Assuming useAuth provides the current user info and logout
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Assuming you have an Avatar component
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
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

	const name = user?.email || user?.username;

	return (
		<div className="relative">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button className="flex items-center space-x-2 cursor-pointer">
						<Avatar className="w-10 h-10">
							<AvatarImage
								src={user?.avatar || "/default-avatar.png"}
								alt={user?.username || "User"}
							/>
							<AvatarFallback>{name?.[0]?.toUpperCase()}</AvatarFallback>
						</Avatar>
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-48">
					<div className="px-1.5 py-2 flex items-center justify-center">
						<p className="text-sm font-semibold">{user?.username}</p>
						<p className="text-xs text-gray-500">{user?.email}</p>
					</div>
					<DropdownMenuItem
						onClick={handleLogout}
						className="cursor-pointer text-red-500 flex items-center justify-center"
					>
						Logout
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default UserCard;
