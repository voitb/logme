import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserProfileSchema } from "@/schemas/authSchemas";
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
import { useAuth } from "../../hooks/useAuth";
import useNavigationHandler from "../../hooks/useNavigationHandler";
import ButtonLoader from "../utils/ButtonLoader";
import { FaPencilAlt } from "react-icons/fa";
import { cn } from "../../lib/utils";

export type UserProfileCardUpdates = {
	username?: boolean;
	email?: boolean;
	password?: boolean;
	avatar?: boolean;
};

interface UserProfileCardProps {
	updateAllowance?: UserProfileCardUpdates;
}

interface UserProfileFormData {
	username?: string;
	email?: string;
	currentPassword: string;
	newPassword?: string;
	confirmNewPassword?: string;
	avatar?: File;
	avatarPreview?: string;
}

const defaultUpdateAllowance: Required<UserProfileCardUpdates> = {
	username: true,
	email: true,
	password: true,
	avatar: true,
};

const UserProfileCard: React.FC = ({
	updateAllowance,
}: UserProfileCardProps) => {
	const finalUpdateAllowance = {
		...defaultUpdateAllowance,
		...updateAllowance,
	};
	const { user, updateProfile, loading, setLoading } = useAuth();
	const navigate = useNavigationHandler();

	const [updated, setUpdated] = useState<{ email: boolean }>({
		email: false,
	});

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const userProfileSchema = getUserProfileSchema(
		finalUpdateAllowance,
		updated.email
	);

	const form = useForm<UserProfileFormData>({
		resolver: zodResolver(userProfileSchema),
		defaultValues: {
			avatar: undefined,
			avatarPreview: user?.avatar || undefined,
			username: user?.username || "",
			email: user?.email || "",
			currentPassword: "",
			newPassword: "",
			confirmNewPassword: "",
		},
	});

	const {
		watch,
		formState: { dirtyFields },
	} = form;

	const checkHasAnythingChanged = (() => {
		return (
			!dirtyFields.username &&
			!dirtyFields.email &&
			!dirtyFields.newPassword &&
			!dirtyFields.avatar
		);
	})();

	const handleAvatarClick = () => {
		fileInputRef.current?.click();
	};

	const onSubmit = async (data: UserProfileFormData) => {
		if (checkHasAnythingChanged) {
			return;
		}
		setLoading("manual");
		await updateProfile({
			username: dirtyFields.username ? data.username : undefined,
			email: dirtyFields.email ? data.email : undefined,
			currentPassword: dirtyFields.email ? data.currentPassword : undefined,
			password: dirtyFields.newPassword ? data.newPassword : undefined,
			avatar: dirtyFields.avatar ? data.avatar : undefined,
		});
		setLoading(null);
	};

	const handleOnCancel = async () => {
		navigate("/");
	};

	useEffect(() => {
		setUpdated((prev) => ({ ...prev, email: !!dirtyFields.email }));
	}, [dirtyFields.email]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
				<FormField
					name="avatar"
					control={form.control}
					render={({ field }) => {
						return (
							<FormItem className="mt-1">
								<FormControl>
									<div className="flex items-center justify-center space-x-4">
										<div className="relative group">
											<Avatar
												className={cn("w-20 h-20", {
													"cursor-pointer": finalUpdateAllowance.avatar,
												})}
												onClick={handleAvatarClick}
											>
												<AvatarImage
													src={watch("avatarPreview")}
													alt="User Avatar"
												/>
												<AvatarFallback>
													{watch("username")?.charAt(0).toUpperCase() || "U"}
												</AvatarFallback>
											</Avatar>
											{finalUpdateAllowance.avatar && (
												<div
													className={cn(
														"absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity",
														"rounded-full",
														"pointer-events-none"
													)}
												>
													<FaPencilAlt className="w-5 h-5" />
												</div>
											)}
										</div>
										{finalUpdateAllowance.avatar && (
											<input
												type="file"
												accept="image/*"
												ref={fileInputRef}
												className="hidden"
												onChange={(e) => {
													const file = e.target.files?.[0];
													if (file) {
														field.onChange(file);
														const reader = new FileReader();
														reader.onloadend = () => {
															form.setValue(
																"avatarPreview",
																reader.result as string
															);
														};
														reader.readAsDataURL(file);
													}
												}}
											/>
										)}
									</div>
								</FormControl>
							</FormItem>
						);
					}}
				></FormField>

				<FormField
					name="email"
					control={form.control}
					render={({ field }) => (
						<FormItem className="relative !mt-1">
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="User's email"
									className="!mt-1"
									{...field}
									readOnly={!finalUpdateAllowance.email}
									disabled={!finalUpdateAllowance.email}
								/>
							</FormControl>
							<FormMessage className="absolute text-[11px] !mt-1" />
						</FormItem>
					)}
				/>

				<FormField
					name="username"
					control={form.control}
					render={({ field }) => (
						<FormItem className="relative">
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your username"
									className="!mt-1"
									readOnly={!finalUpdateAllowance.username}
									{...field}
								/>
							</FormControl>
							<FormMessage className="absolute text-[11px] !mt-1" />
						</FormItem>
					)}
				/>

				{finalUpdateAllowance.password && (
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
				)}

				{finalUpdateAllowance.password && (
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
				)}

				{finalUpdateAllowance.email && (
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
				)}

				<div className="flex justify-end gap-4 !mt-1">
					<Button
						disabled={!!loading || checkHasAnythingChanged}
						type="submit"
						className="w-1/2 !mt-10"
					>
						<ButtonLoader loading={loading === "manual"}>Save</ButtonLoader>
					</Button>
					<Button
						disabled={!!loading}
						variant="outline"
						type="button"
						className="w-1/2 !mt-10"
						onClick={handleOnCancel}
					>
						Back
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default UserProfileCard;
