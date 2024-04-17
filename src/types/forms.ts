import { z } from "zod";

export const ChangePasswordFormSchema = z.object({
  oldPassword: z.string().min(8, { message: "Old Password is Required." }),
  password: z.string().min(8, { message: "Password is Required." }),
});

export const LoginFormSchema = z.object({
  username: z.string().min(3, { message: "Username is Required." }),
  password: z.string().min(8, { message: "Password is Required." }),
});

export const RequestReportSchema = z.object({
  name: z.string().min(1, { message: "Name is Required." }),
  email: z.string().email({ message: "Email is Required." }),
  country: z.string().min(1, { message: "Country is Required." }),
  number: z.string().min(1, { message: "Phone Number is Required." }),
  company: z.string().min(1, { message: "Company Name is Required." }),
  job: z.string(),
  custom: z.string(),
  message: z.string().min(1, { message: "Message is Required." }),
});

export const IndustrySchema = z.enum(
  [
    "Industrial and Manufacturing",
    "Material and Chemicals",
    "Technology and Electronics",
    "Healthcare and Life Sciences",
    "Consumer and Goods Services",
    "Energy and Utilities",
    "Infrastructure and Construction",
    "Automotive and Transportation",
    "Agriculture and Food Industry",
    "Aerospace and Defense",
  ],
  {
    required_error: "Industry is Required.",
  },
);

export const CreateReportFormSchema = z.object({
  title: z.string().min(3, { message: "Title is Required." }),
  description: z.string().min(8, { message: "Description is Required." }),
  industry: IndustrySchema,
  fileUrl: z.string().min(1, { message: "File is Required." }),
  fileId: z.string().min(1, { message: "File is Required." }),
  isTopReport: z.boolean(),
});
