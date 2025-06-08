import { z } from "zod";
import { dateSchema, requiredStringSchema } from "./common.schema";

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export const userSchema = z.object({
  id: requiredStringSchema,
  email: z.string().email(),
  password: requiredStringSchema,
  createdAt: dateSchema,
  updatedAt: dateSchema,
  status: z.nativeEnum(UserStatus),
  stillValid: z.boolean(),
});

export type User = z.infer<typeof userSchema>;
