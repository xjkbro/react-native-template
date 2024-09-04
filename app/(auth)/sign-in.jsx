import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { useRouter } from "expo-router";
import { useStore } from "../../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

const SignIn = () => {
	const [formData, setFormData] = useState(null);
	const { user, setUser } = useStore();
	const router = useRouter();

	const handleSubmit = async () => {
		const data = await fetch(
			`${process.env.EXPO_PUBLIC_API_SERVER}/auth/login`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			}
		).then((res) => res.json());

		if (data.accessToken != null && data.accessToken != undefined) {
			setUser(data);
			try {
				// Store the token securely
				await SecureStore.setItemAsync("userToken", data.accessToken);
				// Optionally, store other user data in AsyncStorage
				await AsyncStorage.setItem("userData", JSON.stringify(data));
			} catch (error) {
				console.error("Error storing token:", error);
			}
			router.push("/post");
		}
	};

	return (
		<SafeAreaView className="flex justify-center h-screen -mt-12">
			<FormField
				title="Username"
				placeholder="Enter your username"
				value={formData?.username}
				handleTextChange={(username) =>
					setFormData({ ...formData, username })
				}
				className="mt-5 text-2xl"
			/>
			<FormField
				title="Password"
				placeholder="Enter your password"
				value={formData?.password}
				handleTextChange={(password) =>
					setFormData({ ...formData, password })
				}
				className="mt-5"
			/>
			<TouchableOpacity
				onPress={handleSubmit}
				className="bg-amber-500 rounded-xl min-h-[80px] justify-center items-center mt-5 mx-12"
			>
				<Text className="text-white font-semibold text-xl">Login</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default SignIn;
