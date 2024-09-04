import { View, Text } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthLayout = () => {
	return (
		<SafeAreaView>
			{/* <Header /> */}
			<Slot />
		</SafeAreaView>
	);
};

export default AuthLayout;
