import React from "react";
import { FieldValues, ControllerRenderProps, FieldPath } from "react-hook-form";
import { DateTimePicker } from "../../lib/datetime-picker";
import { CommonFieldProps } from "../BaseFormField";

const DateField = <T extends FieldValues>({
  field,
  disabled,
}: CommonFieldProps<T> & {
  field: ControllerRenderProps<T, FieldPath<T>>;
}) => {
  return (
    <DateTimePicker
      value={field.value}
      onChange={(value) => field.onChange(value)}
      disabled={disabled}
      granularity="day"
      calendarDisabledRange={(date) =>
        date > new Date() || date < new Date("1900-01-01")
      }
    />
  );
};

export default DateField;
