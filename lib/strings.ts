import { clsx, type ClassValue } from "clsx";
import { camelCase, startCase } from "lodash";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const titleCase = (str: string) => startCase(camelCase(str));
