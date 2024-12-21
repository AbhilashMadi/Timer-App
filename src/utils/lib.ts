import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines `clsx` for conditional class handling with `tailwind-merge` to resolve conflicting Tailwind CSS classes.
 * Ensures clean, dynamic, conflict-free styling by removing duplicate or unnecessary classes during compilation.
 */
export function tw(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
