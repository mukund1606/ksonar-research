import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { UTApi } from "uploadthing/server";

export const utapi = new UTApi();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
