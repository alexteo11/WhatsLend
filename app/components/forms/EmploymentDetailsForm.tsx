"use client";
import { useKycApplicationStore } from "@/stores/kycApplicationStore";
import { useShallow } from "zustand/shallow";

const EmploymentDetailsForm = () => {
  const {
    employmentDetails,
    updateEmployerName,
    updateOccupation,
    updateEmploymentSector,
    updateHouseholdIncome,
  } = useKycApplicationStore(
    useShallow((state) => ({
      employmentDetails: state.form.employmentDetails,
      updateEmployerName: state.updateEmployerName,
      updateOccupation: state.updateOccupation,
      updateEmploymentSector: state.updateEmploymentSector,
      updateHouseholdIncome: state.updateHouseholdIncome,
    }))
  );

  return (
    <div className="application__form-section">
      <div className="application__form-section-title-container">
        <h2 className="text-2xl font-black">Employment Details</h2>
      </div>
      <div className="application__form-input-row-container">
        <label className="application__form-label-container">
          Employer's Name
        </label>
        <input
          className="application__form-input focus:outline-none focus:shadow-outline"
          name="employerName"
          type="text"
          placeholder="Compare Loan Pte Ltd"
          value={employmentDetails.employerName.value}
          onChange={(e) => updateEmployerName(e.target.value)}
        />
      </div>
      <div className="application__form-input-row-container">
        <label className="application__form-label-container">Occupation</label>
        <input
          className="application__form-input focus:outline-none focus:shadow-outline"
          name="occupation"
          type="text"
          placeholder="Business Analyst"
          value={employmentDetails.occupation.value}
          onChange={(e) => updateOccupation(e.target.value)}
        />
      </div>
      <div className="application__form-input-row-container">
        <label className="application__form-label-container">
          Employment Sector
        </label>
        <input
          className="application__form-input focus:outline-none focus:shadow-outline"
          name="employmetSector"
          type="text"
          placeholder="Engineer"
          value={employmentDetails.employmentSector.value}
          onChange={(e) => updateEmploymentSector(e.target.value)}
        />
      </div>
      <div className="application__form-input-row-container">
        <label className="application__form-label-container">
          Household Income
        </label>
        <input
          className="application__form-input focus:outline-none focus:shadow-outline"
          name="householdIncome"
          type="number"
          placeholder="4000"
          value={employmentDetails.householdIncome.value}
          onChange={(e) => updateHouseholdIncome(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default EmploymentDetailsForm;
