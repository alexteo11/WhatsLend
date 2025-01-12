import { SOURCES_ENUM } from "@/schemas/common.schema";
import { FormOneData, FormThreeData, FormTwoData } from "@/schemas/form.schema";
import { DefaultValues } from "react-hook-form";

const source = SOURCES_ENUM.MANUAL;

export const formOneDefaultValues: DefaultValues<FormOneData> = {
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
  generalInformation: {
    fullName: {
      source,
    },
    dob: {
      source,
    },
    residencyStatus: {
      source,
    },
    nationality: {
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
  incomeDetails: {
    employmentStatus: {
      source,
    },
    monthlyIncome: {
      source,
    },
  },
};

export const formTwoDefaultValues: DefaultValues<FormTwoData> = {
  personalDetails: {
    uinfin: {
      source,
    },
    civilStatus: {
      source,
    },
  },
  employmentDetails: {
    jobTitle: {
      source,
    },
    jobIndustry: {
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
    country: {
      source,
    },
    typeOfHousing: {
      source,
    },
    housingStatus: {
      source,
    },
    housingPeriod: {
      source,
    },
    hasProperty: {
      value: true,
      source,
    },
  },
};

export const formThreeDefaultValues: DefaultValues<FormThreeData> = {
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
  isContactingWithAgency: {
    source,
  },
};
