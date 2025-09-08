import { generateOpenApiDocument } from "trpc-to-openapi";
import config from "@/lib/config";
import { appRouter } from "./routers";

// Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(appRouter, {
	title: "My Fullstack Setup API Docs",
	description: "This is the API Docs for my fullstack setup",
	version: "1.0.0",
	baseUrl: config.SERVER_URL,
	docsUrl: "https://github.com/mcampa/trpc-to-openapi",
	tags: ["auth", "users", "posts"],
});
