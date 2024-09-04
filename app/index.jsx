import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { useStore } from "../store/store";

export default function Home() {
	const router = useRouter();

	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const { user, setUser } = useStore();
	useEffect(() => {
		async function checkAuthentication() {
			try {
				const token = await SecureStore.getItemAsync("userToken");
				const userData = await AsyncStorage.getItem("userData");
				console.log(token);
				if (token) {
					setIsAuthenticated(true);
				}
				if (userData) {
					setUser(JSON.parse(userData));
				}
			} catch (error) {
				console.error("Error retrieving token:", error);
			}
		}
		checkAuthentication();
	}, []);

	useEffect(() => {
		if (isAuthenticated) {
			console.log("Authenticated");
			if (Platform.OS === "ios") {
				setTimeout(() => {
					router.replace("/post");
				}, 1);
			} else {
				setImmediate(() => {
					router.replace("/post");
				});
			}
		}
	}, [isAuthenticated]);
	return (
		<SafeAreaView>
			<Link href="/sign-in">Login</Link>
			<Link href="/">Home</Link>
			<StatusBar hidden={true} />
		</SafeAreaView>
	);
}
