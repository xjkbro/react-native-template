import { View, Text, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { Slot, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
// import { refreshAuthToken } from "../utils/auth";
import { useStore, useTokens } from "../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

const RootLayout = () => {
	const router = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const { user, setUser } = useStore();
	const { accessToken, refreshToken, setAccessToken, setRefreshToken } =
		useTokens();
	const [refreshingToken, setRefreshingToken] = useState(false);

	useEffect(() => {
		async function checkAuthentication() {
			try {
				const accessToken = await SecureStore.getItemAsync(
					"userAccessToken"
				);
				const refreshToken = await SecureStore.getItemAsync(
					"userRefreshToken"
				);
				const userData = await AsyncStorage.getItem("userData");
				// console.log(accessToken);
				// console.log(userData);
				if (refreshToken) {
					setIsAuthenticated(true);
				}
				if (userData) {
					setUser(JSON.parse(userData));
					setAccessToken(accessToken);
					setRefreshToken(refreshToken);
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
					router.replace("/dashboard");
				}, 1);
			} else {
				setImmediate(() => {
					router.replace("/dashboard");
				});
			}
		}
	}, [isAuthenticated]);

	// ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
	return (
		<QueryClientProvider client={queryClient}>
			<Slot />
			<StatusBar hidden={true} />
		</QueryClientProvider>
	);
};

export default RootLayout;

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 30000, // 30 seconds
			retry: 2,
		},
		mutations: {
			retry: 2,
		},
	},
});
