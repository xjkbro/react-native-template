import {
	View,
	Text,
	Pressable,
	TextInput,
	TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useStore, useTokens } from "../../store/store";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../../utils/queries";
import { queryClient } from "../_layout";
import FormField from "../../components/FormField";
import { refreshAuthToken } from "../../utils/auth";

const CreatePost = () => {
	const { accessToken, refreshToken, setAccessToken } = useTokens();
	const [formData, setFormData] = useState({
		title: "",
		content: "",
		draft: 1,
	});
	const { user, setUser } = useStore();
	const router = useRouter();
	const mutation = useMutation({
		mutationKey: ["createPost"],
		mutationFn: async (newPost) => {
			const res = await fetch(
				`${process.env.EXPO_PUBLIC_API_SERVER}/api/posts`,
				{
					method: "POST",
					headers: {
						Accept: "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify(newPost),
				}
			);
			if (res.status === 401 || res.status === 400) {
				console.log(
					"refresh token: ",
					refreshToken,
					user,
					setUser,
					accessToken
				);
				const access = await refreshAuthToken(
					refreshToken,
					user,
					setUser
				);
				setAccessToken(access);
			}
			return res.json();
		},
		onSuccess: (data) => {
			console.log("asdas");
			queryClient.invalidateQueries({ queryKey: ["userPosts"] });
			router.push("/dashboard");
		},
	});
	return (
		<SafeAreaView>
			<Pressable onPress={() => router.back()}>
				<Text className="p-1">← Back</Text>
			</Pressable>
			<Pressable>
				<Text>CreatePost</Text>
			</Pressable>
			<View>
				<FormField
					title="Title"
					value={formData.title}
					placeholder="Title of Post"
					handleTextChange={(title) =>
						setFormData({ ...formData, title })
					}
				/>
				<FormField
					title="Content"
					value={formData.content}
					placeholder="Content of Post"
					handleTextChange={(content) =>
						setFormData({ ...formData, content })
					}
					multiline
				/>
			</View>
			<TouchableOpacity
				onPress={() => {
					mutation.mutate({
						userId: user.userId,
						...formData,
					});
				}}
				className="bg-amber-500 rounded-xl min-h-[80px] justify-center items-center mt-5 mx-12"
			>
				<Text className="text-white font-semibold text-xl">
					Create Post
				</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default CreatePost;
