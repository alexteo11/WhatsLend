import { z } from "zod";
import {
  booleanSchema,
  dataSourceValuePairSchema,
  labeledDataSourceValuePairSchema,
  requiredDateSchema,
  requiredNumberSchema,
} from "./common.schema";
import { isValidPhoneNumber } from "react-phone-number-input";

/**
 * FORM 1
 */
export const loanDetailsSchema = z.object({
  loanAmount: dataSourceValuePairSchema<z.ZodNumber>(requiredNumberSchema),
  loanTenure: dataSourceValuePairSchema<z.ZodNumber>(requiredNumberSchema),
  loanPurpose: dataSourceValuePairSchema(),
});

export const generalInformationSchema = z.object({
  fullName: dataSourceValuePairSchema(),
  dob: dataSourceValuePairSchema<z.ZodDate | z.ZodString>(requiredDateSchema),
  residencyStatus: labeledDataSourceValuePairSchema(),
  nationality: labeledDataSourceValuePairSchema(),
});

export const contactDetailsSchema = z.object({
  email: dataSourceValuePairSchema(z.string().email()),
  mobileNo: dataSourceValuePairSchema(
    z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  ),
});

export const incomeDetailsSchema = z.object({
  employmentStatus: labeledDataSourceValuePairSchema(),
  monthlyIncome: dataSourceValuePairSchema<z.ZodNumber>(requiredNumberSchema),
});

export const formOneDataSchema = z.object({
  loanDetails: loanDetailsSchema,
  generalInformation: generalInformationSchema,
  contactDetails: contactDetailsSchema,
  incomeDetails: incomeDetailsSchema,
});

/**
 * Form 2
 */
export const personalDetailsSchema = z.object({
  uinfin: dataSourceValuePairSchema(),
  civilStatus: labeledDataSourceValuePairSchema(),
});

export const employmentDetailsSchema = z.object({
  jobTitle: labeledDataSourceValuePairSchema(),
  jobIndustry: labeledDataSourceValuePairSchema(),
  timeAtCurrentEmployer: labeledDataSourceValuePairSchema(),
  timeAtPreviousEmployer: labeledDataSourceValuePairSchema(),
});

export const housingDetailsSchema = z.object({
  address: dataSourceValuePairSchema(),
  unitNo: dataSourceValuePairSchema(),
  postalCode: dataSourceValuePairSchema(),
  country: labeledDataSourceValuePairSchema(),
  typeOfHousing: labeledDataSourceValuePairSchema(),
  housingStatus: labeledDataSourceValuePairSchema(),
  housingPeriod: labeledDataSourceValuePairSchema(),
  hasProperty:
    labeledDataSourceValuePairSchema<typeof booleanSchema>(booleanSchema),
});

export const formTwoDataSchema = z.object({
  personalDetails: personalDetailsSchema,
  employmentDetails: employmentDetailsSchema,
  housingDetails: housingDetailsSchema,
});

/**
 * FORM 3
 */
export const formThreeDataSchema = z
  .object({
    isContactingWithAgency:
      labeledDataSourceValuePairSchema<typeof booleanSchema>(booleanSchema),
    hasExistingLoans:
      labeledDataSourceValuePairSchema<typeof booleanSchema>(booleanSchema),
    existingLoanFromBank: dataSourceValuePairSchema(requiredNumberSchema, true),
    existingLoanFromNonBank: dataSourceValuePairSchema(
      requiredNumberSchema,
      true,
    ),
    monthlyRepaymentToBank: dataSourceValuePairSchema(
      requiredNumberSchema,
      true,
    ),
    monthlyRepaymentToNonBank: dataSourceValuePairSchema(
      requiredNumberSchema,
      true,
    ),
  })
  .superRefine((data, ctx) => {
    if (data.hasExistingLoans.value) {
      if (!data.existingLoanFromBank.value) {
        ctx.addIssue({
          code: "custom",
          message: "Field is required1",
          path: ["existingLoanFromBank.value"],
        });
      }

      if (!data.existingLoanFromNonBank.value) {
        ctx.addIssue({
          code: "custom",
          message: "Field is required2",
          path: ["existingLoanFromNonBank.value"],
        });
      }

      if (!data.monthlyRepaymentToBank.value) {
        ctx.addIssue({
          code: "custom",
          message: "Field is required3",
          path: ["monthlyRepaymentToBank.value"],
        });
      }

      if (!data.monthlyRepaymentToNonBank.value) {
        ctx.addIssue({
          code: "custom",
          message: "Field is required4",
          path: ["monthlyRepaymentToNonBank.value"],
        });
      }
    }

    return z.NEVER;
  });

export type FormOneData = z.infer<typeof formOneDataSchema>;
export type FormTwoData = z.infer<typeof formTwoDataSchema>;
export type FormThreeData = z.infer<typeof formThreeDataSchema>;
export type FormData = FormOneData & FormTwoData & FormThreeData;
