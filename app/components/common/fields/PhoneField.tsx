import React from "react";
import { FieldValues, ControllerRenderProps, FieldPath } from "react-hook-form";
import { FormControl } from "../../lib/form";
import { PhoneInput } from "../../lib/phone-input";
import { CommonFieldProps } from "../BaseFormField";

const PhoneField = <T extends FieldValues>({
  field,
  placeholder,
  disabled,
}: CommonFieldProps<T> & {
  field: ControllerRenderProps<T, FieldPath<T>>;
}) => {
  return (
    <FormControl>
      <PhoneInput
        className=""
        placeholder={placeholder}
        defaultCountry="SG"
        disabled={disabled}
        {...field}
      />
    </FormControl>
  );
};

export default PhoneField;
