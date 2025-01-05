import { DropDownListSelectorProps } from "@/interfaces/components";
import React from "react";

const DropDownListSelector = <T extends string | number>(
  props: DropDownListSelectorProps<T>
) => {
  const { label, options, selectedOption, onOptionChange } = props;
  return (
    <div>
      <label className="application__form-label-container">{label}</label>
      <div className="relative">
        <select
          className="application__form-input focus:outline-none focus:shadow-outline"
          value={selectedOption}
          onChange={(e) => onOptionChange(e.target.value as T)}
        >
          {options.map((nationality) => (
            <option key={nationality.value} value={nationality.value}>
              {nationality.label}
            </option>
          ))}
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.2"
          stroke="currentColor"
          className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
          />
        </svg>
      </div>
    </div>
  );
};

export default DropDownListSelector;
