import {
	DeleteObjectCommand,
	GetObjectCommand,
	PutObjectCommand,
	type PutObjectCommandInput,
	S3Client,
} from "@aws-sdk/client-s3";
import config from "@/lib/config";

let s3Service: S3Client | null = null;

export function getS3Service(): S3Client {
	if (!s3Service) {
		s3Service = new S3Client({
			region: "auto",
			endpoint: config.S3_ENDPOINT,
			credentials: {
				accessKeyId: config.S3_ACCESS_KEY_ID,
				secretAccessKey: config.S3_SECRET_ACCESS_KEY,
			},
		});
	}
	return s3Service;
}

const S3_BUCKET_NAME = config.S3_BUCKET_NAME;
const FILE_FORMAT = "jpeg" as const; // Minimize image size
const IMAGE_PREFIX = "image" as const;
const USER_AVATAR_SUBFIX = `${IMAGE_PREFIX}/user/avatar`;

export async function uploadUserAvatarToBucket(
	uuid: string,
	imageData: Buffer,
) {
	const fileName = `${USER_AVATAR_SUBFIX}/${uuid}.${FILE_FORMAT}`;
	const uploadParams = {
		Bucket: S3_BUCKET_NAME,
		Key: fileName,
		Body: imageData,
		ContentType: `image/${FILE_FORMAT}`,
	} as PutObjectCommandInput;

	console.log(
		`Uploading user avatar to S3 bucket: ${S3_BUCKET_NAME}, key: ${fileName}`,
	);
	const command = new PutObjectCommand(uploadParams);
	const s3Service = getS3Service();
	await s3Service.send(command);
}

export async function getUserAvatarFromBucket(uuid: string) {
	const fileName = `${USER_AVATAR_SUBFIX}/${uuid}.${FILE_FORMAT}`;
	const getParams = {
		Bucket: S3_BUCKET_NAME,
		Key: fileName,
	};

	const command = new GetObjectCommand(getParams);
	const s3Service = getS3Service();
	const { Body, ContentType } = await s3Service.send(command);
	return { Body, ContentType };
}

export async function deleteUserAvatarFromBucket(uuid: string) {
	const fileName = `${USER_AVATAR_SUBFIX}/${uuid}.${FILE_FORMAT}`;
	const deleteParams = {
		Bucket: S3_BUCKET_NAME,
		Key: fileName,
	};

	const command = new DeleteObjectCommand(deleteParams);
	const s3Service = getS3Service();
	await s3Service.send(command);
}
