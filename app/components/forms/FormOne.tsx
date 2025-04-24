import React from "react";
import { FormOneData, formOneDataSchema } from "@/schemas/form.schema";
import { useFormStore } from "@/stores/useFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, Path, useForm, UseFormReturn } from "react-hook-form";
import { Form } from "../lib/form";
import { Button } from "../lib/button";
import BaseFormField from "../common/BaseFormField";
import SliderField from "../common/SliderField";
import {
  MARITAL_STATUS_OPTIONS,
  NATIONALITY_OPTIONS,
  PASS_STATUS_OPTIONS,
  PASS_TYPE_OPTIONS,
  RACE_OPTIONS,
  RESIDENTIAL_STATUS_OPTIONS,
  SEX_OPTIONS,
} from "@/constants/formEnums";
import { LoanData } from "@/schemas/loan.schema";

const FormOne = () => {
  const { formOneDefaultValues, setFormData, setStep } = useFormStore();

  const form = useForm<FormOneData>({
    resolver: zodResolver(formOneDataSchema),
    defaultValues: formOneDefaultValues || undefined,
    reValidateMode: "onChange",
  });

  const handleSubmit = (data: FormOneData) => {
    setFormData(data);
    setStep(2);
  };

  return (
    <Form {...form}>
      <form className="space-y-10" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormOneSection form={form} />

        <div className="flex justify-end">
          {/* <Button size="lg" onClick={() => setStep(2)}>
            Test Next
          </Button>
          <Button size="lg" onClick={() => console.log(form.formState.errors)}>
            Test Error
          </Button> */}
          <Button size="lg" type="submit">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

export const FormOneSection = <
  T extends Pick<
    LoanData,
    "personalDetails" | "contactDetails" | "loanDetails"
  >,
>({
  form,
  isViewMode,
}: {
  form: UseFormReturn<T>;
  isViewMode?: boolean;
}) => {
  return (
    <>
      <div className="application__form-section">
        <h1 className="application__form-subtitle">Personal Details</h1>
        <BaseFormField
          form={form}
          fieldRef={"personalDetails.fullName.value" as Path<T>}
          label="Full Name"
          type="text"
          disabled={isViewMode}
        />
        <BaseFormField
          form={form}
          fieldRef={"personalDetails.uinfin.value" as Path<T>}
          label="NRIC / FIN"
          type="text"
          placeholder="S1234567A"
          disabled={isViewMode}
        />
        <BaseFormField
          form={form}
          fieldRef={"personalDetails.dob.value" as Path<T>}
          label="Date of Birth"
          type="date"
          disabled={isViewMode}
        />
        <BaseFormField
          form={form}
          fieldRef={"personalDetails.birthCountry.value" as Path<T>}
          optionLabelRef={"personalDetails.birthCountry.label" as Path<T>}
          label="Birth Country"
          type="select"
          options={NATIONALITY_OPTIONS}
          disabled={isViewMode}
        />
        <BaseFormField
          form={form}
          fieldRef={"personalDetails.sex.value" as Path<T>}
          optionLabelRef={"personalDetails.sex.label" as Path<T>}
          label="Gender"
          type="radio"
          options={SEX_OPTIONS}
          disabled={isViewMode}
        />
        <BaseFormField
          form={form}
          fieldRef={"personalDetails.passType.value" as Path<T>}
          label="Passport Type"
          type="select"
          options={PASS_TYPE_OPTIONS}
          disabled={isViewMode}
        />
        <div className="flex w-full flex-wrap gap-4 [&>div]:w-full md:[&>div]:flex-1">
          <BaseFormField
            form={form}
            fieldRef={"personalDetails.passStatus.value" as Path<T>}
            label="Passport Status"
            type="select"
            options={PASS_STATUS_OPTIONS}
            disabled={isViewMode}
          />
          <BaseFormField
            form={form}
            fieldRef={"personalDetails.passExpiryDate.value" as Path<T>}
            label="Passport Expiry Date"
            type="date"
            calendarDisabledRange={() => {
              return false;
            }}
            disabled={isViewMode}
          />
        </div>
        <div className="flex w-full flex-wrap gap-4 [&>div]:w-full md:[&>div]:flex-1">
          <BaseFormField
            form={form}
            fieldRef={"personalDetails.race.value" as Path<T>}
            optionLabelRef={"personalDetails.race.label" as Path<T>}
            label="Race"
            type="select"
            options={RACE_OPTIONS}
            disabled={isViewMode}
          />
          <BaseFormField
            form={form}
            fieldRef={"personalDetails.nationality.value" as Path<T>}
            optionLabelRef={"personalDetails.nationality.label" as Path<T>}
            label="Nationality"
            type="select"
            options={NATIONALITY_OPTIONS}
            disabled={isViewMode}
          />
        </div>
        <div className="flex w-full flex-wrap gap-4 [&>div]:w-full md:[&>div]:flex-1">
          <BaseFormField
            form={form}
            fieldRef={"personalDetails.residentialStatus.value" as Path<T>}
            optionLabelRef={
              "personalDetails.residentialStatus.label" as Path<T>
            }
            label="Residency Status"
            type="select"
            options={RESIDENTIAL_STATUS_OPTIONS}
            disabled={isViewMode}
          />
          <BaseFormField
            form={form}
            fieldRef={"personalDetails.maritalStatus.value" as Path<T>}
            optionLabelRef={"personalDetails.maritalStatus.label" as Path<T>}
            label="Marital Status"
            type="select"
            options={MARITAL_STATUS_OPTIONS}
            disabled={isViewMode}
          />
        </div>
      </div>

      <div className="application__form-section">
        <h1 className="application__form-subtitle">Contact Details</h1>
        <BaseFormField
          form={form}
          fieldRef={"contactDetails.email.value" as Path<T>}
          label="Email"
          type="email"
          placeholder="johndoe@gmail.com"
          disabled={isViewMode}
        />
        <BaseFormField
          form={form}
          fieldRef={"contactDetails.mobileNo.value" as Path<T>}
          label="Mobile Number"
          type="phone"
          placeholder="+6595556969"
          disabled={isViewMode}
        />
      </div>

      <div className="application__form-section">
        <h1 className="application__form-subtitle">Loan Details</h1>
        <SliderField
          form={form}
          fieldRef={"loanDetails.loanAmount.value" as Path<T>}
          label="Loan Amount"
          min={1000}
          max={50000}
          step={1000}
          placeholder="$ 50,000"
          pattern="$ {value}"
          disabled={isViewMode}
        />
        <SliderField
          form={form}
          fieldRef={"loanDetails.loanTenure.value" as Path<T>}
          label="Loan Period (months)"
          min={3}
          max={120}
          step={1}
          pattern="{value} months"
          disabled={isViewMode}
        />

        <BaseFormField
          form={form}
          fieldRef={"loanDetails.loanPurpose.value" as Path<T>}
          label="Loan Purpose"
          type="text"
          placeholder="e.g. House Renovation"
          disabled={isViewMode}
        />
      </div>
    </>
  );
};

export default FormOne;
