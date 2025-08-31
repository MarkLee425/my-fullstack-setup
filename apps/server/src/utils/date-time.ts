import { isValid, parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

type InputDate = string | Date | number;

// input -> Date object
function parseToDate(input: InputDate): Date | null {
	let date: Date;

	if (input instanceof Date) {
		date = input;
	} else if (typeof input === "number") {
		date = new Date(input);
	} else if (typeof input === "string") {
		const parsed = parseISO(input);
		date = isValid(parsed) ? parsed : new Date(input);
	} else {
		return null;
	}

	return isValid(date) ? date : null;
}

// Format a Date to YYYY-MM-DD in a specific timezone (UTC by default)
export function formatDate(input: InputDate, timeZone = "UTC"): string | null {
	const date = parseToDate(input);
	if (!date) return null;
	return formatInTimeZone(date, timeZone, "yyyy-MM-dd");
}

// Format a Date to YYYY-MM-DD HH:mm:ss in a specific timezone (UTC by default)
export function formatDateTime(
	input: InputDate,
	timeZone = "UTC",
): string | null {
	const date = parseToDate(input);
	if (!date) return null;
	return formatInTimeZone(date, timeZone, "yyyy-MM-dd HH:mm:ss");
}

// Format a Date to HH:mm:ss in a specific timezone (UTC by default)
export function formatTime(input: InputDate, timeZone = "UTC"): string | null {
	const date = parseToDate(input);
	if (!date) return null;
	return formatInTimeZone(date, timeZone, "HH:mm:ss");
}

// Convert input to Unix timestamp (milliseconds since epoch, UTC)
export function toUnixTimestamp(input: InputDate): number | null {
	const date = parseToDate(input);
	if (!date) return null;
	return date.getTime(); // milliseconds since 1970-01-01T00:00:00Z
}

export function toUnixTimestampWithOffset(
	input: InputDate,
): { timestamp: number; offsetMinutes: number } | null {
	const date = parseToDate(input);
	if (!date) return null;
	return {
		timestamp: date.getTime(),
		offsetMinutes: date.getTimezoneOffset(), // client local offset in minutes
	};
}
