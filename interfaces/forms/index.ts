// type Source = "SINGPASS" | "MANUAL";
export enum SOURCES_ENUM {
  SINGPASS = "SINGPASS",
  MANUAL = "MANUAL",
}

export type DataSourceValuePair<T = string> = {
  value: T;
  source: SOURCES_ENUM;
};

export type LabeledDataSourceValuePair<T = string> = {
  value: T;
  label: string;
  source: SOURCES_ENUM;
};

export type PersonalInfoForm = {
  uinfin: DataSourceValuePair;
  name: DataSourceValuePair;
  sex: LabeledDataSourceValuePair;
  nationality: LabeledDataSourceValuePair;
  dob: DataSourceValuePair;
  race: LabeledDataSourceValuePair;
  placeOfBirth: LabeledDataSourceValuePair;
  registeredAddress: DataSourceValuePair;
  residentialStatus: LabeledDataSourceValuePair;
  housingType: LabeledDataSourceValuePair<number>;
  hdbType: LabeledDataSourceValuePair<number>;
  passType: LabeledDataSourceValuePair;
  passStatus: LabeledDataSourceValuePair;
  passExpiryDate: DataSourceValuePair;
  maritalStatus: LabeledDataSourceValuePair<number>;
};

export type ContactInfoForm = {
  email: DataSourceValuePair;
  mobileNo: DataSourceValuePair;
  homeContactNo: DataSourceValuePair;
};

export type EmploymentDetailsForm = {
  employerName: DataSourceValuePair;
  occupation: DataSourceValuePair;
  employmentSector: DataSourceValuePair;
  householdIncome: DataSourceValuePair<number>;
};

export type PropertyInfoForm = {
  outStandingHDBLoanBalance: DataSourceValuePair<number>;
  monthlyLoanInstallment: DataSourceValuePair<number>;
  dwellingHDBType: LabeledDataSourceValuePair<number>;
  dateOfPurchase: DataSourceValuePair;
};

export type FinancialInfoForm = {
  cpfContributionsHistory: DataSourceValuePair<number>;
  cpfHousingWithdrawal: DataSourceValuePair<number>;
  noaHistory: DataSourceValuePair<number>;
};

export type VehicleInfoForm = {
  effectiveOwnership: DataSourceValuePair;
};

export type KycApplicationForm = {
  personalInfo: PersonalInfoForm;
  contactInfo: ContactInfoForm;
  employmentDetails: EmploymentDetailsForm;
  propertyInfo: PropertyInfoForm;
  financialInfo: FinancialInfoForm;
  vehicleInfo: VehicleInfoForm;
};

export type KycApplicationStore = {
  form: KycApplicationForm;
  updateUinFin: (value: string) => void;
  updateName: (value: string) => void;
  updateSex: (value: string) => void;
  updateNationality: (value: string) => void;
  updateDob: (value: string) => void;
  updateRace: (value: string) => void;
  updatePlaceOfBirth: (value: string) => void;
  updateRegisteredAddress: (value: string) => void;
  updateResidentialStatus: (value: string) => void;
  updateHousingType: (value: number) => void;
  updateHDBType: (value: number) => void;
  updatePassType: (value: string) => void;
  updatePassStatus: (value: string) => void;
  updatePassExpiryDate: (value: string) => void;
  updateMaritalStatus: (value: number) => void;
  updateEmail: (value: string) => void;
  updateMobileNo: (value: string) => void;
  updateHomeContactNo: (value: string) => void;
  updateEmployerName: (value: string) => void;
  updateOccupation: (value: string) => void;
  updateEmploymentSector: (value: string) => void;
  updateHouseholdIncome: (value: number) => void;
  updateOutstandingHDBLoanBalance: (value: number) => void;
  updateMonthlyLoanInstallment: (value: number) => void;
  updateDwellingHDBType: (value: number) => void;
  updateDateOfPurchase: (value: string) => void;
  updateCpfContributionHistory: (value: number) => void;
  updateCpfHousingWithdrawal: (value: number) => void;
  updateNoaHistory: (value: number) => void;
  updateEffectiveOwnership: (value: string) => void;
  submitKycApplication: () => void;
};
