import { RadioGroup, RadioGroupItem } from "../../lib/radio-group";
import React from "react";
import {
  FieldValues,
  UseFormReturn,
  ControllerRenderProps,
  FieldPath,
  PathValue,
  Path,
} from "react-hook-form";
import { FormControl, FormItem, FormLabel } from "../../lib/form";
import { OptionsFieldProps } from "../BaseFormField";

const RadioField = <T extends FieldValues>({
  form,
  field,
  disabled,
  options,
  optionLabelRef,
}: OptionsFieldProps<T> & {
  form: UseFormReturn<T>;
  field: ControllerRenderProps<T, FieldPath<T>>;
}) => {
  return (
    <FormControl>
      <RadioGroup
        onValueChange={(value) => {
          field.onChange(value);

          const label = options.find((option) => option.value === value)?.label;
          if (label) {
            form.setValue(optionLabelRef, label as PathValue<T, Path<T>>);
          }
        }}
        value={field.value}
        className="flex flex-wrap gap-6 p-4"
        disabled={disabled}
      >
        {options.map((option, index) => (
          <FormItem
            key={index}
            className="flex items-center space-x-3 space-y-0"
          >
            <FormControl>
              <RadioGroupItem
                value={String(option.value)}
                className="h-6 w-6"
              />
            </FormControl>
            <FormLabel className="cursor-pointer font-normal">
              {option.label}
            </FormLabel>
          </FormItem>
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioField;
