import { cssInterop } from "nativewind";
import type React from "react";
import { SafeAreaView as View } from "react-native";

const SafeAreaView = cssInterop(View, {
	className: "style",
});

export const Container = ({ children }: { children: React.ReactNode }) => {
	return (
		<SafeAreaView className="flex-1 bg-background">{children}</SafeAreaView>
	);
};
