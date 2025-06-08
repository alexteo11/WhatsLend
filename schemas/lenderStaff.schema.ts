import { z } from "zod";
import { requiredStringSchema } from "./common.schema";

export enum LenderStaffPosition {
  MANAGER = "MANAGER",
  EMPLOYEE = "EMPLOYEE",
}

export enum LenderStaffStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export const baseLenderStaffSchema = {
  lenderId: requiredStringSchema,
  name: requiredStringSchema,
  email: requiredStringSchema,
  password: requiredStringSchema,
  mobileNo: requiredStringSchema,
  position: z.nativeEnum(LenderStaffPosition),
};

export const lenderStaffSchema = z.object({
  ...baseLenderStaffSchema,
  id: requiredStringSchema,
  position: z.nativeEnum(LenderStaffPosition),
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

export type LenderStaff = z.infer<typeof lenderStaffSchema>;
