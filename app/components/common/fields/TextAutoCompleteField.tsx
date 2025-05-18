"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FieldValues,
  UseFormReturn,
  ControllerRenderProps,
  FieldPath,
} from "react-hook-form";
import { FormControl } from "../../lib/form";
import { OptionsFieldProps } from "../BaseFormField";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandList,
  CommandGroup,
  CommandItem,
} from "../../lib/command";
import { Input } from "../../lib/input";
import { FixedSizeList } from "react-window";

const TextAutoCompleteField = <T extends FieldValues>(
  props: OptionsFieldProps<T> & {
    form: UseFormReturn<T>;
    field: ControllerRenderProps<T, FieldPath<T>>;
  },
) => {
  const { field, fieldRef, options, placeholder, disabled } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLInputElement>(null);
  const [isOpen, setOpen] = useState(false);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      if (event.key === "Escape") {
        input.blur();
        return;
      }

      if (event.key === "Home") {
        if (event.shiftKey) input.selectionStart = 0;
        else input.setSelectionRange(0, 0);
        event.preventDefault();
        return;
      }

      if (event.key === "End") {
        const len = input.value.length;
        if (event.shiftKey) input.selectionEnd = len;
        else input.setSelectionRange(len, len);
        event.preventDefault();
        return;
      }
    },
    [isOpen, options],
  );

  const filteredOptions = useMemo(() => {
    if (!field.value) {
      return options;
    }
    return options.filter((item) => {
      return item.label.toLowerCase().includes(field.value?.toLowerCase());
    });
  }, [field.value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectOption = useCallback(
    (selectedOption: OptionsFieldProps<T>["options"][number]) => {
      field.onChange(selectedOption.label);
      // This is a hack to prevent the input from being focused after the user selects an option
      // We can call this hack: "The next tick"
      setTimeout(() => {
        setOpen(false);
        inputRef?.current?.blur();
      }, 0);
    },
    [],
  );

  return (
    <Command onKeyDown={handleKeyDown}>
      <FormControl>
        <Input
          className="application__form-input !m-[1px] !w-[calc(100%-2px)] !text-[1rem]"
          id={fieldRef}
          placeholder={placeholder}
          type="text"
          disabled={disabled}
          {...field}
          ref={(el) => {
            inputRef.current = el;
            if (el) {
              const handleResize = () => {
                const width = el.offsetWidth;
                document.documentElement.style.setProperty(
                  "--text-auto-complete-field-width",
                  `${width - 10}px`,
                );
              };
              window.addEventListener("resize", handleResize);
              handleResize(); // Initial call to get width
              return () => {
                window.removeEventListener("resize", handleResize);
              };
            }
          }}
          value={field.value ?? ""}
          onFocus={() => setOpen(true)}
        />
      </FormControl>
      {filteredOptions.length > 0 && (
        <div ref={popoverRef}>
          <div
            className={cn(
              "absolute z-10 mx-auto mt-2 w-[96%] rounded-xl bg-white animate-in fade-in-0",
              isOpen ? "block" : "hidden",
            )}
          >
            <CommandList className="scrollable-text-auto-complete-list rounded-lg ring-1 ring-slate-200">
              <CommandGroup>
                <FixedSizeList
                  height={
                    filteredOptions.length > 8
                      ? 300
                      : filteredOptions.length * 42
                  }
                  width="100px"
                  className="!w-[var(--text-auto-complete-field-width)]"
                  itemSize={42}
                  itemCount={filteredOptions.length}
                >
                  {({ index, style }) => {
                    const option = filteredOptions[index];
                    return (
                      <CommandItem
                        style={style}
                        key={String(option.value)}
                        value={option.label}
                        onMouseDown={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                        onSelect={() => handleSelectOption(option)}
                        className={cn(
                          "flex w-full items-center gap-2 whitespace-pre-line break-words",
                        )}
                      >
                        {option.label}
                      </CommandItem>
                    );
                  }}
                </FixedSizeList>
              </CommandGroup>
            </CommandList>
          </div>
        </div>
      )}
    </Command>
  );
};

export default TextAutoCompleteField;
