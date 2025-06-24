import React, { useEffect } from "react";
import { FormTwoData, formTwoDataSchema } from "@/schemas/form.schema";
import { useFormStore } from "@/stores/useFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Path, useForm, UseFormReturn } from "react-hook-form";
import { Form } from "../lib/form";
import { Button } from "../lib/button";
import BaseFormField from "../common/BaseFormField";
import { formTwoDefaultValues } from "@/constants/formDefaultValues";
import {
  CURRENT_EMPLOYMENT_DURATION,
  EMPLOYMENT_STATUS_OPTIONS,
  HDB_TYPE_OPTIONS,
  HOUSING_TYPE_OPTIONS,
  JOB_INDUSTRY_OPTIONS,
  NATIONALITY_OPTIONS,
  OCCUPATIONS_OPTIONS,
  PREVIOUS_EMPLOYMENT_DURATION,
} from "@/constants/formOptions";
import { LoanData } from "@/schemas/loan.schema";

const FormTwo = () => {
  const { formOneDefaultValues, setFormData, setStep } = useFormStore();

  const form = useForm<FormTwoData>({
    resolver: zodResolver(formTwoDataSchema),
    reValidateMode: "onChange",
    defaultValues: formTwoDefaultValues,
  });

  useEffect(() => {
    form.reset(formTwoDefaultValues || undefined);
  }, [formOneDefaultValues]);

  const handleSubmit = (data: FormTwoData) => {
    setFormData(data);
    setStep(3);
  };

  return (
    <Form {...form}>
      <form className="space-y-10" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormTwoSection form={form} />
        <div className="flex justify-end gap-4">
          <Button
            size="lg"
            variant={"outline"}
            type="button"
            onClick={() => setStep(1)}
          >
            Back
          </Button>
          <Button size="lg" type="submit">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

export const FormTwoSection = <
  T extends Pick<LoanData, "employmentDetails" | "housingDetails">,
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
        <h1 className="application__form-subtitle">Employment Details</h1>
        <BaseFormField
          form={form}
          fieldRef={"employmentDetails.occupation.value" as Path<T>}
          label="Occupation"
          type="textAutoComplete"
          options={OCCUPATIONS_OPTIONS}
          disabled={isViewMode}
        />
        <BaseFormField
          form={form}
          fieldRef={"employmentDetails.employmentStatus.value" as Path<T>}
          optionLabelRef={"employmentDetails.employmentStatus.label" as Path<T>}
          label="Employment Status"
          type="select"
          options={EMPLOYMENT_STATUS_OPTIONS}
          disabled={isViewMode}
        />
        <BaseFormField
          form={form}
          fieldRef={"employmentDetails.monthlyIncome.value" as Path<T>}
          label="Monthly Income"
          type="number"
          pattern="$ {value}"
          disabled={isViewMode}
        />
        <div className="flex w-full flex-wrap gap-4 [&>div]:w-full md:[&>div]:flex-1 md:[&>div]:overflow-hidden">
          <BaseFormField
            form={form}
            fieldRef={"employmentDetails.employerName.value" as Path<T>}
            label="Employer Name"
            type="text"
            disabled={isViewMode}
          />
          <div>
            <BaseFormField
              form={form}
              fieldRef={"employmentDetails.employmentSector.value" as Path<T>}
              label="Employment Sector"
              type="textAutoComplete"
              options={JOB_INDUSTRY_OPTIONS}
              disabled={isViewMode}
            />
          </div>
        </div>
        <div className="flex w-full flex-wrap gap-4 [&>div]:w-full md:[&>div]:flex-1">
          <BaseFormField
            form={form}
            fieldRef={
              "employmentDetails.timeAtCurrentEmployer.value" as Path<T>
            }
            optionLabelRef={
              "employmentDetails.timeAtCurrentEmployer.label" as Path<T>
            }
            label="Time with Current Employer"
            type="select"
            options={CURRENT_EMPLOYMENT_DURATION}
            disabled={isViewMode}
          />
          <BaseFormField
            form={form}
            fieldRef={
              "employmentDetails.timeAtPreviousEmployer.value" as Path<T>
            }
            optionLabelRef={
              "employmentDetails.timeAtPreviousEmployer.label" as Path<T>
            }
            label="Time with Previous Employer"
            type="select"
            options={PREVIOUS_EMPLOYMENT_DURATION}
            disabled={isViewMode}
          />
        </div>
      </div>

      <div className="application__form-section">
        <h1 className="application__form-subtitle">Housing Details</h1>
        <BaseFormField
          form={form}
          fieldRef={"housingDetails.address.value" as Path<T>}
          label="Address"
          type="text"
          disabled={isViewMode}
        />

        <div className="flex w-full flex-wrap gap-4 [&>div]:w-full md:[&>div]:flex-1">
          <BaseFormField
            form={form}
            fieldRef={"housingDetails.unitNo.value" as Path<T>}
            label="Unit No."
            type="text"
            disabled={isViewMode}
          />
          <BaseFormField
            form={form}
            fieldRef={"housingDetails.postalCode.value" as Path<T>}
            label="Postal Code"
            type="text"
            disabled={isViewMode}
          />
        </div>

        <div className="flex w-full flex-wrap gap-4 [&>div]:w-full md:[&>div]:flex-1">
          <BaseFormField
            form={form}
            fieldRef={"housingDetails.housingType.value" as Path<T>}
            optionLabelRef={"housingDetails.housingType.label" as Path<T>}
            label="House Type"
            type="select"
            options={HOUSING_TYPE_OPTIONS}
            disabled={isViewMode}
          />
          <BaseFormField
            form={form}
            fieldRef={"housingDetails.hdbType.value" as Path<T>}
            optionLabelRef={"housingDetails.hdbType.label" as Path<T>}
            label="HDB Type"
            type="select"
            options={HDB_TYPE_OPTIONS}
            disabled={isViewMode}
          />
        </div>
        <div className="flex w-full flex-wrap gap-4 [&>div]:w-full md:[&>div]:flex-1">
          <BaseFormField
            form={form}
            fieldRef={"housingDetails.country.value" as Path<T>}
            optionLabelRef={"housingDetails.country.label" as Path<T>}
            label="Country"
            type="select"
            options={NATIONALITY_OPTIONS}
            disabled={isViewMode}
          />
          <div></div>
        </div>
      </div>
    </>
  );
};

export default FormTwo;
