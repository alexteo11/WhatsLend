import { SOURCES_ENUM } from "@/schemas/common.schema";
import { FormOneData, FormThreeData, FormTwoData } from "@/schemas/form.schema";
import { DefaultValues } from "react-hook-form";
import { YES_NO_OPTIONS } from "./formEnums";

const source = SOURCES_ENUM.MANUAL;

export const formOneDefaultValues: DefaultValues<FormOneData> = {
  personalDetails: {
    fullName: {
      source,
    },
    uinfin: {
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
    monthlyIncome: {
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
    hdbType: {
      source,
    },
    country: {
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
