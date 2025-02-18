"use client";

import { useEffect, useMemo, useState } from "react";
import { Slider } from "../lib/slider";
import { Input } from "../lib/input";
import {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../lib/form";
import { cn } from "@/lib/utils";

interface BaseSliderFieldProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value?: number;
  onValueChange?: (value: number) => void;
  size?: "default" | "lg";
  placeholder?: string;
  description?: string;
  pattern?: string;
}

interface FormSliderFieldProps<T extends FieldValues>
  extends BaseSliderFieldProps {
  form: UseFormReturn<T>;
  fieldRef: FieldPath<T>;
}

type SliderFieldProps<T extends FieldValues> =
  | BaseSliderFieldProps
  | FormSliderFieldProps<T>;

const SliderField = <T extends FieldValues>(props: SliderFieldProps<T>) => {
  const {
    label,
    value,
    min,
    max,
    step,
    onValueChange,
    size = "default",
    placeholder,
    description,
    pattern,
  } = props;

  const defaultValue = value;
  const formValue =
    "form" in props && props.form?.getValues(props.fieldRef) != null
      ? Number(props.form?.getValues(props.fieldRef))
      : undefined;
  const initValue = formValue ?? defaultValue;

  const [_value, setValue] = useState<number | undefined>(initValue);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  useEffect(() => {
    if (_value != null) {
      onValueChange?.(_value);
    }
  }, [_value]);

  const formatPattern = (value: number | undefined) => {
    if (value == null) {
      return;
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
      return _value;
    }
    return formatPattern(_value);
  }, [_value, isFocus]);

  const component = (
    field?: ControllerRenderProps<T, Path<T> & (string | undefined)>,
  ) => {
    return (
      <div
        className={cn("flex w-full translate-y-[-10px] justify-between gap-5")}
      >
        <div className="relative flex w-full flex-col justify-center">
          <Slider
            value={[_value || min]}
            min={min}
            max={max}
            step={step}
            onValueChange={(value) => {
              setValue(value[0]);
              field?.onChange(value[0]);
            }}
          />
          <div className="absolute left-0 top-[38px] flex w-full flex-row justify-between text-xs text-gray-700/70">
            <span>{formatPattern(min)}</span>
            <span>{formatPattern(max)}</span>
          </div>
        </div>
        <InputWrapper
          className="!md:w-[30%] !w-[40%] max-w-[200px]"
          field={field}
        >
          <Input
            className={cn("application__form-input w-full text-right")}
            type="text"
            placeholder={placeholder}
            {...(field || {})}
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
              setValue(checkMinMax(_value));
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
                const value = Number(e.currentTarget.value);
                setValue(value);
                field?.onChange(value);
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
        </InputWrapper>
      </div>
    );
  };

  if ("form" in props && "fieldRef" in props) {
    const { form, fieldRef } = props;

    return (
      <FormField
        control={form.control}
        name={fieldRef}
        render={({ field }) => (
          <FormItem className="flex flex-col space-y-4 py-2">
            <FormLabel
              htmlFor={fieldRef}
              className="text-sm font-semibold text-gray-700"
            >
              {label}
            </FormLabel>
            {component(field)}
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return (
    <div className="w-full space-y-4">
      <h1 className="text-start text-base font-semibold text-gray-700">
        {label}
      </h1>
      {component()}
      {description && (
        <p className="text-start text-sm text-gray-700/70">{description}</p>
      )}
    </div>
  );
};

const InputWrapper = <T extends FieldValues>({
  field,
  children,
  className,
}: {
  field?: ControllerRenderProps<T, Path<T> & (string | undefined)>;
} & React.HtmlHTMLAttributes<HTMLDivElement>) => {
  if (field) {
    return <FormControl className={className}>{children}</FormControl>;
  }

  return <div className={className}>{children}</div>;
};

export default SliderField;
