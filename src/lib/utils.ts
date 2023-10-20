import { UserRole } from '@/types/membership'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const IsAdmin = (role: UserRole) => role === UserRole.ADMIN

export const IsAttendee = (role: UserRole) => role === UserRole.CONTRIBUTOR
