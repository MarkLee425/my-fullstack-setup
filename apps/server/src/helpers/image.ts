import sharp from "sharp";
import z from "zod";

const FORMAT_MAP: { [K in keyof sharp.FormatEnum]: null } = {
	avif: null,
	dcraw: null,
	dz: null,
	exr: null,
	fits: null,
	gif: null,
	heif: null,
	input: null,
	jpeg: null,
	jpg: null,
	jp2: null,
	jxl: null,
	magick: null,
	openslide: null,
	pdf: null,
	png: null,
	ppm: null,
	rad: null,
	raw: null,
	svg: null,
	tiff: null,
	tif: null,
	v: null,
	webp: null,
} as const;

const FORMATS = Object.keys(FORMAT_MAP) as unknown as readonly [
	keyof sharp.FormatEnum,
	...(keyof sharp.FormatEnum)[],
];

export const imageQueryParamsSchema = z.strictObject({
	height: z.optional(
		z.pipe(
			z.string(),
			z.transform((v, ctx) => {
				try {
					const floatNumber = parseFloat(v);
					if (Number.isNaN(floatNumber)) {
						throw new Error("Received NaN");
					}
					return parseFloat(v);
				} catch (err) {
					ctx.issues.push({
						code: "invalid_type",
						input: "string",
						validation: "base64",
						message: "Height must be a number",
						expected: "string",
					});
					return;
				}
			}),
		),
	),
	width: z.optional(
		z.pipe(
			z.string(),
			z.transform((v, ctx) => {
				try {
					const floatNumber = parseFloat(v);
					if (Number.isNaN(floatNumber)) {
						throw new Error("");
					}
					return parseFloat(v);
				} catch (err) {
					ctx.issues.push({
						code: "invalid_type",
						input: "string",
						validation: "base64",
						message: "Height must be a number",
						expected: "string",
					});
					return;
				}
			}),
		),
	),
	format: z.optional(z.enum(FORMATS)),
});

export type ImageQueryParams = z.infer<typeof imageQueryParamsSchema>;

/**
 * Transform an image with the specified options
 */
export async function transformImage(
	image: string | Buffer,
	options: ImageQueryParams,
): Promise<Buffer> {
	try {
		const transformedImage = sharp(image);

		if (options.height && options.width) {
			transformedImage.resize(options.width, options.height, {
				fit: "cover",
			});
		}

		if (options.format) {
			transformedImage.toFormat(options.format, {
				quality: 100,
				progressive: true,
			});
		}

		return transformedImage.toBuffer();
	} catch (err) {
		throw new Error("Error transforming image");
	}
}
