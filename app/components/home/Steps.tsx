import Image from "next/image";
import React from "react";
import { CardContent } from "../lib/card";
import { cn } from "@/lib/utils";

const Goals = () => {
  return (
    <div className="middle-container-width py-8 md:py-14">
      <div className="flex w-full flex-col items-center justify-center gap-5 text-center">
        <p className="font-bold text-app">HOW IT WORKS</p>
        <h1 className="text-4xl font-extrabold">
          It happens effortlessly, this is how
        </h1>
        {/* <h3 className="text-light-gray max-w-[80%] scale-">
          Need some fast case? Bad credit history? Try our loan and feel secure
          in your future
        </h3> */}
        <div className="mt-5 items-center justify-evenly gap-4">
          <div className="p-0 md:p-10">
            <CardContent className="flex flex-row items-center gap-20 text-center">
              <div className="flex flex-col gap-10">
                <StepView
                  className="opacity-70"
                  step={1}
                  title="Start application & lock rate"
                  description="Speak with one of our knowledgeable loan officers to discuss your options and secure your rate"
                />
                <StepView
                  className="opacity-70"
                  step={2}
                  title="Get approved"
                  description="Your application is reviewed by the loan officers to determine program eligibility and conditional approval."
                />
                <StepView
                  step={3}
                  title="Close loan & get your money"
                  description="Our processing team gathers loan conditions and advances the loan to closing/funding disbursement."
                  isActive
                />
              </div>
              <Image
                src="money.gif"
                alt="money"
                width={350}
                height={350}
                className="hidden -scale-x-100 object-contain md:block"
              />
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
};

const StepView = ({
  className,
  step,
  title,
  description,
  isActive,
}: React.HTMLAttributes<HTMLDivElement> & {
  step: number;
  title: string;
  description: string;
  isActive?: boolean;
}) => {
  return (
    <div className={cn("flex items-start justify-around gap-5", className)}>
      <div
        className={cn(
          "flex aspect-square h-[40px] w-[40px] flex-auto items-center justify-center rounded-full bg-app",
          isActive ? "animate-bounce" : "",
        )}
      >
        {step}
      </div>
      <div className="flex flex-col items-start gap-3 text-start">
        <h1 className={cn("text-2xl font-bold", isActive && "text-app")}>
          {title}
        </h1>
        <p className="text-light-gray">{description}</p>
      </div>
    </div>
  );
};

export default Goals;
