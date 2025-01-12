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
  dob: dataSourceValuePairSchema<z.ZodDate>(requiredDateSchema),
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
export const formThreeDataSchema = z.object({
  hasExistingLoans: labeledDataSourceValuePairSchema<z.ZodBoolean>(z.boolean()),
  existingLoanFromBank:
    dataSourceValuePairSchema(requiredNumberSchema).optional(),
  existingLoanFromNonBank:
    dataSourceValuePairSchema(requiredNumberSchema).optional(),
  monthlyRepaymentToBank:
    dataSourceValuePairSchema(requiredNumberSchema).optional(),
  monthlyRepaymentToNonBank:
    dataSourceValuePairSchema(requiredNumberSchema).optional(),
  isContactingWithAgency: labeledDataSourceValuePairSchema<z.ZodBoolean>(
    z.boolean(),
  ),
});

export type FormOneData = z.infer<typeof formOneDataSchema>;
export type FormTwoData = z.infer<typeof formTwoDataSchema>;
export type FormThreeData = z.infer<typeof formThreeDataSchema>;
export type FormData = FormOneData & FormTwoData & FormThreeData;
