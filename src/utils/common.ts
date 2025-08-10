import { saveAs } from "file-saver";
import { isEqual } from "lodash";

import { SelectOptionTypes } from "@/components/SelectInput";

export const isExist = (value: unknown): boolean => {
  return value !== undefined && value !== null;
};

/**
 * @param mimeType
 * @returns file type without prefix
 * @example
 * 'application/pdf' => 'pdf'
 * 'image/jpeg' => 'jpeg'
 * 'image/png' => 'png'
 */
export function getFileTypeWithoutPrefix(mimeType?: string): string | null {
  if (!mimeType) return null;
  const parts = mimeType.split("/");
  return parts.length === 2 ? parts[1] : null;
}
// This field must not be more than 128 characters.
export const messageMaxLength = (max: number) =>
  `This field must not be more than ${max} characters.`;

/**
 * Validate a string as a decimal number with up to 17 digits, including 6 decimal places.
 * The string can have commas as thousand separators.
 * @example
 * '1,234,567.89' => true
 * '1,234,567.123456' => false
 * '1,234,567,890' => false
 * '1.234567890123456' => false
 */
// Cached regex for performance
const DECIMAL_176_REGEX = /^(\d{1,3}(,\d{3})*)(\.\d{1,6})?$/;
const DECIMAL_CLEAN_REGEX = /^\d+(\.\d{1,6})?$/;

export const checkDecimal176 = (value: string): boolean => {
  if (!value) return false;
  const cleanedValue = value.replace(/,/g, "");
  return (
    DECIMAL_176_REGEX.test(value) &&
    cleanedValue.length <= 17 &&
    DECIMAL_CLEAN_REGEX.test(cleanedValue)
  );
};

/**
 * Validate a string as a decimal number with up to a given precision and scale.
 * The string can have commas as thousand separators.
 * @param value - The string to validate
 * @param precision - Maximum total number of digits
 * @param scale - Maximum number of decimal places
 * @returns true if the string is valid, false otherwise
 * @example checkDecimalSchema('1,234,567.89', 17, 6) => true

 */
export const checkDecimalSchema = (value: string, precision: number, scale: number): boolean => {
  // Empty string is valid
  if (!value) return true;

  // Remove commas from the string
  const cleanedValue = value.replace(/,/g, "");

  // Parse the cleaned string as a number
  const parsedValue = Number(cleanedValue);
  if (Number.isNaN(parsedValue)) {
    return false; // Invalid number
  }

  // Split into integer and fractional parts
  const [integerPart, fractionalPart = ""] = cleanedValue.split(".");

  // Total digits check: Integer part + fractional part
  const totalDigits = integerPart.length + fractionalPart.length;

  // Ensure the total number of digits does not exceed precision and decimal places don't exceed scale
  return totalDigits <= precision && fractionalPart.length <= scale;
};

export const getValueLabelOptions = (
  data: { label: string; value: string }[],
  value: string | null,
) => {
  if (!value) return "-";
  return data.find((item) => item.value === value)?.label;
};

export const downloadHelper = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
export const downloadHelperWithSaveAs = (file: File, fileName: string) => {
  saveAs(file, fileName);
};

export function updateOptions(uniqueOptions: SelectOptionTypes[], editOptions: SelectOptionTypes) {
  if (!editOptions || !editOptions.value) return uniqueOptions;
  const index = uniqueOptions.findIndex((item) => isEqual(editOptions.value, item.value));
  if (index !== -1) {
    const [firstItem] = uniqueOptions.splice(index, 1);
    uniqueOptions.unshift(firstItem);
  } else {
    uniqueOptions.unshift(editOptions);
  }
  return uniqueOptions;
}

type FormatCurrencyOptions = {
  decimalPlaces?: number;
  prefix?: string;
  suffix?: string;
};

export function formatCurrency(
  value: number | string,
  options: FormatCurrencyOptions = {},
): string {
  const { decimalPlaces = 2, prefix = "", suffix = "" } = options;

  const num = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(num)) return "";

  const formatted = num.toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `${prefix} ${formatted} ${suffix}`;
}

export const removeCommas = (value: string) => value.replace(/,/g, "");

export function getFirstNCharacters(str: string, n: number, maxCharacter: number = 2): string {
  const trimmedStr = str.trimStart();

  if (n <= 0) {
    return "";
  }

  const wordFirstNChars = trimmedStr.split(" ").map((word) => word.slice(0, n));

  const result = wordFirstNChars.join("");
  return result.slice(0, maxCharacter);
}

export function pluralize(word: string, count: number): string {
  return count === 1 ? word : `${word}s`;
}
