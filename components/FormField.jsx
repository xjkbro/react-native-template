import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";

const FormField = ({
	title,
	value,
	placeholder,
	handleTextChange,
	className,
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<View className={`space-y-2 px-12 ${className}`}>
			<Text className="text-base text-gray-700 font-medium">{title}</Text>
			<View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary ">
				<TextInput
					className="flex-1 font-semibold text-base text-left"
					placeholder={placeholder}
					placeholderTextColor="gray-500"
					value={value}
					onChangeText={handleTextChange}
					secureTextEntry={title === "Password" && !showPassword}
				/>
			</View>
		</View>
	);
};

export default FormField;
