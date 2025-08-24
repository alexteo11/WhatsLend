import { z, ZodEffects, ZodObject, ZodRawShape } from "zod";
import {
  dateSchema,
  phoneNumberSchema,
  requiredStringSchema,
} from "./common.schema";
import { createLenderStaffSchema } from "./lenderStaff.schema";

export enum LenderStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
type MinMaxConfig<T> = {
  minKey: keyof T;
  maxKey: keyof T;
  path?: (keyof T)[];
  label?: string;
};

export function withMinMaxValidation<T extends ZodRawShape>(
  baseSchema: ZodObject<T>,
  configs: MinMaxConfig<z.infer<ZodObject<T>>>[],
): ZodEffects<ZodObject<T>> {
  let schema: ZodObject<T> | ZodEffects<ZodObject<T>> = baseSchema;

  for (const { minKey, maxKey, path, label } of configs) {
    schema = schema.refine(
      (data) => {
        const min = data[minKey];
        const max = data[maxKey];

        const bothDefined = min !== undefined && max !== undefined;
        const bothUndefined = min === undefined && max === undefined;

        if (!bothDefined && !bothUndefined) return false;
        if (bothDefined && min >= max) return false;

        return true;
      },
      {
        path: (path ?? [maxKey]) as string[],
        message: `Both ${label || `${String(minKey)} and ${String(maxKey)}`} must be defined and ${String(minKey)} < ${String(maxKey)}`,
      },
    ) as unknown as ZodEffects<ZodObject<T>>;
  }

  return schema as ZodEffects<ZodObject<T>>;
}

export const baseLenderSchema = {
  name: requiredStringSchema,
  address: requiredStringSchema,
  postalCode: requiredStringSchema,
  postalDistrict: requiredStringSchema,
  logoUrl: requiredStringSchema,
  businessRegistrationNumber: requiredStringSchema,
  referenceNumber: requiredStringSchema,
  licenseNumberAndYear: requiredStringSchema,
  licenseExpiryDate: z.coerce.date(),
  mobileNo: phoneNumberSchema,
  criteria: withMinMaxValidation(
    z.object({
      minLoanAmount: z.number().optional(),
      maxLoanAmount: z.number().optional(),
      minLoanTenure: z.number().optional(),
      maxLoanTenure: z.number().optional(),
      minBorrowerAge: z.number().optional(),
      maxBorrowerAge: z.number().optional(),
      borrowerMinMonthlyIncome: z.number().optional(),
      hasExistingLoan: z
        .union([z.string().optional(), z.boolean().optional()])
        .transform((value) => {
          if (typeof value === "undefined") {
            return undefined;
          }
          if (typeof value === "boolean") {
            return value;
          }
          if (value === "true") {
            return true;
          }
          return false;
        }),
    }),
    [
      {
        minKey: "minLoanAmount",
        maxKey: "maxLoanAmount",
        label: "loan amount",
      },
      {
        minKey: "minLoanTenure",
        maxKey: "maxLoanTenure",
        label: "loan tenure",
      },
      {
        minKey: "minBorrowerAge",
        maxKey: "maxBorrowerAge",
        label: "borrower age",
      },
    ],
  ),
};

export const createLenderSchema = z.object({
  ...baseLenderSchema,
  staffs: z.array(createLenderStaffSchema).min(1),
});

export const lenderSchema = z.object({
  ...baseLenderSchema,
  id: requiredStringSchema,
  createdAt: dateSchema,
  updatedAt: dateSchema,
  status: z.nativeEnum(LenderStatus),
  stillValid: z.boolean(),
});

export type CreateLender = z.infer<typeof createLenderSchema>;
export type Lender = z.infer<typeof lenderSchema>;
