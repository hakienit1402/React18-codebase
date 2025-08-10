import Cookies from "js-cookie";

// Define types for cookie options
interface CookieAttributes {
  path?: string;
  expires?: number | Date;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
  domain?: string;
}

// Default cookie configuration
const defaultAttributes: CookieAttributes = {
  path: "/",
  sameSite: "Strict",
  secure: window.location.protocol === "https:",
};

// Secure cookie configuration for sensitive data
const secureAttributes: CookieAttributes = {
  path: "/",
  sameSite: "Strict",
  secure: true,
  expires: 1, // 1 day expiration for security tokens
};
// Create configured cookie instance
const cookies = Cookies.withAttributes(defaultAttributes);
// Type-safe cookie functions
export const setCookie = (
  name: string,
  value: string,
  options: CookieAttributes = {},
): void => {
  cookies.set(name, value, options);
};
export const getCookie = (name: string): string | undefined => {
  return cookies.get(name);
};
export const removeCookie = (
  name: string,
  options: CookieAttributes = {},
): void => {
  cookies.remove(name, options);
};

// Secure cookie functions for sensitive data like tokens
export const setSecureCookie = (
  name: string,
  value: string,
  options: CookieAttributes = {},
): void => {
  const mergedOptions = { ...secureAttributes, ...options };
  cookies.set(name, value, mergedOptions);
};

export const removeSecureCookie = (name: string): void => {
  cookies.remove(name, secureAttributes);
};

export { cookies };
