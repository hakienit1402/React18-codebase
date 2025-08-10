import { format, formatDistanceToNowStrict, isValid, parse } from "date-fns";

/**
 * Get today's date at 00:00:00 UTC (not affected by local timezone).
 */
export const getTodayUTC = (): Date => {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
};

/**
 * Format a date with a dynamic format string, defaulting to "dd-MMM-yyyy".
 * Always returns result in English.
 */
export const formatDateUTC = (date: Date, formatStr: string = "dd-MMM-yyyy"): string => {
  return format(date, formatStr);
};

/**
 * Convert a local date to a UTC date at 00:00:00 UTC.
 */
export const toUTCDateOnly = (date: Date): Date => {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
};

/**
 * Format a relative time to now (in UTC) like "3 days ago", "in 2 hours"
 * Always returns result in English.
 */
export const formatRelativeToNowUTC = (date: Date): string => {
  return formatDistanceToNowStrict(date, { addSuffix: true });
};

/**
 * Format date to ISO 8601 UTC string: "2025-04-23T00:00:00.000Z"
 */
export const formatToISOString = (date: Date): string => {
  return date.toISOString();
};

/**
 * Format a date in ISO without milliseconds: "2025-04-23T12:34:56Z"
 */
export const formatToISOMidPrecision = (date: Date): string => {
  return date.toISOString().replace(/\.\d{3}Z$/, "Z");
};

/**
 * Format a date with a dynamic format string, defaulting to "dd-MMM-yyyy".
 * Always returns result in English.
 */
type DateFormat = "dd/MM/yyyy" | "yyyy-MM-dd" | "dd-MM-yyyy" | "yyyy/MM/dd" | "dd-MMM-yyyy";

/** Default date format for UI pickers (e.g., 25-Dec-2025) */
export const DEFAULT_PICKER_DATE_FORMAT = "dd-MMM-yyyy";
/** Default date format for BE API payloads (e.g., 2025-12-25) */
export const BE_API_PICKER_DATE_FORMAT = "yyyy-MM-dd";
/**
 * Checks if a given day, month, and year form a valid date.
 * It checks if the constructed Date object has the same year, month, and day as the input.
 * This is necessary because the Date constructor will adjust the date if it's invalid (e.g. February 30).
 * @param day The day of the month (1-indexed)
 * @param month The month of the year (1-indexed)
 * @param year The year
 * @returns true if the date is valid, false otherwise
 */
function isValidDate(day: number, month: number, year: number): boolean {
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}
/**
 * Parses a date string based on a specified format and returns a Date object.
 * Validates if the input forms a correct date according to the format.
 *
 * @param input - The date string to parse.
 * @param format - The format in which the date string is provided, using 'dd', 'MM', 'yyyy'.
 * @returns A Date object if the input string is a valid date according to the format.
 * @throws An error if the input string does not form a valid date.
 */

function parseDate(input: string, format: DateFormat): Date {
  const formatParts = format.split(/[-/]/);
  const dateParts = input.split(/[-/]/);

  let day: number;
  let month: number;
  let year: number;

  // Handle abbreviated month names (MMM format)
  if (format.includes("MMM")) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    day = Number(dateParts[formatParts.indexOf("dd")]);
    const monthStr = dateParts[formatParts.indexOf("MMM")];
    month = monthNames.indexOf(monthStr) + 1;
    year = Number(dateParts[formatParts.indexOf("yyyy")]);

    if (month === 0) {
      throw new Error(`Invalid month name: ${monthStr} in date ${input}`);
    }
  } else {
    // Handle numeric month format (MM)
    day = Number(dateParts[formatParts.indexOf("dd")]);
    month = Number(dateParts[formatParts.indexOf("MM")]);
    year = Number(dateParts[formatParts.indexOf("yyyy")]);
  }

  if (!isValidDate(day, month, year)) {
    throw new Error(`Invalid date: ${input} with format ${format}`);
  }

  return new Date(year, month - 1, day);
}
/**
 * Format a date according to a specified format.
 * The format string can include the following placeholders:
 * - dd: The day of the month (01-31) with leading zero if necessary.
 * - MM: The month of the year (01-12) with leading zero if necessary.
 * - yyyy: The year in four digits.
 *
 * @param date - The Date object to format.
 * @param format - The format string to use for formatting the date.
 * @returns The formatted date string.
 */
