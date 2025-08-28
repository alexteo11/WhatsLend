"use client";

import { cn } from "@/lib/utils";
import { useFormStore } from "@/stores/useFormStore";
import React from "react";

const steps = [
  {
    title: "General Information",
    value: 1,
  },
  {
    title: "Personal Information",
    value: 2,
  },
  {
    title: "Financial Information",
    value: 3,
  },
];

const FormStepView = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  const { step } = useFormStore();

  return (
    <div>
      <div className={cn("relative", className)}>
        <ProgressBar
          className="absolute left-0 top-[calc(24px)] z-0 h-[2px] w-full transition-all duration-200 ease-in-out"
          step={step}
        />
        <div className="flex w-full flex-row justify-between">
          {steps.map((_step) => {
            return (
              <div
                className="flex flex-col items-center justify-start gap-4"
                key={_step.value}
              >
                <div
                  className={cn(
                    "application__form-step-view z-10 items-start text-black",
                    _step.value === step ? "active" : "text-light-gray",
                    _step.value < step ? "complete" : "",
                  )}
                >
                  {_step.value}
                </div>
                <span
                  className={cn(
                    "max-w-[100px] text-center text-sm font-semibold text-black",
                    _step.value === step ? "" : "text-light-gray",
                  )}
                >
                  {_step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {/* <Button onClick={() => setStep(step - 1)}>Previous</Button>
      <Button onClick={() => setStep(step + 1)}>Next</Button> */}
    </div>
  );
};

const ProgressBar = ({
  className,
  step,
}: React.HtmlHTMLAttributes<HTMLDivElement> & { step: number }) => {
  const progressPercentage =
    step > steps.length ? 100 : ((step - 1) / (steps.length - 1)) * 100;
  return (
    <div className={className}>
      <div className="mx-auto h-full w-[85%] bg-gray-200" />
      <div
        className="mx-auto h-full w-[85%] bg-app shadow-[0_0_8px_0.5px_rgb(168,85,247)] transition-all duration-500 ease-in-out"
        style={{
          transform: `scaleX(${progressPercentage / 100})`,
          transformOrigin: "left",
        }}
      />
    </div>
  );
};

export default FormStepView;
