import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
}

interface RadioGroupSelectorOptions {
  label: string;
  value: string;
}

export interface RadioGroupSelectorProps {
  label: string;
  options: RadioGroupSelectorOptions[];
  selectedOption: string;
  onOptionChange: (value: string) => void;
}

interface DropDownListSelectorOptions<T> {
  label: string;
  value: T;
}

export interface DropDownListSelectorProps<T> {
  label: string;
  options: DropDownListSelectorOptions<T>[];
  selectedOption: T;
  onOptionChange: (value: T) => void;
}
