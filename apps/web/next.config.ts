import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typedRoutes: true,
	transpilePackages: ["@my-fullstack-setup/ui"],
};

export default nextConfig;
