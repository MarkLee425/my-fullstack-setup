import nodemailer, { type Transporter } from "nodemailer";
import { type MailOptions } from "nodemailer/lib/json-transport/index.js";
// import {
// 	renderContactUsEmail,
// 	renderDeleteUserVerificationEmail,
// 	renderEnterpriseContactEmail,
// 	renderNewsletterSubscriptionEmail,
// 	renderResetPasswordEmail,
// 	renderVerificationEmail,
// 	renderWelcomeEmail,
// } from "example-email-templates";
import config from "../lib/config";

let transporter: Transporter | null = null;
const NO_REPLY_EMAIL = "no-reply@example.com";

function getTransporter(): Transporter {
	try {
		if (!transporter) {
			transporter = nodemailer.createTransport({
				host: config.EMAIL_HOST,
				port: config.EMAIL_PORT,
				pool: true,
				maxConnections: 10,
				maxMessages: 1000,
				auth: {
					user: config.EMAIL_AUTH_USER,
					pass: config.EMAIL_AUTH_PASS,
				},
				secure: config.APP_ENV !== "production",
				requireTLS: config.APP_ENV === "production",
				logger: config.APP_ENV === "production",
				debug: config.APP_ENV !== "production",
			});
		}
		return transporter;
	} catch (err) {
		console.error("Failed to initialize Nodemailer", err);
		throw new Error("Email service unavailable");
	}
}

/**
 * Send an email using the transporter
 */
async function sendEmail(options: MailOptions) {
	try {
		const emailTransporter = getTransporter();
		await emailTransporter.sendMail({
			...options,
		});

		return true;
	} catch (error) {
		console.error("Error:", { error });
		return false;
	}
}

/**
 * Send verification email
 */
export async function sendVerificationEmail(
	receiverEmail: string,
	name: string,
	verificationLink: string,
) {
	return sendEmail({
		from: NO_REPLY_EMAIL,
		to: receiverEmail,
		subject: "Verify Your Email",
		// html: await renderVerificationEmail({
		// 	name: name,
		// 	verificationLink,
		// }),
	});
}

/**
 * Send reset password email
 */
export async function sendResetPasswordEmail(
	receiverEmail: string,
	name: string,
	resetPasswordLink: string,
) {
	return sendEmail({
		from: NO_REPLY_EMAIL,
		to: receiverEmail,
		subject: "Reset Your Password",
		// html: await renderResetPasswordEmail({
		// 	name: name,
		// 	resetPasswordLink,
		// }),
	});
}

/**
 * Send contact us email
 */
export async function sendContactUsEmail(
	name: string,
	email: string,
	content: string,
	metadata?: {
		phone_country_code: string;
		phone_number: string;
		company: string;
		company_size: string;
		country: string;
		referral: string;
	},
) {
	return sendEmail({
		from: NO_REPLY_EMAIL,
		to: "contact@example.com",
		subject: `Contact Us Request from ${name} (${email})`,
		// html: await (metadata
		// 	? renderEnterpriseContactEmail({
		// 			senderName: name,
		// 			senderEmail: email,
		// 			emailContent: content,
		// 			phoneCountryCode: metadata.phone_country_code,
		// 			phoneNumber: metadata.phone_number,
		// 			company: metadata.company,
		// 			companySize: metadata.company_size,
		// 			country: metadata.country,
		// 			referral: metadata.referral,
		// 		})
		// 	: renderContactUsEmail({
		// 			senderName: name,
		// 			senderEmail: email,
		// 			emailContent: content,
		// 		})),
	});
}

/**
 * Send delete account verification email
 */
export async function sendDeleteAccountVerificationEmail(
	receiverEmail: string,
	name: string,
	url: string,
) {
	return sendEmail({
		from: NO_REPLY_EMAIL,
		to: receiverEmail,
		subject: "Delete Your Account",
		// html: await renderDeleteUserVerificationEmail({
		// 	name: name,
		// 	deleteLink: url,
		// }),
	});
}

export async function sendWelcomeEmail(receiverEmail: string, name: string) {
	return sendEmail({
		from: NO_REPLY_EMAIL,
		to: receiverEmail,
		subject: "Welcome to",
		// html: await renderWelcomeEmail({
		// 	name: name,
		// 	mainPageLink: `${config.CLIENT_URL}/chat`,
		// }),
	});
}

export async function sendNewsletterSubscriptionConfirmationEmail(
	receiverEmail: string,
) {
	return sendEmail({
		from: NO_REPLY_EMAIL,
		to: receiverEmail,
		subject: "Welcome to the Newsletter",
		// html: await renderNewsletterSubscriptionEmail({
		// 	email: receiverEmail,
		// 	getStartedLink: `${config.CLIENT_URL}/sign-in`,
		// }),
	});
}
