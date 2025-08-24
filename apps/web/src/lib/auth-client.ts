import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: DMNO_PUBLIC_CONFIG.SERVER_URL,
});
