import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "../../../server/src/lib/auth";

export const authClient = createAuthClient({
	baseURL: `${import.meta.env.VITE_SERVER_URL}/auth`,
	plugins: [inferAdditionalFields<typeof auth>()],
});
