"use client";
import {
  HDB_TYPE_OPTIONS,
  HOUSING_TYPE_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  NATIONALITY_OPTIONS,
  PASS_STATUS_OPTIONS,
  PASS_TYPE_OPTIONS,
  RACE_OPTIONS,
  RESIDENTIAL_STATUS_OPTIONS,
  SEX_OPTIONS,
} from "@/constants/formEnums";
import { useKycApplicationStore } from "@/stores/kycApplicationStore";
import { countries, TCountries, TCountryCode } from "countries-list";
import { useShallow } from "zustand/shallow";
import DropDownListSelector from "../common/DropDownListSelector";
import RadioGroupSelector from "../common/RadioGroupSelector";

const PersonalInfoForm = () => {
  const {
    personalInfo,
    updateUinFin,
    updateName,
    updateSex,
    updateNationality,
    updateDob,
    updateRace,
    updatePlaceOfBirth,
    updateRegisteredAddress,
    updateResidentialStatus,
    updateHousingType,
    updateHDBType,
    updatePassType,
    updatePassStatus,
    updatePassExpiryDate,
    updateMaritalStatus,
  } = useKycApplicationStore(
    useShallow((state) => ({
      personalInfo: state.form.personalInfo,
      updateUinFin: state.updateUinFin,
      updateName: state.updateName,
      updateSex: state.updateSex,
      updateNationality: state.updateNationality,
      updateDob: state.updateDob,
      updateRace: state.updateRace,
      updatePlaceOfBirth: state.updatePlaceOfBirth,
      updateRegisteredAddress: state.updateRegisteredAddress,
      updateResidentialStatus: state.updateResidentialStatus,
      updateHousingType: state.updateHousingType,
      updateHDBType: state.updateHDBType,
      updatePassType: state.updatePassType,
      updatePassStatus: state.updatePassStatus,
      updatePassExpiryDate: state.updatePassExpiryDate,
      updateMaritalStatus: state.updateMaritalStatus,
    }))
  );

  const countryListOptions = () => {
    const obj: TCountries = countries;
    const result = Object.keys(obj).map((key: string) => {
      return {
        value: key as string,
        label: obj[key as TCountryCode].name?.toUpperCase(),
      };
    });
    return result.sort((a, b) => {
      if (a.label > b.label) {
        return 1;
      }
      if (b.label > a.label) {
        return -1;
      }
      return 0;
    });
  };
  return (
    <div className="application__form-section">
      <div className="application__form-section-title-container">
        <h2 className="text-2xl font-black">Personal Information</h2>
      </div>
      {/* for double columns in a row */}
      {/* <div className="flex w-full flex-wrap md:flex-nowrap gap-4">

      </div> */}
      <div className="application__form-input-row-container">
        <label className="application__form-label-container">NRIC/FIN</label>
        <input
          className="application__form-input focus:outline-none focus:shadow-outline"
          name="uinfin"
          type="text"
          placeholder="S1234567A"
          value={personalInfo.uinfin.value}
          onChange={(e) => updateUinFin(e.target.value)}
        />
      </div>
      <div className="application__form-input-row-container">
        <label className="application__form-label-container">Name</label>
        <input
          className="application__form-input focus:outline-none focus:shadow-outline"
          name="name"
          type="text"
          placeholder="LIM SHONG BOON"
          value={personalInfo.name.value}
          onChange={(e) => updateName(e.target.value)}
        />
      </div>
      <div className="application__form-input-row-container">
        <RadioGroupSelector
          label="Sex"
          options={SEX_OPTIONS}
          selectedOption={personalInfo.sex.value}
          onOptionChange={updateSex}
        />
      </div>
      <div className="application__form-input-row-container">
        <DropDownListSelector<string>
          label="Nationality/ Citizenship"
          options={NATIONALITY_OPTIONS}
          selectedOption={personalInfo.nationality.value}
          onOptionChange={updateNationality}
        />
      </div>
      <div className="application__form-input-row-container">
        <label className="application__form-label-container">
          Date of Birth
        </label>
        <input
          className="application__form-input focus:outline-none focus:shadow-outline"
          name="dob"
          type="date"
          value={personalInfo.dob.value}
          onChange={(e) => updateDob(e.target.value)}
        />
      </div>
      <div className="application__form-input-row-container">
        <DropDownListSelector<string>
          label="Race"
          options={RACE_OPTIONS}
          selectedOption={personalInfo.race.value}
          onOptionChange={updateRace}
        />
      </div>
      <div className="application__form-input-row-container">
        <DropDownListSelector<string>
          label="Country/ Place of Birth"
          options={countryListOptions()}
          selectedOption={personalInfo.placeOfBirth.value}
          onOptionChange={updatePlaceOfBirth}
        />
      </div>
      <div className="application__form-input-row-container">
        <label className="application__form-label-container">
          Registered Address
        </label>
        <input
          className="application__form-input focus:outline-none focus:shadow-outline"
          name="registeredAddress"
          type="text"
          placeholder="123A, JALAN BESAR, #01-01"
          value={personalInfo.registeredAddress.value}
          onChange={(e) => updateRegisteredAddress(e.target.value)}
        />
      </div>
      <div className="application__form-input-row-container">
        <DropDownListSelector<string>
          label="Residential Status"
          options={RESIDENTIAL_STATUS_OPTIONS}
          selectedOption={personalInfo.residentialStatus.value}
          onOptionChange={updateResidentialStatus}
        />
      </div>
      <div className="application__form-input-row-container">
        <DropDownListSelector<number>
          label="Housing Type"
          options={HOUSING_TYPE_OPTIONS}
          selectedOption={personalInfo.housingType.value}
          onOptionChange={updateHousingType}
        />
      </div>
      <div className="application__form-input-row-container">
        <DropDownListSelector<number>
          label="HDB Type"
          options={HDB_TYPE_OPTIONS}
          selectedOption={personalInfo.hdbType.value}
          onOptionChange={updateHDBType}
        />
      </div>
      <div className="application__form-input-row-container">
        <DropDownListSelector<string>
          label="Pass Type"
          options={PASS_TYPE_OPTIONS}
          selectedOption={personalInfo.passType.value}
          onOptionChange={updatePassType}
        />
      </div>
      <div className="application__form-input-row-container">
        <RadioGroupSelector
          label="Pass Status"
          options={PASS_STATUS_OPTIONS}
          selectedOption={personalInfo.passStatus.value}
          onOptionChange={updatePassStatus}
        />
      </div>
      <div className="application__form-input-row-container">
        <label className="application__form-label-container">
          Pass Expiry Date
        </label>
        <input
          className="application__form-input focus:outline-none focus:shadow-outline"
          name="passExpiryDate"
          type="date"
          value={personalInfo.passExpiryDate.value}
          onChange={(e) => updatePassExpiryDate(e.target.value)}
        />
      </div>
      <div className="application__form-input-row-container">
        <DropDownListSelector<number>
          label="Marital Status"
          options={MARITAL_STATUS_OPTIONS}
          selectedOption={personalInfo.maritalStatus.value}
          onOptionChange={updateMaritalStatus}
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;
