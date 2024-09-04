import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Header() {
	return (
		<View>
			<Link href="/" asChild>
				<TouchableOpacity>
					<Text>Home</Text>
				</TouchableOpacity>
			</Link>
			<Text>Header</Text>
		</View>
	);
}
