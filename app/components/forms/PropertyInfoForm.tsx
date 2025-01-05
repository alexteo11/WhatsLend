"use client";
import { HDB_TYPE_OPTIONS } from "@/constants/formEnums";
import { useKycApplicationStore } from "@/stores/kycApplicationStore";
import { useState } from "react";
import { useShallow } from "zustand/shallow";
import DropDownListSelector from "../common/DropDownListSelector";

const PropertyInfoForm = () => {
  const {
    propertyInfo,
    updateOutstandingHDBLoanBalance,
    updateMonthlyLoanInstallment,
    updateDwellingHDBType,
    updateDateOfPurchase,
  } = useKycApplicationStore(
    useShallow((state) => ({
      propertyInfo: state.form.propertyInfo,
      updateOutstandingHDBLoanBalance: state.updateOutstandingHDBLoanBalance,
      updateMonthlyLoanInstallment: state.updateMonthlyLoanInstallment,
      updateDwellingHDBType: state.updateDwellingHDBType,
      updateDateOfPurchase: state.updateDateOfPurchase,
    }))
  );
  const [outStandingHDBLoanBalance, setOutStandingHDBLoanBalance] =
    useState("");
  const handleOutStandingHDBLoanBalanceChange = (value: string) => {
    setOutStandingHDBLoanBalance(value);
  };
  const [monthlyLoanInstallment, setMonthlyLoanInstallment] = useState("");
  const handleMonthlyLoanInstallmentChange = (value: string) => {
    setMonthlyLoanInstallment(value);
  };
  const [dwellingHDBType, setDwellingHDBType] = useState(111);
  const handleDwellingHdbTypeChange = (value: number) => {
    setDwellingHDBType(value);
  };
  const [dateOfPurchase, setDateOfPurchase] = useState("");
  const handleDateOfPurchaseChange = (value: string) => {
    setDateOfPurchase(value);
  };

  return (
    <div className="application__form-section">
      <div className="application__form-section-title-container">
        <h2 className="text-2xl font-black">Property Information</h2>
      </div>
      <div className="application__form-input-row-container">
        <label className="application__form-label-container">
          Outstanding HDB Loan Balance
        </label>
        <input
          className="application__form-input focus:outline-none focus:shadow-outline"
          name="outstandingHDBLoanBalance"
          type="number"
          placeholder="50000"
          value={propertyInfo.outStandingHDBLoanBalance.value}
          onChange={(e) =>
            updateOutstandingHDBLoanBalance(Number(e.target.value))
          }
        />
      </div>
      <div className="application__form-input-row-container">
        <label className="application__form-label-container">
          Monthly Loan Installment
        </label>
        <input
          className="application__form-input focus:outline-none focus:shadow-outline"
          name="monthlyLoanInstallment"
          type="number"
          placeholder="1000"
          value={propertyInfo.monthlyLoanInstallment.value}
          onChange={(e) => updateMonthlyLoanInstallment(Number(e.target.value))}
        />
      </div>
      <div className="application__form-input-row-container">
        <DropDownListSelector<number>
          label="Type of HDB Dwelling"
          options={HDB_TYPE_OPTIONS}
          selectedOption={propertyInfo.dwellingHDBType.value}
          onOptionChange={updateDwellingHDBType}
        />
      </div>
      <div className="application__form-input-row-container">
        <label className="application__form-label-container">
          Date of Purchase
        </label>
        <input
          className="application__form-input focus:outline-none focus:shadow-outline"
          name="dateOfPurchase"
          type="date"
          value={propertyInfo.dateOfPurchase.value}
          onChange={(e) => updateDateOfPurchase(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PropertyInfoForm;
