"use client";
import { useKycApplicationStore } from "@/stores/kycApplicationStore";
import { useShallow } from "zustand/shallow";

const VehicleInfoForm = () => {
  const { vehicleInfo, updateEffectiveOwnership } = useKycApplicationStore(
    useShallow((state) => ({
      vehicleInfo: state.form.vehicleInfo,
      updateEffectiveOwnership: state.updateEffectiveOwnership,
    }))
  );

  return (
    <div className="application__form-section">
      <div className="application__form-section-title-container">
        <h2 className="text-2xl font-black">Vehicle Information</h2>
      </div>
      <div className="application__form-input-row-container">
        <label className="application__form-label-container">
          Effective Date/ Time of Ownership
        </label>
        <input
          className="application__form-input focus:outline-none focus:shadow-outline"
          name="effectiveOwnership"
          type="date"
          value={vehicleInfo.effectiveOwnership.value}
          onChange={(e) => updateEffectiveOwnership(e.target.value)}
        />
      </div>
    </div>
  );
};

export default VehicleInfoForm;
