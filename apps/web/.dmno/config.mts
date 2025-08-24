import { defineDmnoService, pick } from "dmno";

export default defineDmnoService({
	schema: {
		SERVER_URL: {
			extends: pick(),
		},
	},
});
