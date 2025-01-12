"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import { Card, CardContent } from "../lib/card";
import SliderField from "../common/SliderField";
import ApplyButton from "../common/ApplyButton";
import { SquareCheckBig } from "lucide-react";

const FlexibleLoanPricing = () => {
  return (
    <div className="middle-container-width py-8 md:py-14">
      <div className="flex w-full flex-col items-center justify-center gap-5 text-center">
        <p className="font-bold text-app">PRICING PLAN</p>
        <h1 className="text-4xl font-extrabold">Flexible Loan Pricing</h1>
        <h3 className="max-w-[80%] text-light-gray">
          We provide customizable and flexbile loan package to match your
          requirements!
        </h3>
        <div className="mx-auto flex w-full flex-col items-center gap-6 md:mt-5 md:w-[90%] md:flex-row">
          <div className="flex w-full flex-col items-start gap-4 md:w-[40%]">
            <Image
              className="hidden md:block"
              src="/calculator.gif"
              alt="calculator"
              width={300}
              height={300}
            />
            <h1 className="hidden text-2xl font-bold md:block">
              Customize your loan
            </h1>
            <div className="mx-auto my-4 flex w-[90%] flex-wrap gap-2 md:my-0 md:w-full md:flex-col">
              <TickBox label="Personalised loan offers" />
              <TickBox label="Free of charge & no hidden fees" />
              <TickBox label="Best offer among over 30 loan providers" />
            </div>
          </div>
          <Calculator />
        </div>
      </div>
    </div>
  );
};

const TickBox = ({ label }: { label: string }) => {
  return (
    <div className="flex flex-row gap-2 text-start text-base md:text-base">
      <SquareCheckBig className="text-app" />
      <span>{label}</span>
    </div>
  );
};

const Calculator = () => {
  const [loanPayment, setLoanPayment] = useState<number>(10000);
  const [loanPeriod, setLoanPeriod] = useState<number>(12);

  const estimatedPayment = useMemo(() => {
    const rate = 0.01;
    const totalInterest = loanPayment * (rate + (loanPeriod / 12) * rate);
    const totalPayment = loanPayment + totalInterest;

    return {
      totalInterest,
      totalPayment,
      estimatedInterestPerMonth: totalInterest / loanPeriod,
      estimatedPaymentPerMonth: totalPayment / loanPeriod,
    };
  }, [loanPayment, loanPeriod]);

  return (
    <Card className="flex-auto md:mt-0">
      <CardContent className="p-5 md:p-10">
        <div className="flex flex-auto flex-col gap-4 space-y-2">
          <SliderField
            label="Loan Amount"
            value={loanPayment}
            min={0}
            max={50000}
            step={1000}
            placeholder="$ 50,000"
            pattern="$ {value}"
            onValueChange={(value) => setLoanPayment(value)}
          />
          <SliderField
            label="Loan Period (months)"
            value={loanPeriod}
            min={3}
            max={120}
            step={1}
            pattern="{value} months"
            onValueChange={(value) => setLoanPeriod(value)}
          />
        </div>
        <div className="mt-10 space-y-2">
          <PriceLabel
            label="Estimated monthly interest"
            value={estimatedPayment.estimatedInterestPerMonth}
          />
          <PriceLabel
            label="Estimated monthly total payment"
            value={estimatedPayment.estimatedPaymentPerMonth}
          />
          <PriceLabel
            label="Estimated Total Interest"
            value={estimatedPayment.totalInterest}
          />
          <PriceLabel
            label="Estimated Total Payment"
            value={estimatedPayment.totalPayment}
          />
        </div>
        <ApplyButton size="lg" className="mt-10 !justify-center" />
      </CardContent>
    </Card>
  );
};

const PriceLabel = ({ label, value }: { label: string; value: number }) => {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <p className="text-light text-base text-gray-700/70 md:text-base">
        {label}
      </p>
      <div className="mx-2 h-0.5 flex-auto bg-app/20 md:mx-5" />
      <p className="text-lg font-extrabold text-app md:text-lg">
        $ {value.toFixed(0)}
      </p>
    </div>
  );
};

export default FlexibleLoanPricing;
