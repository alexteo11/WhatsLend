import React from "react";
import { FieldValues, ControllerRenderProps, FieldPath } from "react-hook-form";
import { FormControl } from "../../lib/form";
import { Input } from "../../lib/input";
import { CommonFieldProps } from "../BaseFormField";

const TextField = <T extends FieldValues>({
  fieldRef: name,
  placeholder,
  disabled,
  field,
}: CommonFieldProps<T> & {
  field: ControllerRenderProps<T, FieldPath<T>>;
}) => {
  return (
    <FormControl>
      <Input
        className="application__form-input !text-[1rem]"
        id={name}
        placeholder={placeholder}
        type="text"
        disabled={disabled}
        {...field}
        value={field.value ?? ""}
      />
    </FormControl>
  );
};

export default TextField;