function formatDate(date: Date, format: DateFormat): string {
  const dd = String(date.getDate()).padStart(2, "0");
  const MM = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();

  // Handle abbreviated month names (MMM format)
  if (format.includes("MMM")) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const MMM = monthNames[date.getMonth()];
    return format.replace("dd", dd).replace("MMM", MMM).replace("yyyy", String(yyyy));
  } else {
    // Handle numeric month format (MM)
    return format.replace("dd", dd).replace("MM", MM).replace("yyyy", String(yyyy));
  }
}
/**
 * Converts a date string from one format to another using date-fns for maximum flexibility.
 * Supports any valid date-fns format patterns.
 *
 * @param input - The date string to convert.
 * @param fromFormat - The original format pattern (date-fns format).
 * @param toFormat - The target format pattern (date-fns format).
 * @returns The date string formatted in the new format.
 * @throws An error if the input string does not form a valid date according to the fromFormat.
 *
 * @example
 * Basic conversion:
 * convertDateFormat('25/12/2023', 'dd/MM/yyyy', 'yyyy-MM-dd'); // Returns '2023-12-25'
 *
 * Advanced patterns:
 * convertDateFormat('Dec 25, 2023', 'MMM dd, yyyy', 'yyyy-MM-dd'); // Returns '2023-12-25'
 * convertDateFormat('2023-12-25T14:30:00', "yyyy-MM-dd'T'HH:mm:ss", 'dd/MM/yyyy HH:mm'); // Returns '25/12/2023 14:30'
 * convertDateFormat('Monday, December 25, 2023', 'EEEE, MMMM dd, yyyy', 'dd-MMM-yy'); // Returns '25-Dec-23'
 */
export function convertDateFormat(
  input: string,
  fromFormat: string = DEFAULT_PICKER_DATE_FORMAT,
  toFormat: string = BE_API_PICKER_DATE_FORMAT,
): string {
  // Return raw input if too short to parse as a date
  if (!input || input.length < 6) {
    return input;
  }

  // Additional validation for obviously invalid years (e.g., 20256, 99999)
  const yearMatch = input.match(/\b(\d{5,})\b/);
  if (yearMatch) {
    const year = parseInt(yearMatch[1]);
    if (year > 9999) {
      return input;
    }
  }

  // Additional validation for format mismatches
  // Support both MMM (abbreviated) and MMMM (full) month names
  if (fromFormat.includes("MMM")) {
    const validMonthAbbreviations = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const validFullMonthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Extract parts based on common delimiters including dots
    const inputParts = input.split(/[-/\s.]/);
    const formatParts = fromFormat.split(/[-/\s.]/);

    // Find the position of MMM or MMMM in the format
    const monthIndex = formatParts.findIndex((part) => part.includes("MMM"));

    if (monthIndex >= 0 && monthIndex < inputParts.length) {
      const monthPart = inputParts[monthIndex];
      // Check if the month part is all numeric (invalid for MMM/MMMM format)
      if (/^\d+$/.test(monthPart)) {
        return input;
      }

      // Check if the month part is valid based on format type
      if (fromFormat.includes("MMMM")) {
        // Format expects full month names
        if (!validFullMonthNames.includes(monthPart)) {
          return input;
        }
      } else {
        // Format expects abbreviated month names
        if (!validMonthAbbreviations.includes(monthPart)) {
          return input;
        }
      }
    }
  }

  try {
    // Parse date with strict option enabled for exact format match
    const date = parse(input, fromFormat, new Date(), {
      useAdditionalWeekYearTokens: true,
      useAdditionalDayOfYearTokens: true,
    });

    if (!isValid(date)) {
      return input; // Return input instead of throwing for invalid dates
    }

    // Validate that parsed year is reasonable (1900-2100)
    const year = date.getFullYear();
    if (year < 1900 || year > 2100) {
      return input;
    }

    // To validate strictness, re-format parsed date to fromFormat and compare with input
    const reformatted = format(date, fromFormat);
    if (reformatted !== input) {
      return input; // Return input instead of throwing for format mismatches
    }

    // Now format to target format
    return format(date, toFormat);
  } catch {
    // For any parsing errors, return input as-is instead of throwing
    return input;
  }
}

