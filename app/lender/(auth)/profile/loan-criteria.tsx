import BaseFormField from "@/app/components/common/BaseFormField";
import { Input } from "@/app/components/lib/input";
import { YES_NO_OPTIONS } from "@/constants/formOptions";
import { CreateLender } from "@/schemas/lender.schema";
import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

const LoanCriteria = ({
  form,
}: {
  form: UseFormReturn<CreateLender["criteria"]>;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <MinMaxNumberField
        form={form}
        label="1. Loan Amount"
        minFieldRef="minLoanAmount"
        maxFieldRef="maxLoanAmount"
        pattern={"$ {value}"}
      />
      <MinMaxNumberField
        form={form}
        label="2. Loan Tenure"
        minFieldRef="minLoanTenure"
        maxFieldRef="maxLoanTenure"
        pattern={"{value} months"}
      />
      <MinMaxNumberField
        form={form}
        label="3. Borrower Age"
        minFieldRef="minBorrowerAge"
        maxFieldRef="maxBorrowerAge"
      />

      <OptionalField
        form={form}
        label="4. Borrower Minumum Monthly Income"
        fieldRef="borrowerMinMonthlyIncome"
      >
        <BaseFormField
          form={form}
          type="number"
          label=""
          fieldRef="borrowerMinMonthlyIncome"
          pattern={"$ {value}"}
        />
      </OptionalField>

      <OptionalField
        form={form}
        label="5. Borrower Has Existing Loan"
        fieldRef="hasExistingLoan"
      >
        <BaseFormField
          form={form}
          type="radio"
          label=""
          fieldRef="hasExistingLoan"
          options={YES_NO_OPTIONS}
        />
      </OptionalField>
    </div>
  );
};

const MinMaxNumberField = ({
  form,
  label,
  minFieldRef,
  maxFieldRef,
  pattern,
}: {
  form: UseFormReturn<CreateLender["criteria"]>;
  label: string;
  minFieldRef: keyof CreateLender["criteria"];
  maxFieldRef: keyof CreateLender["criteria"];
  pattern?: string;
}) => {
  const [isChecked, setIsChecked] = useState(
    form.getValues(minFieldRef) != null && form.getValues(maxFieldRef) != null,
  );

  useEffect(() => {
    if (!isChecked) {
      form.setValue(minFieldRef, undefined);
      form.setValue(maxFieldRef, undefined);
      return;
    }
  }, [isChecked]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-4">
        <span className="font-semibold underline">{label}</span>
        <Input
          className="h-4 w-4 bg-app text-app accent-app"
          type="checkbox"
          checked={isChecked}
          onChange={(val) => {
            setIsChecked(val.currentTarget.checked);
          }}
        />
        <div className="flex-auto" />
      </div>
      {isChecked && (
        <div className="flex flex-row gap-4 rounded-xl bg-app/10 p-4">
          <div className="flex-1">
            <BaseFormField
              form={form}
              type="number"
              label="Minimum"
              fieldRef={minFieldRef}
              pattern={pattern}
            />
          </div>

          <div className="mx-4 flex translate-y-4 items-center justify-center text-center">
            to
          </div>
          <div className="flex-1">
            <BaseFormField
              form={form}
              type="number"
              label="Maximum"
              fieldRef={maxFieldRef}
              pattern={pattern}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const OptionalField = ({
  children,
  form,
  fieldRef,
  label,
}: {
  form: UseFormReturn<CreateLender["criteria"]>;
  fieldRef: keyof CreateLender["criteria"];
  label: string;
} & React.HtmlHTMLAttributes<HTMLDivElement>) => {
  const [isChecked, setIsChecked] = useState(
    form.getValues(fieldRef) != undefined,
  );

  useEffect(() => {
    if (!isChecked) {
      form.setValue(fieldRef, undefined);
      return;
    }
  }, [isChecked]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-4">
        <span className="font-semibold underline">{label}</span>
        <Input
          className="h-4 w-4 bg-app text-app accent-app"
          type="checkbox"
          checked={isChecked}
          onChange={(val) => {
            setIsChecked(val.currentTarget.checked);
          }}
        />
        <div className="flex-auto" />
      </div>
      {isChecked && <div className="rounded-xl bg-app/15 p-4">{children}</div>}
    </div>
  );
};

export default LoanCriteria;
