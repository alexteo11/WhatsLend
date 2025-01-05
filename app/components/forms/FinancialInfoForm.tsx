"use client";
import { useKycApplicationStore } from "@/stores/kycApplicationStore";
import { useShallow } from "zustand/shallow";

const FinancialInfoForm = () => {
  const {
    financialInfo,
    updateCpfContributionHistory,
    updateCpfHousingWithdrawal,
    updateNoaHistory,
  } = useKycApplicationStore(
    useShallow((state) => ({
      financialInfo: state.form.financialInfo,
      updateCpfContributionHistory: state.updateCpfContributionHistory,
      updateCpfHousingWithdrawal: state.updateCpfHousingWithdrawal,
      updateNoaHistory: state.updateNoaHistory,
    }))
  );

  return (
    <div className="application__form-section">
      <div className="application__form-section-title-container">
        <h2 className="text-2xl font-black">Financial Information</h2>
      </div>
      {/* Have To Display it on month by month basis */}
      <div className="application__form-input-row-container">
        <label className="application__form-label-container">
          CPF Contribution History (Up to 15 months)
        </label>
        <input
          className="application__form-input focus:outline-none focus:shadow-outline"
          name="cpfContributionsHistory"
          type="number"
          placeholder="50000"
          value={financialInfo.cpfContributionsHistory.value}
          onChange={(e) => updateCpfContributionHistory(Number(e.target.value))}
        />
      </div>
      <div className="application__form-input-row-container">
        <label className="application__form-label-container">
          CPF Housing Withdrawal
        </label>
        <input
          className="application__form-input focus:outline-none focus:shadow-outline"
          name="cpfHousingWithdrawal"
          type="number"
          placeholder="50000"
          value={financialInfo.cpfHousingWithdrawal.value}
          onChange={(e) => updateCpfHousingWithdrawal(Number(e.target.value))}
        />
      </div>
      <div className="application__form-input-row-container">
        <label className="application__form-label-container">
          Notice of Assessment History
        </label>
        <input
          className="application__form-input focus:outline-none focus:shadow-outline"
          name="noahistory"
          type="number"
          placeholder="50000"
          value={financialInfo.noaHistory.value}
          onChange={(e) => updateNoaHistory(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default FinancialInfoForm;
