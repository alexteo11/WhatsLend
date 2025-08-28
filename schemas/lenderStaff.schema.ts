import { z } from "zod";
import { phoneNumberSchema, requiredStringSchema } from "./common.schema";

export enum LenderStaffPosition {
  MANAGER = "MANAGER",
  LOAN_OFFICER = "LOAN OFFICER",
}

export enum LenderStaffStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export const baseLenderStaffSchema = {
  name: requiredStringSchema,
  email: requiredStringSchema.email(),
  password: requiredStringSchema,
  mobileNo: phoneNumberSchema,
  position: z.nativeEnum(LenderStaffPosition),
};

export const lenderStaffSchema = z.object({
  ...baseLenderStaffSchema,
  id: requiredStringSchema,
  lenderId: requiredStringSchema,
  status: z.nativeEnum(LenderStaffStatus),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  stillValid: z.boolean(),
});

export const createLenderStaffSchema = z.object({
  ...baseLenderStaffSchema,
});

export const retrieveLenderStaffsSchema = z.object({
  status: z.nativeEnum(LenderStaffStatus).optional(),
});

export type CreateLenderStaff = z.infer<typeof createLenderStaffSchema>;
export type LenderStaff = z.infer<typeof lenderStaffSchema>;
