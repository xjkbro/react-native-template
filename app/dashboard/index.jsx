import {
	View,
	Text,
	FlatList,
	Pressable,
	TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useStore, useTokens } from "../../store/store";
import { useQuery } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { handleLogout, refreshAuthToken } from "../../utils/auth";

const PostHome = () => {
	const [user, setUser] = useStore((state) => [state.user, state.setUser]);
	const { accessToken, refreshToken, setAccessToken } = useTokens();
	const router = useRouter();
	const { isFetching, error, data } = useQuery({
		queryKey: ["userPosts"],
		queryFn: async () => {
			const res = await fetch(
				`${process.env.EXPO_PUBLIC_API_SERVER}/api/posts`,
				{
					method: "GET",
					headers: {
						Accept: "application/json, application/octet-stream, */*",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			console.log(res);
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

	useEffect(() => {
		console.log("Access token", user.accessToken);
		console.log("Refresh token", refreshToken);
	}, []);
	return (
		<SafeAreaView className="p-12">
			<Text className="text-xl">Dashboard</Text>
			{isFetching ? (
				<Text className="text-xl">Loading...</Text>
			) : (
				<FlatList
					className="bg-red-400"
					data={data ? data : []}
					keyExtractor={(item, index) => index}
					renderItem={({ item }) => {
						return (
							<Pressable
								onPress={() => router.push(`/post/${item.id}`)}
							>
								<Text className="p-1">{item.title}</Text>
							</Pressable>
						);
					}}
				/>
			)}
			<Link href="/post/create">
				<Text>Create Post</Text>
			</Link>
			<TouchableOpacity onPress={() => handleLogout(router)}>
				<Text>Logout</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default PostHome;
