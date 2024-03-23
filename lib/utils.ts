import { type Comment as CommentType } from "@/client/requests";
import { clsx, type ClassValue } from "clsx";
import { camelCase, startCase } from "lodash";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const titleCase = (str: string) => startCase(camelCase(str));

export const childrenAfterTheirParent = (a: CommentType, b: CommentType) => {
  if (a.parent_id === null && b.parent_id === null) {
    return a.id - b.id;
  } else if (a.parent_id === null) {
    return -1;
  } else if (b.parent_id === null) {
    return 1;
  } else {
    return a.id - b.id;
  }
};
