import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
	baseURL: `${process.env.EXPO_PUBLIC_SERVER_URL}/auth`,
	plugins: [
		expoClient({
			storagePrefix: "my-fullstack-setup",
			storage: SecureStore,
		}),
	],
});
