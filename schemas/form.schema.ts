import { z } from "zod";
import {
  contactDetailsSchema,
  cpfDetailsSchema,
  employmentDetailsSchema,
  existingLoanDetailsSchema,
  housingDetailsSchema,
  loanDetailsSchema,
  personalDetailsSchema,
  vehicleDetailsSchema,
} from "./loan.schema";

export const formOneDataSchema = z.object({
  personalDetails: personalDetailsSchema,
  contactDetails: contactDetailsSchema,
  loanDetails: loanDetailsSchema,
});

export const formTwoDataSchema = z.object({
  employmentDetails: employmentDetailsSchema,
  housingDetails: housingDetailsSchema,
});

export const formThreeDataSchema = z.object({
  existingLoanDetails: existingLoanDetailsSchema,
});

export const additionalSingpassDataSchema = z.object({
  cpfDetails: cpfDetailsSchema,
  vehicleDetails: vehicleDetailsSchema,
});

export type FormOneData = z.infer<typeof formOneDataSchema>;
export type FormTwoData = z.infer<typeof formTwoDataSchema>;
export type FormThreeData = z.infer<typeof formThreeDataSchema>;
export type AdditionalSingpassData = z.infer<
  typeof additionalSingpassDataSchema
>;
export type FormData = FormOneData &
  FormTwoData &
  FormThreeData &
  AdditionalSingpassData;
