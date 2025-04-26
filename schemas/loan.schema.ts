import { z } from "zod";
import {
  booleanSchema,
  dataSourceValuePairSchema,
  dateSchema,
  labeledDataSourceValuePairSchema,
  LOAN_STATUS_ENUM,
  optionalDataSourceValuePairSchema,
  requiredNumberSchema,
} from "./common.schema";
import { isValidPhoneNumber } from "react-phone-number-input";

// personal details
export const personalDetailsSchema = z.object({
  uinfin: dataSourceValuePairSchema(),
  fullName: dataSourceValuePairSchema(),
  sex: labeledDataSourceValuePairSchema(),
  nationality: labeledDataSourceValuePairSchema(),
  dob: dataSourceValuePairSchema<z.ZodDate>(dateSchema),
  race: labeledDataSourceValuePairSchema(),
  birthCountry: labeledDataSourceValuePairSchema(),
  residentialStatus: labeledDataSourceValuePairSchema(),
  passType: labeledDataSourceValuePairSchema(),
  passStatus: dataSourceValuePairSchema(),
  passExpiryDate: dataSourceValuePairSchema<z.ZodDate>(dateSchema),
  maritalStatus: labeledDataSourceValuePairSchema(),
});

export const contactDetailsSchema = z.object({
  email: dataSourceValuePairSchema(z.string().email()),
  mobileNo: dataSourceValuePairSchema(
    z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  ),
});

export const employmentDetailsSchema = z.object({
  occupation: dataSourceValuePairSchema(),
  employmentStatus: labeledDataSourceValuePairSchema(),
  monthlyIncome: dataSourceValuePairSchema<z.ZodNumber>(requiredNumberSchema),
  employerName: dataSourceValuePairSchema(),
  employmentSector: dataSourceValuePairSchema(),
  timeAtCurrentEmployer: labeledDataSourceValuePairSchema(),
  timeAtPreviousEmployer: labeledDataSourceValuePairSchema(),
});

const hdbOwnershipSchema = z.object({
  monthlyLoanInstalment:
    dataSourceValuePairSchema<z.ZodNumber>(requiredNumberSchema),
  hdbType: labeledDataSourceValuePairSchema(),
  dateOfPurchase: dataSourceValuePairSchema(),
});

export const housingDetailsSchema = z.object({
  address: dataSourceValuePairSchema(),
  unitNo: dataSourceValuePairSchema(),
  postalCode: dataSourceValuePairSchema(),
  country: labeledDataSourceValuePairSchema(),
  housingType: labeledDataSourceValuePairSchema(),
  hdbType: labeledDataSourceValuePairSchema(),
  hdbOwnership: z.array(hdbOwnershipSchema),
});

const cpfContributionsSchema = z.object({
  month: dataSourceValuePairSchema(),
  employer: dataSourceValuePairSchema(),
  date: dataSourceValuePairSchema(),
  amount: dataSourceValuePairSchema<z.ZodNumber>(requiredNumberSchema),
});

const cpfHousingWithdrawalSchema = z.object({
  accruedInterestAmount:
    dataSourceValuePairSchema<z.ZodNumber>(requiredNumberSchema),
  principalWithdrawalAmount:
    dataSourceValuePairSchema<z.ZodNumber>(requiredNumberSchema),
  totalAmountOfCpfAllowedForProperty:
    dataSourceValuePairSchema<z.ZodNumber>(requiredNumberSchema),
  monthlyInstalmentAmount:
    dataSourceValuePairSchema<z.ZodNumber>(requiredNumberSchema),
  address: dataSourceValuePairSchema(),
  unitNo: dataSourceValuePairSchema(),
  postalCode: dataSourceValuePairSchema(),
  country: labeledDataSourceValuePairSchema(),
});

const noaHistorySchema = z.object({
  rent: dataSourceValuePairSchema<z.ZodNumber>(requiredNumberSchema),
  taxClearance: dataSourceValuePairSchema(),
  yearOfAssessment: dataSourceValuePairSchema(),
  interest: dataSourceValuePairSchema<z.ZodNumber>(requiredNumberSchema),
  employment: dataSourceValuePairSchema<z.ZodNumber>(requiredNumberSchema),
  trade: dataSourceValuePairSchema<z.ZodNumber>(requiredNumberSchema),
  amount: dataSourceValuePairSchema<z.ZodNumber>(requiredNumberSchema),
  category: dataSourceValuePairSchema(),
});

