"use client";

import React from "react";
import { FieldValues, ControllerRenderProps, FieldPath } from "react-hook-form";
import { FormControl } from "../../lib/form";
import { Input } from "../../lib/input";
import { CommonFieldProps } from "../BaseFormField";
import { Button } from "../../lib/button";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const PasswordField = <T extends FieldValues>({
  fieldRef: name,
  placeholder,
  disabled,
  field,
}: CommonFieldProps<T> & {
  field: ControllerRenderProps<T, FieldPath<T>>;
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <FormControl>
        <Input
          className="application__form-input"
          id={name}
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          disabled={disabled}
          {...field}
          value={field.value ?? ""}
          autoComplete="off"
          readOnly={true}
          onFocus={(e: React.FocusEvent<HTMLInputElement>) =>
            e.currentTarget.removeAttribute("readOnly")
          }
        />
      </FormControl>
      <Button
        size="icon"
        className="absolute right-1 top-1.5 scale-[1.25] cursor-pointer bg-transparent shadow-none invert hover:bg-transparent"
        onClick={(e) => toggleShowPassword(e)}
        asChild
      >
        <div className="opacity-65">
          <EyeIcon className={cn("scale-100", !showPassword && "scale-0")} />
          <EyeClosedIcon
            className={cn("absolute scale-0", !showPassword && "scale-100")}
          />
        </div>
      </Button>
    </div>
  );
};

export default PasswordField;
