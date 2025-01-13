import React, { useMemo } from "react";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../lib/form";
import {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";
import DateField from "./fields/DateField";
import NumberField from "./fields/NumberField";
import PhoneField from "./fields/PhoneField";
import RadioField from "./fields/RadioField";
import SelectField from "./fields/SelectField";
import TextField from "./fields/TextField";
import { SOURCES_ENUM } from "@/schemas/common.schema";
import PasswordField from "./fields/PasswordField";

type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "date"
  | "phone"
  | "radio"
  | "select";
// | "checkbox";

interface BaseProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  fieldRef: FieldPath<T>;
  label: string;
  type: FieldType;
  disabled?: boolean;
  placeholder?: string;
  description?: string;
}

export interface CommonFieldProps<T extends FieldValues> extends BaseProps<T> {
  type: Exclude<FieldType, "select" | "radio" | "checkbox" | "number">;
}

export interface NumberFieldProps<T extends FieldValues> extends BaseProps<T> {
  type: "number";
  min?: number;
  max?: number;
  pattern?: string;
}

export interface OptionsFieldProps<T extends FieldValues> extends BaseProps<T> {
  type: "select" | "radio"; // | "checkbox";
  options: { label: string; value: string | number | boolean }[];
  optionLabelRef: FieldPath<T>;
}

type BaseFormFieldProps<T extends FieldValues> =
  | CommonFieldProps<T>
  | NumberFieldProps<T>
  | OptionsFieldProps<T>;
// &
// React.InputHTMLAttributes<HTMLInputElement>;

const BaseFormField = <T extends FieldValues>(props: BaseFormFieldProps<T>) => {
  const { form, fieldRef: name, label, type, description } = props;

  const isDisabled = useMemo(() => {
    const fieldPrefix = name.split(".").slice(0, -1).join(".");
    const sourceField = `${fieldPrefix}.source` as Path<T>;
    const isSingpassField =
      form.getValues(sourceField) === SOURCES_ENUM.SINGPASS;
    return isSingpassField ?? props.disabled;
  }, [name, form]);

  const getFormType = (
    field: ControllerRenderProps<T, Path<T> & (string | undefined)>,
  ): React.ReactNode => {
    if (type === "text" || type === "email") {
      return <TextField field={field} {...props} disabled={isDisabled} />;
    }

    if (type === "password") {
      return <PasswordField field={field} {...props} disabled={isDisabled} />;
    }

    if (type === "date") {
      return <DateField field={field} {...props} disabled={isDisabled} />;
    }

    if (type === "phone") {
      return <PhoneField field={field} {...props} disabled={isDisabled} />;
    }

    if (type === "radio") {
      return <RadioField field={field} {...props} disabled={isDisabled} />;
    }

    if (type === "select") {
      return <SelectField field={field} {...props} disabled={isDisabled} />;
    }

    if (type === "number") {
      return <NumberField field={field} {...props} disabled={isDisabled} />;
    }

    // if (type === "checkbox") {
    //   return <CheckboxField field={field} {...props} />;
    // }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel
            htmlFor={name}
            className="text-sm font-semibold text-gray-700"
          >
            {label}
          </FormLabel>
          {getFormType(field)}
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// const CheckboxField = <T extends FieldValues>({
//   field,
//   options,
// }: OptionsFieldProps<T> & {
//   form: UseFormReturn<T>;
//   field: ControllerRenderProps<T, FieldPath<T>>;
// }) => {
//   return options.map((option) => (
//     <FormItem
//       key={option.value}
//       className="flex flex-row items-start space-x-3 space-y-0"
//     >
//       <FormControl>
//         <Checkbox
//           checked={field.value?.includes(option.value)}
//           onCheckedChange={(checked) => {
//             return checked
//               ? field.onChange([...field.value, option.value])
//               : field.onChange(
//                   field.value?.filter((value: string) => value !== option.value)
//                 );
//           }}
//         />
//       </FormControl>
//       <FormLabel className="text-sm font-normal">{option.label}</FormLabel>
//     </FormItem>
//   ));
// };

export default BaseFormField;
