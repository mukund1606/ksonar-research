import { env } from "@/env";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const clientEncryption = (text: string) => {
  return CryptoJS.AES.encrypt(
    text,
    env.NEXT_PUBLIC_CLIENT_ENCRYPTION_SECRET,
  ).toString();
};

export const clientDecryption = (text: string) => {
  const bytes = CryptoJS.AES.decrypt(
    text,
    env.NEXT_PUBLIC_CLIENT_ENCRYPTION_SECRET,
  );
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const saltPassword = (text: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(text, salt);
  return {
    encryptedPassword: CryptoJS.AES.encrypt(
      hash,
      env.SERVER_ENCRYPTION_SECRET,
    ).toString(),
  };
};

export const serverDecrypt = (text: string) => {
  const bytes = CryptoJS.AES.decrypt(text, env.SERVER_ENCRYPTION_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const comparePassword = (text: string, hash: string) => {
  return bcrypt.compareSync(text, hash);
};
