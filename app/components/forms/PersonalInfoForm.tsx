"use client";
import React, { useState } from "react";
import { SEX_OPTIONS } from "@/types/enums";

const PersonalInfoForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event: { target: HTMLInputElement }) => {
    const value = event.target.value;
    setSelectedOption(value);
  };
  return (
    <div>
      <div className="application__form-section">
        <h2 className="text-2xl font-black">Personal Information</h2>
      </div>
      <div className="mb-4">
        <label className="application__form-label-container">NRIC/FIN</label>
        <input
          className="application__form-input focus:outline-none focus:shadow-outline"
          name="uinfin"
          type="text"
          placeholder="S1234567A"
        />
      </div>
      <div className="mb-6">
        <label className="application__form-label-container">Name</label>
        <input
          className="application__form-input focus:outline-none focus:shadow-outline"
          name="name"
          type="text"
          placeholder="LIM SHONG BOON"
        />
      </div>
      <div className="mb-6">
        <label className="application__form-label-container">Sex</label>
        <div className="flex space-x-14">
          {SEX_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center">
              <input
                type="radio"
                id={option.value}
                name="sex"
                value={option.value}
                checked={selectedOption === option.value}
                onChange={handleOptionChange}
              />
              <label htmlFor={option.value} className="ml-3">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="mb-6">
        <label className="application__form-label-container">Nationality</label>
        <input
          className="application__form-input focus:outline-none focus:shadow-outline"
          name="dob"
          type="date"
        /> */}
    </div>
  );
};

export default PersonalInfoForm;
