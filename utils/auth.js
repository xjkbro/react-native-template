import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

export async function handleLogout(router) {
	try {
		await SecureStore.deleteItemAsync("userAccessToken");
		await SecureStore.deleteItemAsync("userRefreshToken");
		await AsyncStorage.removeItem("userData");
		setTimeout(() => {
			router.push("/");
		}, 100);
	} catch (error) {
		console.error("Error during logout:", error);
	}
}

export const refreshAuthToken = async (refreshToken, user, setUser) => {
	console.log("current token", user.accessToken);
	const data = await fetch(
		`${process.env.EXPO_PUBLIC_API_SERVER}/auth/refresh`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ refreshToken }),
		}
	).then((res) => res.json());
	console.log("REFRESHING TOKEN", data.accessToken);
	// setUser({ accessToken: data.accessToken });

	return data.accessToken;
};
