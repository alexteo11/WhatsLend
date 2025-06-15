import { z } from "zod";
import {
  dateSchema,
  requiredNumberSchema,
  requiredStringSchema,
} from "./common.schema";

export enum LenderStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

const baseLenderSchema = {
  name: requiredStringSchema,
  address: requiredStringSchema,
  logoUrl: requiredStringSchema,
  businessRegistrationNumber: requiredStringSchema,
  referenceNumber: requiredStringSchema,
  licenseNumberAndYear: requiredStringSchema,
  licenseExpiryDate: z.coerce.date(),
  mobileNo: requiredStringSchema,
  email: z.string().email(),
  // password: requiredStringSchema,
  criteria: z.object({
    minLoanAmount: requiredNumberSchema,
    maxLoanAmount: requiredNumberSchema,
    minLoanTenure: requiredNumberSchema,
    maxLoanTenure: requiredNumberSchema,
    hasExistingLoan: z.union([z.boolean(), z.literal(-1)]),
  }),
};

export const lenderSchema = z.object({
  ...baseLenderSchema,
  id: requiredStringSchema,
  createdAt: dateSchema,
  updatedAt: dateSchema,
  status: z.nativeEnum(LenderStatus),
  stillValid: z.boolean(),
});

export type Lender = z.infer<typeof lenderSchema>;
