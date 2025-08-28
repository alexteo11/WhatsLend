import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

export enum SOURCES_ENUM {
  SINGPASS = "SINGPASS",
  MANUAL = "MANUAL",
}

export const booleanSchema = z
  .union([z.boolean(), z.literal("true"), z.literal("false")])
  .transform((value) => {
    if (value === "true") {
      return true;
    }

    if (value === "false") {
      return false;
    }

    return !!value;
  });

export const requiredStringSchema = z
  .string({ required_error: "Field is required." })
  .trim()
  .min(1, "Field is required.");

export const requiredNumberSchema = z
  .union([z.string().trim().min(1, "Field is required."), z.number()], {
    required_error: "Field is required.",
  })
  .transform((value) => Number(value));

export const dateSchema = z.coerce.date({
  required_error: "Field is required.",
});

export const phoneNumberSchema = z
  .string()
  .refine(isValidPhoneNumber, { message: "Invalid phone number" });

export const dataSourceValuePairSchema = <T extends z.ZodType = z.ZodString>(
  zodType: z.ZodType = requiredStringSchema,
  optional: boolean = false,
) => {
  return z.object({
    value: optional ? z.optional(zodType as T) : (zodType as T),
    source: z.nativeEnum(SOURCES_ENUM),
  });
};

export const optionalDataSourceValuePairSchema = <
  T extends z.ZodType = z.ZodString,
>(
  zodType: z.ZodType = requiredStringSchema,
) => {
  return z.object({
    value: z.optional(zodType as T),
    source: z.nativeEnum(SOURCES_ENUM),
  });
};

export const labeledDataSourceValuePairSchema = <
  T extends z.ZodType = z.ZodString,
>(
  zodType: z.ZodSchema = requiredStringSchema,
  optional: boolean = false,
) => {
  return z.object({
    value: optional ? z.optional(zodType as T) : (zodType as T),
    label: optional ? z.string().optional() : requiredStringSchema,
    source: z.nativeEnum(SOURCES_ENUM),
  });
};

export const optionalLabeledDataSourceValuePairSchema = <
  T extends z.ZodType = z.ZodString,
>(
  zodType: z.ZodSchema = requiredStringSchema,
) => {
  return z.object({
    value: z.optional(zodType as T),
    label: z.string().optional(),
    source: z.nativeEnum(SOURCES_ENUM),
  });
};
