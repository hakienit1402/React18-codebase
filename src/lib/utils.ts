import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names with Tailwind conflict resolution.
 *
 * Combines `clsx` (conditional class composition) with `tailwind-merge`
 * (intelligently resolves conflicting Tailwind utilities).
 *
 * @example
 * cn('px-2 py-2', condition && 'px-4') // => 'py-2 px-4'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
