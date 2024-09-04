import { View, Text } from "react-native";
import React from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const RootLayout = () => {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: 1 } },
	});
	// ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
	return (
		<QueryClientProvider client={queryClient}>
			<Slot />
			<StatusBar hidden={true} />
		</QueryClientProvider>
	);
};

export default RootLayout;
