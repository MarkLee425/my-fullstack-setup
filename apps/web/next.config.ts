import { dmnoNextConfigPlugin } from "@dmno/nextjs-integration";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default dmnoNextConfigPlugin()(nextConfig);
