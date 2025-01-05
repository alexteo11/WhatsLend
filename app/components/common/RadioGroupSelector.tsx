import { RadioGroupSelectorProps } from "@/interfaces/components";
import React from "react";

const RadioGroupSelector = (props: RadioGroupSelectorProps) => {
  const { label, options, selectedOption, onOptionChange } = props;
  console.log("selected: ", selectedOption);
  return (
    <div>
      <label className="application__form-label-container">{label}</label>
      <div className="flex space-x-14">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              id={option.value}
              value={option.value}
              checked={selectedOption === option.value}
              onChange={() => onOptionChange(option.value)}
            />
            <label htmlFor={option.value} className="ml-3">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroupSelector;
