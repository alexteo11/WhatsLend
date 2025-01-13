import { z } from "zod";
import { requiredStringSchema } from "./common.schema";

enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  LENDER = "LENDER",
}

enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export const signUpReqSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string({ required_error: "Field is required" })
      .trim()
      .min(1, "Field is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: requiredStringSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

export const loginReqSchema = z.object({
  email: z.string().email(),
  password: requiredStringSchema,
});

export const forgotPasswordReqSchema = z.object({ email: z.string().email() });

export const firebaseUser = z.object({
  uid: z.string(),
  email: z.string().email(),
});

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  role: z.nativeEnum(UserRole),
  status: z.nativeEnum(UserStatus),
  createdAt: z.coerce.date(),
});

export type SignUpReq = z.infer<typeof signUpReqSchema>;
export type LoginReq = z.infer<typeof loginReqSchema>;
export type ForgotPasswordReq = z.infer<typeof forgotPasswordReqSchema>;
export type User = z.infer<typeof userSchema>;
