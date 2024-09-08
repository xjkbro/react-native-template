import { View, Text } from "react-native";
import React from "react";

const logout = () => {
	async function handleLogout() {
		try {
			await SecureStore.deleteItemAsync("userAccessToken");
			await SecureStore.deleteItemAsync("userRefreshToken");
			await AsyncStorage.removeItem("userData");
			setIsAuthenticated(false);
		} catch (error) {
			console.error("Error during logout:", error);
		}
	}
	return (
		<View>
			<Text>logout</Text>
		</View>
	);
};

export default logout;