/**
 * @deprecated Use the new convertDateFormat function that accepts string formats instead.
 * Converts a date string from one format to another (legacy version with limited format support).
 *
 * @param input - The date string to convert.
 * @param fromFormat - The original format of the date string, using predefined DateFormat types.
 * @param toFormat - The target format for the date string, using predefined DateFormat types.
 * @returns The date string formatted in the new format.
 * @throws An error if the input string does not form a valid date according to the fromFormat.
 */
export function convertDateFormatLegacy(
  input: string,
  { fromFormat, toFormat }: { fromFormat: DateFormat; toFormat: DateFormat } = {
    fromFormat: DEFAULT_PICKER_DATE_FORMAT,
    toFormat: BE_API_PICKER_DATE_FORMAT,
  },
): string {
  const date = parseDate(input, fromFormat);
  return formatDate(date, toFormat);
}

// -------------------------------------------------------------
// Additional UTC date utilities
// -------------------------------------------------------------

/**
 * Returns start of day in UTC for a given date.
 */
export const startOfDayUTC = (date: Date): Date =>
  new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0));

/**
 * Returns end of day in UTC for a given date.
 */
export const endOfDayUTC = (date: Date): Date =>
  new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59, 999));

/**
 * Adds a number of calendar days in UTC (24h steps) to a given date.
 */
export const addDaysUTC = (date: Date, days: number): Date =>
  new Date(date.getTime() + days * 86_400_000);

/**
 * Checks if a UTC date falls on weekend (Saturday or Sunday).
 */
export const isWeekendUTC = (date: Date): boolean => {
  const day = date.getUTCDay();
  return day === 0 || day === 6;
};

/**
 * Adds N business days in UTC, skipping Saturdays and Sundays.
 */
export const addBusinessDaysUTC = (date: Date, numBusinessDays: number): Date => {
  if (numBusinessDays === 0) return new Date(date.getTime());
  const step = numBusinessDays > 0 ? 1 : -1;
  let remaining = Math.abs(numBusinessDays);
  let cursor = new Date(date.getTime());
  while (remaining > 0) {
    cursor = addDaysUTC(cursor, step);
    if (!isWeekendUTC(cursor)) remaining -= 1;
  }
  return cursor;
};

/**
 * Returns the next business day in UTC (skipping Sat/Sun). If given date is a business day, returns the next one.
 */
export const nextBusinessDayUTC = (date: Date): Date => {
  let d = addDaysUTC(date, 1);
  while (isWeekendUTC(d)) {
    d = addDaysUTC(d, 1);
  }
  return d;
};

/**
 * Compares if two dates are on the same calendar day based on UTC.
 */
export const isSameDayUTC = (a: Date, b: Date): boolean =>
  a.getUTCFullYear() === b.getUTCFullYear() &&
  a.getUTCMonth() === b.getUTCMonth() &&
  a.getUTCDate() === b.getUTCDate();

/**
 * Difference in whole calendar days between two dates using UTC midnights.
 * Positive if `a` is after `b`.
 */
export const differenceInCalendarDaysUTC = (a: Date, b: Date): number => {
  const aMid = startOfDayUTC(a).getTime();
  const bMid = startOfDayUTC(b).getTime();
  return Math.round((aMid - bMid) / 86_400_000);
};

/**
 * Parses an ISO 8601 string to Date. Returns null if invalid.
 */
export const parseISOToUTC = (iso: string): Date | null => {
  const d = new Date(iso);
  return isNaN(d.getTime()) ? null : d;
};

/**
 * Returns y-m-d string in UTC (e.g., 2025-12-25). Avoids local-time shifts.
 */
export const formatYYYYMMDDUTC = (date: Date): string => {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

/**
 * Clamp a UTC date between min and max bounds.
 */
export const clampDateUTC = (date: Date, min?: Date, max?: Date): Date => {
  const t = date.getTime();
  if (min && t < min.getTime()) return new Date(min.getTime());
  if (max && t > max.getTime()) return new Date(max.getTime());
  return date;
};

/**
 * Checks if a UTC date is between two bounds. Inclusive by default.
 */
export const isBetweenUTC = (
  date: Date,
  start: Date,
  end: Date,
  inclusive: boolean = true,
): boolean => {
  const t = date.getTime();
  const s = start.getTime();
  const e = end.getTime();
  return inclusive ? t >= s && t <= e : t > s && t < e;
};
