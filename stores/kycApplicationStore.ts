import {
  HDB_TYPE_OPTIONS,
  HOUSING_TYPE_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  NATIONALITY_OPTIONS,
  PASS_STATUS_OPTIONS,
  PASS_TYPE_OPTIONS,
  RACE_OPTIONS,
  RESIDENTIAL_STATUS_OPTIONS,
} from "@/constants/formEnums";
import { KycApplication, KycApplicationStore } from "@/interfaces";
// import { SOURCES_ENUM } from "@/schemas/kycApplication.schema";
// import { countries, TCountries, TCountryCode } from "countries-list";
// import { produce } from "immer";
import { useForm, UseFormReturn } from "react-hook-form";
import { create } from "zustand";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  kycApplicationSchema,
  SOURCES_ENUM,
} from "@/schemas/kycApplication.schema";
// import { useEffect, useState } from "react";

export const useKycApplicationStore = create<KycApplicationStore>(
  (set, get) => {
    return {
      form: undefined,
      setForm: (form) => set({ form }),
      formData: {} as KycApplication,
      setFormData: (data: KycApplication) => {
        const { form } = get();
        form?.reset(data);
      },
      // submitKycApplication: async () => {
      //   const { formData } = get();
      //   console.log("submitting kyc application");
      //   await new Promise((resolve) => setTimeout(resolve, 1000));
      //   console.log("form", formData);
      // },
    };
  },
);

