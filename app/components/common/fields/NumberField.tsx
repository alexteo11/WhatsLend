"use client";

import React, { useMemo, useState } from "react";
import { FieldValues, ControllerRenderProps, FieldPath } from "react-hook-form";
import { FormControl } from "../../lib/form";
import { Input } from "../../lib/input";
import { NumberFieldProps } from "../BaseFormField";

const NumberField = <T extends FieldValues>({
  fieldRef: name,
  placeholder,
  disabled,
  field,
  min,
  max,
  pattern,
}: NumberFieldProps<T> & {
  field: ControllerRenderProps<T, FieldPath<T>>;
}) => {
  const [value, setValue] = useState<number | undefined>(field.value);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const formatPattern = (value: number | undefined) => {
    if (value == null) {
      return "";
    }
    if (!pattern) {
      return value;
    }
    const patternValue = pattern.replaceAll(
      "{value}",
      pattern.includes("$")
        ? new Intl.NumberFormat().format(value)
        : String(value),
    );
    return patternValue;
  };

  const displayValue = useMemo(() => {
    if (isFocus) {
      return value;
    }
    return formatPattern(value);
  }, [value, isFocus]);

  return (
    <>
      <FormControl>
        <Input
          className="application__form-input"
          id={name}
          placeholder={placeholder}
          min={min}
          max={max}
          disabled={disabled}
          value={displayValue ?? ""}
          onFocus={() => setIsFocus(true)}
          onBlur={() => {
            const checkMinMax = (value: number | undefined) => {
              if (value == null) {
                return;
              }
              if (min != null && value < min) {
                return min;
              }
              if (max != null && value > max) {
                return max;
              }
              return value;
            };

            setIsFocus(false);
            setValue(checkMinMax(value));
          }}
          onKeyDown={(e) => {
            const isValid =
              (e.keyCode > 95 && e.keyCode < 106) ||
              (e.keyCode > 47 && e.keyCode < 58) ||
              [8, 9, 37, 39, 190].includes(e.keyCode);
            if (!isValid) {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            if (!pattern) {
              const _value = Number(e.currentTarget.value);
              setValue(_value);
              field?.onChange(_value);
              return;
            }

            const patternStr = pattern.replaceAll("{value}", "");
            const valueWithoutPattern = Number(
              e.currentTarget.value.replaceAll(patternStr, ""),
            );
            setValue(valueWithoutPattern);
            field?.onChange(valueWithoutPattern);
          }}
        />
      </FormControl>
    </>
  );
};
export default NumberField;
