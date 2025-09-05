import { Container } from "@my-fullstack-setup/ui/components/native/container";
import { ScrollView, Text, View } from "react-native";

export default function TabTwo() {
	return (
		<Container>
			<ScrollView className="flex-1 p-6">
				<View className="py-8">
					<Text className="mb-2 font-bold text-3xl text-foreground">
						Tab Two
					</Text>
					<Text className="text-lg text-muted-foreground">
						Discover more features and content
					</Text>
				</View>
			</ScrollView>
		</Container>
	);
}
