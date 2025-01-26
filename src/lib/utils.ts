import { theme } from "@/styles/theme";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getThemeClass(...classNames: (keyof typeof theme | string)[]) {
  return cn(
    classNames.map((name) => theme[name as keyof typeof theme] || name)
  );
}
