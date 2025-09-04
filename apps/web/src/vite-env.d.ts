/// <reference types="vite/client" />

interface ViteTypeOptions {}

interface ImportMetaEnv {
	readonly VITE_SERVER_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