// export const useKycApplicationStore = create<KycApplicationStore>(
//   (set, get) => ({
//     form: {
//       personalInfo: {
// uinfin: { value: "", source: SOURCES_ENUM.MANUAL },
// name: { value: "", source: SOURCES_ENUM.MANUAL },
// sex: { value: "F", label: "Female", source: SOURCES_ENUM.MANUAL },
// nationality: {
//   value: "SG",
//   label: "SINGAPORE CITIZEN",
//   source: SOURCES_ENUM.MANUAL,
// },
// dob: { value: "", source: SOURCES_ENUM.MANUAL },
// race: { value: "CN", label: "CHINESE", source: SOURCES_ENUM.MANUAL },
// placeOfBirth: {
//   value: "SG",
//   label: "SINGAPORE",
//   source: SOURCES_ENUM.MANUAL,
// },
// registeredAddress: { value: "", source: SOURCES_ENUM.MANUAL },
// residentialStatus: {
//   value: "C",
//   label: "CITIZEN",
//   source: SOURCES_ENUM.MANUAL,
// },
// housingType: {
//   value: 121,
//   label: "DETACHED HOUSE",
//   source: SOURCES_ENUM.MANUAL,
// },
// hdbType: {
//   value: 111,
//   label: "1-ROOM FLAT (HDB)",
//   source: SOURCES_ENUM.MANUAL,
// },
// passType: {
//   value: "",
//   label: "",
//   source: SOURCES_ENUM.MANUAL,
// },
// passStatus: {
//   value: "Live",
//   label: "Live",
//   source: SOURCES_ENUM.MANUAL,
// },
// passExpiryDate: {
//   value: "",
//   source: SOURCES_ENUM.MANUAL,
// },
// maritalStatus: {
//   value: 1,
//   label: "SINGLE",
//   source: SOURCES_ENUM.MANUAL,
// },
//       },
// contactInfo: {
//   email: { value: "", source: SOURCES_ENUM.MANUAL },
//   mobileNo: { value: "", source: SOURCES_ENUM.MANUAL },
//   homeContactNo: { value: "", source: SOURCES_ENUM.MANUAL },
// },
// employmentDetails: {
//   employerName: { value: "", source: SOURCES_ENUM.MANUAL },
//   occupation: { value: "", source: SOURCES_ENUM.MANUAL },
//   employmentSector: { value: "", source: SOURCES_ENUM.MANUAL },
//   householdIncome: { value: 0, source: SOURCES_ENUM.MANUAL },
// },
// propertyInfo: {
//   outStandingHDBLoanBalance: { value: 0, source: SOURCES_ENUM.MANUAL },
//   monthlyLoanInstallment: { value: 0, source: SOURCES_ENUM.MANUAL },
//   dwellingHDBType: {
//     value: 111,
//     label: "1-ROOM FLAT (HDB)",
//     source: SOURCES_ENUM.MANUAL,
//   },
//   dateOfPurchase: { value: "", source: SOURCES_ENUM.MANUAL },
// },
// financialInfo: {
//   cpfContributionsHistory: { value: 0, source: SOURCES_ENUM.MANUAL },
//   cpfHousingWithdrawal: { value: 0, source: SOURCES_ENUM.MANUAL },
//   noaHistory: { value: 0, source: SOURCES_ENUM.MANUAL },
// },
// vehicleInfo: {
//   effectiveOwnership: { value: "", source: SOURCES_ENUM.MANUAL },
// },
//     },
//     updateUinFin: (value: string) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.personalInfo.uinfin.value = value;
//         })
//       );
//     },
//     updateName: (value: string) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.personalInfo.name.value = value;
//         })
//       );
//     },
//     updateSex: (value: string) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           console.log(value);
//           state.form.personalInfo.sex.value = value;
//           if (value === "M") {
//             state.form.personalInfo.sex.label = "Male";
//           } else if (value === "U") {
//             state.form.personalInfo.sex.label = "Unknown/Others";
//           } else {
//             state.form.personalInfo.sex.label = "Female";
//           }
//         })
//       );
//     },
//     updateNationality: (value: string) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.personalInfo.nationality.value = value;
//           const selectedOption = NATIONALITY_OPTIONS.find(
//             (option) => option.value === value
//           );
//           if (selectedOption) {
//             state.form.personalInfo.nationality.label = selectedOption.label;
//           }
//         })
//       );
//     },
//     updateDob: (value: string) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.personalInfo.dob.value = value;
//         })
//       );
//     },
//     updateRace: (value: string) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.personalInfo.race.value = value;
//           const selectedRace = RACE_OPTIONS.find(
//             (option) => option.value === value
//           );
//           if (selectedRace) {
//             state.form.personalInfo.race.label = selectedRace.label;
//           }
//         })
//       );
//     },
//     updatePlaceOfBirth: (value: string) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.personalInfo.placeOfBirth.value = value;
//           const obj: TCountries = countries;
//           const formattedCountries = Object.keys(obj).map((key: string) => {
//             return {
//               value: key as string,
//               label: obj[key as TCountryCode].name?.toUpperCase(),
//             };
//           });
//           const selectedPob = formattedCountries.find(
//             (options) => options.value === value
//           );
//           if (selectedPob) {
//             state.form.personalInfo.placeOfBirth.label = selectedPob.label;
//           }
//         })
//       );
//     },
//     updateRegisteredAddress: (value: string) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.personalInfo.registeredAddress.value = value;
//         })
//       );
//     },
//     updateResidentialStatus: (value: string) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.personalInfo.residentialStatus.value = value;
//           const selectResidentialStatus = RESIDENTIAL_STATUS_OPTIONS.find(
//             (option) => option.value === value
//           );
//           if (selectResidentialStatus) {
//             state.form.personalInfo.residentialStatus.label =
//               selectResidentialStatus.label;
//           }
//         })
//       );
//     },
//     updateHousingType: (value: number) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.personalInfo.housingType.value = value;
//           const selectedHousingType = HOUSING_TYPE_OPTIONS.find(
//             (option) => option.value == value
//           );
//           if (selectedHousingType) {
//             state.form.personalInfo.housingType.label =
//               selectedHousingType.label;
//           }
//         })
//       );
//     },
//     updateHDBType: (value: number) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.personalInfo.hdbType.value = value;
//           const selectedHDBType = HDB_TYPE_OPTIONS.find(
//             (option) => option.value == value
//           );
//           if (selectedHDBType) {
//             state.form.personalInfo.hdbType.label = selectedHDBType.label;
//           }
//         })
//       );
//     },
//     updatePassType: (value: string) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.personalInfo.passType.value = value;
//           const selectedPassType = PASS_TYPE_OPTIONS.find(
//             (option) => option.value === value
//           );
//           if (selectedPassType) {
//             state.form.personalInfo.passType.label = selectedPassType.label;
//           }
//         })
//       );
//     },
//     updatePassStatus: (value: string) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.personalInfo.passStatus.value = value;
//           const selectedPassStatus = PASS_STATUS_OPTIONS.find(
//             (option) => option.value === value
//           );
//           if (selectedPassStatus) {
//             state.form.personalInfo.passStatus.label = selectedPassStatus.label;
//           }
//         })
//       );
//     },
//     updatePassExpiryDate: (value: string) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.personalInfo.passExpiryDate.value = value;
//         })
//       );
//     },
//     updateMaritalStatus: (value: number) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.personalInfo.maritalStatus.value = value;
//           const selectedMaritalStatus = MARITAL_STATUS_OPTIONS.find(
//             (option) => option.value === value
//           );
//           if (selectedMaritalStatus) {
//             state.form.personalInfo.maritalStatus.label =
//               selectedMaritalStatus.label;
//           }
//         })
//       );
//     },
//     updateEmail: (value: string) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.contactInfo.email.value = value;
//         })
//       );
//     },
//     updateMobileNo: (value: string) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.contactInfo.mobileNo.value = value;
//         })
//       );
//     },
//     updateHomeContactNo: (value: string) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.contactInfo.homeContactNo.value = value;
//         })
//       );
//     },
//     updateEmployerName: (value: string) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.employmentDetails.employerName.value = value;
//         })
//       );
//     },
//     updateOccupation: (value: string) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.employmentDetails.occupation.value = value;
//         })
//       );
//     },
//     updateEmploymentSector: (value: string) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.employmentDetails.employmentSector.value = value;
//         })
//       );
//     },
//     updateHouseholdIncome: (value: number) => {
//       console.log(value);
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.employmentDetails.householdIncome.value = value;
//         })
//       );
//     },
//     updateOutstandingHDBLoanBalance: (value: number) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.propertyInfo.outStandingHDBLoanBalance.value = value;
//         })
//       );
//     },
//     updateMonthlyLoanInstallment: (value: number) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.propertyInfo.monthlyLoanInstallment.value = value;
//         })
//       );
//     },
//     updateDwellingHDBType: (value: number) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.propertyInfo.dwellingHDBType.value = value;
//           const selectedHDBType = HDB_TYPE_OPTIONS.find(
//             (option) => option.value == value
//           );
//           if (selectedHDBType) {
//             state.form.propertyInfo.dwellingHDBType.label =
//               selectedHDBType.label;
//           }
//         })
//       );
//     },
//     updateDateOfPurchase: (value: string) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.propertyInfo.dateOfPurchase.value = value;
//         })
//       );
//     },
//     updateCpfContributionHistory: (value: number) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.financialInfo.cpfContributionsHistory.value = value;
//         })
//       );
//     },
//     updateCpfHousingWithdrawal: (value: number) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.financialInfo.cpfHousingWithdrawal.value = value;
//         })
//       );
//     },
//     updateNoaHistory: (value: number) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.financialInfo.noaHistory.value = value;
//         })
//       );
//     },
//     updateEffectiveOwnership: (value: string) => {
//       set(
//         produce((state: KycApplicationStore) => {
//           state.form.vehicleInfo.effectiveOwnership.value = value;
//         })
//       );
//     },
//     submitKycApplication: async () => {
//       const state = get();
//       console.log("submitting kyc application");
//       // await new Promise((resolve) => setTimeout(resolve, 1000));
//       console.log("form", state.form);

//       return "success";
//     },
//   })
// );
