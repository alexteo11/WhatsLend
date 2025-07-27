import { SOURCES_ENUM } from "@/schemas/common.schema";
import { FormOneData, FormThreeData, FormTwoData } from "@/schemas/form.schema";
import { DefaultValues } from "react-hook-form";

const source = SOURCES_ENUM.MANUAL;

export const formOneDefaultValues: DefaultValues<FormOneData> = {
  personalDetails: {
    fullName: {
      source,
    },
    uinfin: {
      source,
    },
    idType: {
      source,
    },
    dob: {
      source,
    },
    birthCountry: {
      source,
    },
    sex: {
      source,
    },
    passType: {
      source,
    },
    passStatus: {
      source,
    },
    passExpiryDate: {
      source,
    },
    race: {
      source,
    },
    nationality: {
      source,
    },
    residentialStatus: {
      source,
    },
    maritalStatus: {
      source,
    },
  },
  contactDetails: {
    email: {
      source,
    },
    mobileNo: {
      source,
    },
  },
  loanDetails: {
    loanAmount: {
      source,
    },
    loanTenure: {
      source,
    },
    loanPurpose: {
      source,
    },
  },
};

export const formTwoDefaultValues: DefaultValues<FormTwoData> = {
  employmentDetails: {
    occupation: {
      source,
    },
    employmentStatus: {
      source,
    },
    monthlyIncome1: {
      source,
    },
    monthlyIncome2: {
      source,
    },
    monthlyIncome3: {
      source,
    },
    totalMonthlyIncome: {
      source,
    },
    employerName: {
      source,
    },
    employmentSector: {
      source,
    },
    timeAtCurrentEmployer: {
      source,
    },
    timeAtPreviousEmployer: {
      source,
    },
    officeAddress: {
      source,
    },
    officeUnitNo: {
      source,
    },
    officePostalCode: {
      source,
    },
  },
  housingDetails: {
    address: {
      source,
    },
    unitNo: {
      source,
    },
    postalCode: {
      source,
    },
    housingType: {
      source,
    },
    housingStatus: {
      source,
    },
    hdbType: {
      source,
    },
    country: {
      source,
    },
    hasOwnPrivateProperty: {
      value: false,
      source,
    },
  },
};

export const formThreeDefaultValues: DefaultValues<FormThreeData> = {
  existingLoanDetails: {
    isContactingWithAgency: {
      source,
    },
    hasExistingLoans: {
      source,
    },
    existingLoanFromBank: {
      source,
    },
    existingLoanFromNonBank: {
      source,
    },
    monthlyRepaymentToBank: {
      source,
    },
    monthlyRepaymentToNonBank: {
      source,
    },
  },
};
