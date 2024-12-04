import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userProfileSchema } from "@/schemas/authSchemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { FaPencilAlt } from "react-icons/fa";

interface UserProfileFormData {
	username: string;
	email: string;
	currentPassword: string;
	newPassword: string;
	confirmNewPassword: string;
	avatar?: File;
	avatarPreview?: string;
}

const UserProfileCard: React.FC = () => {
	const form = useForm<UserProfileFormData>({
		resolver: zodResolver(userProfileSchema),
		defaultValues: {
			username: "",
			email: "",
			currentPassword: "",
			newPassword: "",
			confirmNewPassword: "",
		},
	});

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleAvatarClick = () => {
		fileInputRef.current?.click();
	};

	const onSubmit = async (data: UserProfileFormData) => {
		console.log(data);
		// Implement the logic to update user information
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
				<FormItem className="mt-1">
					<FormControl>
						<div className="flex items-center justify-center space-x-4">
							<div className="relative group">
								<Avatar
									className="w-20 h-20 cursor-pointer"
									onClick={handleAvatarClick}
								>
									<AvatarImage
										src={form.watch("avatarPreview") || "/default-avatar.png"}
										alt="User Avatar"
									/>
									<AvatarFallback>
										{form.watch("username")?.charAt(0).toUpperCase() || "U"}
									</AvatarFallback>
								</Avatar>
								<div
									className={cn(
										"absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity",
										"rounded-full"
									)}
								>
									<FaPencilAlt className="w-5 h-5" />
								</div>
							</div>
							<input
								type="file"
								accept="image/*"
								ref={fileInputRef}
								className="hidden"
								onChange={(e) => {
									const file = e.target.files?.[0];
									if (file) {
										form.setValue("avatar", file);
										const reader = new FileReader();
										reader.onloadend = () => {
											form.setValue("avatarPreview", reader.result as string);
										};
										reader.readAsDataURL(file);
									}
								}}
							/>
						</div>
					</FormControl>
				</FormItem>

				<FormField
					name="username"
					control={form.control}
					render={({ field }) => (
						<FormItem className="relative !mt-1">
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your username"
									className="!mt-1"
									{...field}
								/>
							</FormControl>
							<FormMessage className="absolute text-[11px] !mt-1" />
						</FormItem>
					)}
				/>

				<FormField
					name="email"
					control={form.control}
					render={({ field }) => (
						<FormItem className="relative">
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="Enter your email"
									className="!mt-1"
									{...field}
								/>
							</FormControl>
							<FormMessage className="absolute text-[11px] !mt-1" />
						</FormItem>
					)}
				/>

				<FormField
					name="currentPassword"
					control={form.control}
					render={({ field }) => (
						<FormItem className="relative">
							<FormLabel>Current Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Enter your current password"
									className="!mt-1"
									{...field}
								/>
							</FormControl>
							<FormMessage className="absolute text-[11px] !mt-1" />
						</FormItem>
					)}
				/>

				<FormField
					name="newPassword"
					control={form.control}
					render={({ field }) => (
						<FormItem className="relative">
							<FormLabel>New Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Enter a new password"
									className="!mt-1"
									{...field}
								/>
							</FormControl>
							<FormMessage className="absolute text-[11px] !mt-1" />
						</FormItem>
					)}
				/>

				<FormField
					name="confirmNewPassword"
					control={form.control}
					render={({ field }) => (
						<FormItem className="relative">
							<FormLabel>Confirm New Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Confirm your new password"
									className="!mt-1"
									{...field}
								/>
							</FormControl>
							<FormMessage className="absolute text-[11px] !mt-1" />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full !mt-10">
					Save Changes
				</Button>
			</form>
		</Form>
	);
};

export default UserProfileCard;
