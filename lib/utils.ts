// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(typeof date === "string" ? new Date(date) : date);
}

export function formatDateTime(date: string | Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(typeof date === "string" ? new Date(date) : date);
}

export function generateAvatarFallback(name: string) {
  return name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

export const getInitials = (name: string): string => name
  .split(" ")
  .map((word) => word.charAt(0).toUpperCase())
  .join("")
  .slice(0, 2);