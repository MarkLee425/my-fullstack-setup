import { expoClient } from "@better-auth/expo/client";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";
import { auth } from "../../server/src/lib/auth";

export const authClient = createAuthClient({
	baseURL: `${process.env.EXPO_PUBLIC_SERVER_URL}/auth`,
	plugins: [
		expoClient({
			storagePrefix: "my-fullstack-setup",
			storage: SecureStore,
		}),
		inferAdditionalFields<typeof auth>(),
	],
});
