import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

export async function handleLogout(router) {
	try {
		await SecureStore.deleteItemAsync("userToken");
		await AsyncStorage.removeItem("userData");
		setTimeout(() => {
			router.push("/");
		}, 100);
	} catch (error) {
		console.error("Error during logout:", error);
	}
}
