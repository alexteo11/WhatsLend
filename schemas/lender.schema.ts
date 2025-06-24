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
  postalCode: requiredStringSchema,
  postalDistrict: requiredStringSchema,
  logoUrl: requiredStringSchema,
  businessRegistrationNumber: requiredStringSchema,
  referenceNumber: requiredStringSchema,
  licenseNumberAndYear: requiredStringSchema,
  licenseExpiryDate: z.coerce.date(),
  mobileNo: requiredStringSchema,
  // email: z.string().email(),
  // password: requiredStringSchema,
  criteria: z
    .object({
      minLoanAmount: requiredNumberSchema,
      maxLoanAmount: requiredNumberSchema,
      minLoanTenure: requiredNumberSchema,
      maxLoanTenure: requiredNumberSchema,
      minBorrowerAge: requiredNumberSchema,
      maxBorrowerAge: requiredNumberSchema,
      borrowerMinMonthlyIncome: requiredNumberSchema,
      hasExistingLoan: z
        .union([z.string().optional(), z.boolean().optional()])
        .transform((value) => {
          if (typeof value === "boolean") {
            return value;
          }
          if (value == "undefined") {
            return undefined;
          }
          if (value === "true") {
            return true;
          }
          return false;
        }),
    })
    .refine((data) => data.minLoanAmount < data.maxLoanAmount, {
      path: ["maxLoanAmount"],
      message: "Max loan amount must be greater than min loan amount",
    })
    .refine((data) => data.minLoanTenure < data.maxLoanTenure, {
      path: ["maxLoanTenure"],
      message: "Max loan tenure must be greater than min loan tenure",
    })
    .refine((data) => data.minBorrowerAge < data.maxBorrowerAge, {
      path: ["maxBorrowerAge"],
      message: "Max borrower age must be greater than min borrower age",
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
