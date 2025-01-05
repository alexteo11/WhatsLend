"use client";
import { useKycApplicationStore } from "@/stores/kycApplicationStore";
import { useShallow } from "zustand/shallow";

const ContactInfoForm = () => {
  const { contactInfo, updateEmail, updateHomeContactNo, updateMobileNo } =
    useKycApplicationStore(
      useShallow((state) => ({
        contactInfo: state.form.contactInfo,
        updateEmail: state.updateEmail,
        updateMobileNo: state.updateMobileNo,
        updateHomeContactNo: state.updateHomeContactNo,
      }))
    );

  return (
    <div className="application__form-section">
      <div className="application__form-section-title-container">
        <h2 className="text-2xl font-black">Contact Information</h2>
      </div>
      {/* for double columns in a row */}
      {/* <div className="flex w-full flex-wrap md:flex-nowrap gap-4">

      </div> */}
      <div className="application__form-input-row-container">
        <label className="application__form-label-container">Email</label>
        <input
          className="application__form-input focus:outline-none focus:shadow-outline"
          name="email"
          type="email"
          placeholder="abc@gmail.com"
          value={contactInfo.email.value}
          onChange={(e) => updateEmail(e.target.value)}
        />
      </div>
      <div className="application__form-input-row-container">
        <label className="application__form-label-container">
          Mobile Number
        </label>
        <input
          className="application__form-input focus:outline-none focus:shadow-outline"
          name="mobileNumber"
          type="number"
          placeholder="93902245"
          value={contactInfo.mobileNo.value}
          onChange={(e) => updateMobileNo(e.target.value)}
        />
      </div>
      <div className="application__form-input-row-container">
        <label className="application__form-label-container">
          Home Contact Number
        </label>
        <input
          className="application__form-input focus:outline-none focus:shadow-outline"
          name="homeContactNo"
          type="number"
          placeholder="93902245"
          value={contactInfo.homeContactNo.value}
          onChange={(e) => updateHomeContactNo(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ContactInfoForm;
