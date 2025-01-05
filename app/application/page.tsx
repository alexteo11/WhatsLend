"use client";

import { useKycApplicationStore } from "@/stores/kycApplicationStore";
import { useShallow } from "zustand/shallow";
import {
  ContactInfoForm,
  CustomButton,
  EmploymentDetailsForm,
  FinancialInfoForm,
  PersonalInfoForm,
  PropertyInfoForm,
  VehicleInfoForm,
} from "../components";

export default function Application() {
  const { submitKycApplication } = useKycApplicationStore(
    useShallow((state) => ({
      submitKycApplication: state.submitKycApplication,
    }))
  );
  return (
    <div className="overflow-hidden">
      <h1 className="mt-24 text-xl font-bold padding-x padding-y">
        Welcome to your loan service application!
      </h1>

      <form className="padding-x pt-6 pb-8 mb-4 space-y-10">
        <PersonalInfoForm />
        <ContactInfoForm />
        <EmploymentDetailsForm />
        <PropertyInfoForm />
        <FinancialInfoForm />
        <VehicleInfoForm />
        <div className="flex flex-row justify-end mt-10">
          <CustomButton
            title="Submit"
            containerStyles="bg-black text-white rounded-lg"
            btnType="button"
            handleClick={submitKycApplication}
          />
        </div>
      </form>
    </div>
  );
}
