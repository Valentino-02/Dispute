import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// To write dynamic classNames
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
