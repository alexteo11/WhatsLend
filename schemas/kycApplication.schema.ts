import { z } from "zod";
import {
  dataSourceValuePairSchema,
  labeledDataSourceValuePairSchema,
  requiredNumberSchema,
} from "./common.schema";

export const personalInfoSchema = z.object({
  uinfin: dataSourceValuePairSchema(),
  name: dataSourceValuePairSchema(),
  sex: labeledDataSourceValuePairSchema(),
  nationality: labeledDataSourceValuePairSchema(),
  dob: dataSourceValuePairSchema(),
  race: labeledDataSourceValuePairSchema(),
  placeOfBirth: labeledDataSourceValuePairSchema(),
  registeredAddress: dataSourceValuePairSchema(),
  residentialStatus: labeledDataSourceValuePairSchema(),
  housingType: labeledDataSourceValuePairSchema(requiredNumberSchema),
  hdbType: labeledDataSourceValuePairSchema(requiredNumberSchema),
  passType: labeledDataSourceValuePairSchema(),
  passStatus: labeledDataSourceValuePairSchema(),
  passExpiryDate: dataSourceValuePairSchema(),
  maritalStatus: labeledDataSourceValuePairSchema(requiredNumberSchema),
});

export const contactInfoSchema = z.object({
  email: dataSourceValuePairSchema(),
  mobileNo: dataSourceValuePairSchema(),
  homeContactNo: dataSourceValuePairSchema(),
});

export const employmentDetailsSchema = z.object({
  employerName: dataSourceValuePairSchema(),
  occupation: dataSourceValuePairSchema(),
  employmentSector: dataSourceValuePairSchema(),
  householdIncome: dataSourceValuePairSchema(requiredNumberSchema),
});

export const propertyInfoSchema = z.object({
  outStandingHDBLoanBalance: dataSourceValuePairSchema(requiredNumberSchema),
  monthlyLoanInstallment: dataSourceValuePairSchema(requiredNumberSchema),
  dwellingHDBType: labeledDataSourceValuePairSchema(requiredNumberSchema),
  dateOfPurchase: dataSourceValuePairSchema(),
});

export const financialInfoSchema = z.object({
  cpfContributionsHistory: dataSourceValuePairSchema(requiredNumberSchema),
  cpfHousingWithdrawal: dataSourceValuePairSchema(requiredNumberSchema),
  noaHistory: dataSourceValuePairSchema(requiredNumberSchema),
});

export const vehicleInfoSchema = z.object({
  effectiveOwnership: dataSourceValuePairSchema(),
});

export const kycApplicationSchema = z.object({
  personalInfo: personalInfoSchema,
  contactInfo: contactInfoSchema,
  employmentDetails: employmentDetailsSchema,
  propertyInfo: propertyInfoSchema,
  financialInfo: financialInfoSchema,
  vehicleInfo: vehicleInfoSchema,
});
