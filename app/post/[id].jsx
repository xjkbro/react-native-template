import { View, Text, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTokens } from "../../store/store";
import { refreshAuthToken } from "../../utils/auth";

const SinglePost = () => {
	const { id } = useLocalSearchParams();
	const router = useRouter();
	const { accessToken } = useTokens();

	const { isFetching, data, error } = useQuery({
		queryKey: [`singlePost/${id}`],
		queryFn: async () => {
			console.log(
				`${process.env.EXPO_PUBLIC_API_SERVER}/api/posts/${id}`
			);
			const res = await fetch(
				`${process.env.EXPO_PUBLIC_API_SERVER}/api/posts/${id}`,
				{
					method: "GET",
					headers: {
						Accept: "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			if (res.status === 401 || res.status === 400) {
				const access = await refreshAuthToken(
					refreshToken,
					user,
					setUser
				);
				setAccessToken(access);
			}
			return res.json();
		},
	});

	return (
		<SafeAreaView>
			<Pressable onPress={() => router.back()}>
				<Text className="p-1">← Back</Text>
			</Pressable>
			{isFetching ? (
				<Text>Loading...</Text>
			) : (
				<>
					<Text className="text-xl font-bold">{data.title}</Text>
					<Text>{data.content}</Text>
				</>
			)}
		</SafeAreaView>
	);
};

export default SinglePost;
