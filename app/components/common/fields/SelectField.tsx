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
import { Popover, PopoverContent, PopoverTrigger } from "../../lib/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../../lib/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { Button } from "../../lib/button";
import { ScrollArea } from "../../lib/scroll-area";

const SelectField = <T extends FieldValues>(
  props: OptionsFieldProps<T> & {
    form: UseFormReturn<T>;
    field: ControllerRenderProps<T, FieldPath<T>>;
  },
) => {
  if (props.options.length > 10) {
    return <SelectWithSearchBox {...props} />;
  }

  return <SelectWithoutSearchBox {...props} />;
};

const SelectWithSearchBox = <T extends FieldValues>({
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
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="application__form-input" {...field}>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "justify-between",
              !field.value && "text-muted-foreground",
            )}
            disabled={disabled}
          >
            <div className="flex-1 text-start">
              {field.value
                ? options.find((option) => option.value == field.value)?.label
                : placeholder}
            </div>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] min-w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search keyword..." className="h-[42px]" />
          <CommandList>
            <ScrollArea className="h-72">
              <CommandEmpty>No data found.</CommandEmpty>
              <CommandGroup>
                {options.map((option, index) => (
                  <CommandItem
                    className="h-[42px]"
                    value={option.label}
                    key={index}
                    onSelect={() => {
                      field.onChange(String(option.value));
                      if (optionLabelRef) {
                        form.setValue(
                          optionLabelRef,
                          option.label as PathValue<T, Path<T>>,
                        );
                      }
                      setOpen(false);
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        option.value === field.value
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const SelectWithoutSearchBox = <T extends FieldValues>({
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
        if (!value) {
          return;
        }

        field.onChange(String(value));
        const label = options.find((option) => option.value == value)?.label;

        if (label && optionLabelRef) {
          form.setValue(optionLabelRef, label as PathValue<T, Path<T>>);
        }
      }}
      value={field.value}
      disabled={disabled}
    >
      <FormControl>
        <SelectTrigger className="application__form-input" {...field}>
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
