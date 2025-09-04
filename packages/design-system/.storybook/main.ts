import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	stories: ["../**/*.mdx", "../**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@storybook/addon-docs",
		"@storybook/addon-a11y",
		"@storybook/addon-vitest",
		"storybook-addon-test-codegen",
	],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	docs: {},
	typescript: {
		reactDocgen: "react-docgen-typescript",
	},
};
export default config;