export const cpfDetailsSchema = z
  .object({
    cpfContributions: z.array(cpfContributionsSchema).catch([]),
    cpfHousingWithdrawal: z.array(cpfHousingWithdrawalSchema).catch([]),
    noaHistory: z.array(noaHistorySchema).catch([]),
  })
  .catch({
    cpfContributions: [],
    cpfHousingWithdrawal: [],
    noaHistory: [],
  });

const vehicleEffectiveOwnershipSchema = z.object({
  effectiveOwnership: dataSourceValuePairSchema(),
});

export const vehicleDetailsSchema = z
  .array(vehicleEffectiveOwnershipSchema)
  .catch([]);

export const loanDetailsSchema = z.object({
  loanAmount: dataSourceValuePairSchema<z.ZodNumber>(requiredNumberSchema),
  loanTenure: dataSourceValuePairSchema<z.ZodNumber>(requiredNumberSchema),
  loanPurpose: dataSourceValuePairSchema(),
});

export const existingLoanDetailsSchema = z
  .object({
    isContactingWithAgency:
      labeledDataSourceValuePairSchema<typeof booleanSchema>(booleanSchema),
    hasExistingLoans:
      labeledDataSourceValuePairSchema<typeof booleanSchema>(booleanSchema),
    existingLoanFromBank:
      optionalDataSourceValuePairSchema(requiredNumberSchema),
    existingLoanFromNonBank:
      optionalDataSourceValuePairSchema(requiredNumberSchema),
    monthlyRepaymentToBank:
      optionalDataSourceValuePairSchema(requiredNumberSchema),
    monthlyRepaymentToNonBank:
      optionalDataSourceValuePairSchema(requiredNumberSchema),
  })
  .superRefine((data, ctx) => {
    if (data.hasExistingLoans.value) {
      if (!data.existingLoanFromBank.value) {
        ctx.addIssue({
          code: "custom",
          message: "Field is required",
          path: ["existingLoanFromBank.value"],
        });
      }

      if (!data.existingLoanFromNonBank.value) {
        ctx.addIssue({
          code: "custom",
          message: "Field is required",
          path: ["existingLoanFromNonBank.value"],
        });
      }

      if (!data.monthlyRepaymentToBank.value) {
        ctx.addIssue({
          code: "custom",
          message: "Field is required",
          path: ["monthlyRepaymentToBank.value"],
        });
      }

      if (!data.monthlyRepaymentToNonBank.value) {
        ctx.addIssue({
          code: "custom",
          message: "Field is required",
          path: ["monthlyRepaymentToNonBank.value"],
        });
      }
    }

    return z.NEVER;
  });

export const loanApplicationPayloadSchema = z.object({
  personalDetails: personalDetailsSchema,
  contactDetails: contactDetailsSchema,
  employmentDetails: employmentDetailsSchema,
  housingDetails: housingDetailsSchema,
  cpfDetails: cpfDetailsSchema,
  vehicleDetails: vehicleDetailsSchema,
  loanDetails: loanDetailsSchema,
  existingLoanDetails: existingLoanDetailsSchema,
});

export const loanSchema = z
  .object({
    id: z.string(),
    userId: z.string(),
    status: z.nativeEnum(LOAN_STATUS_ENUM),
    createdAt: dateSchema,
    updatedAt: dateSchema,
    stillValid: z.boolean(),
  })
  .and(loanApplicationPayloadSchema);

export const submitLoanPayloadSchema = z.object({
  userId: z.string().optional(),
  applicationPayload: loanApplicationPayloadSchema,
});

export type LoanApplicationPayload = z.infer<
  typeof loanApplicationPayloadSchema
>;
export type SubmitLoanPayload = z.infer<typeof submitLoanPayloadSchema>;
export type LoanData = z.infer<typeof loanSchema>;
