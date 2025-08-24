import { hash, verify } from "@node-rs/argon2";

export const HASH_LENGTH = 32;

async function createPasswordHash(password: string) {
	try {
		return hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: HASH_LENGTH,
			parallelism: 1,
		});
	} catch (error) {
		console.error("Error creating password hashes:", error);
		throw new Error("Error creating password hashes");
	}
}

async function verifyPasswordHash(
	password: string,
	hash: string,
): Promise<boolean> {
	try {
		return verify(hash, password);
	} catch (error) {
		console.error("Error comparing hashes:", error);
		process.exit(1);
	}
}

export { createPasswordHash, verifyPasswordHash };
