import {
	View,
	Text,
	FlatList,
	Pressable,
	TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useStore } from "../../store/store";
import { useQuery } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { handleLogout } from "../../utils/auth";

const PostHome = () => {
	const [user, setUser] = useStore((state) => [state.user, state.setUser]);
	const router = useRouter();
	const { isFetching, error, data } = useQuery({
		queryKey: ["userPosts"],
		queryFn: async () => {
			return await fetch(
				`${process.env.EXPO_PUBLIC_API_SERVER}/api/posts`,
				{
					method: "GET",
					headers: {
						Accept: "application/json",
						Authorization: `Bearer ${user.accessToken}`,
					},
				}
			).then((res) => res.json());
		},
	});
	return (
		<SafeAreaView className="p-12">
			{isFetching ? (
				<Text className="text-xl">Loading...</Text>
			) : (
				<FlatList
					className="bg-red-400"
					data={data}
					keyExtractor={(item, index) => index}
					renderItem={({ item }) => {
						return <Text>{item.title}</Text>;
					}}
				/>
			)}
			<Link href="/">
				<Text>Home</Text>
			</Link>
			<TouchableOpacity onPress={() => handleLogout(router)}>
				<Text>Logout</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default PostHome;
