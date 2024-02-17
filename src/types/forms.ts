import { z } from "zod";

export const ChangePasswordFormSchema = z.object({
  oldPassword: z.string().min(8, { message: "Old Password is Required." }),
  password: z.string().min(8, { message: "Password is Required." }),
});

export const LoginFormSchema = z.object({
  username: z.string().min(3, { message: "Username is Required." }),
  password: z.string().min(8, { message: "Password is Required." }),
});

const Insudtry = z.enum(["Food", "ISO", "LED", "Beverage"], {
  required_error: "Industry is Required.",
});

export const CreateReportFormSchema = z.object({
  title: z.string().min(3, { message: "Title is Required." }),
  description: z.string().min(8, { message: "Description is Required." }),
  industry: Insudtry,
  fileUrl: z.string().min(1, { message: "File is Required." }),
  fileId: z.string().min(1, { message: "File is Required." }),
  isTopReport: z.boolean(),
});
