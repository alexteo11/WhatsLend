"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../lib/select";
import React from "react";
import {
  FieldValues,
  UseFormReturn,
  ControllerRenderProps,
  FieldPath,
  PathValue,
  Path,
} from "react-hook-form";
import { FormControl } from "../../lib/form";
import { OptionsFieldProps } from "../BaseFormField";

const SelectField = <T extends FieldValues>({
  form,
  field,
  disabled,
  options,
  optionLabelRef,
  placeholder,
}: OptionsFieldProps<T> & {
  form: UseFormReturn<T>;
  field: ControllerRenderProps<T, FieldPath<T>>;
}) => {
  return (
    <Select
      onValueChange={(value) => {
        field.onChange(String(value));
        const label = options.find((option) => option.value === value)?.label;
        if (label) {
          form.setValue(optionLabelRef, label as PathValue<T, Path<T>>);
        }
      }}
      value={field.value}
      disabled={disabled}
    >
      <FormControl>
        <SelectTrigger className="application__form-input">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {options.map((option, index) => (
          <SelectItem
            key={index}
            value={String(option.value)}
            className="h-[42px]"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectField;
