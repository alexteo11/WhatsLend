import React, { useEffect } from "react";
import { FormTwoData, formTwoDataSchema } from "@/schemas/form.schema";
import { useFormStore } from "@/stores/useFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../lib/form";
import { Button } from "../lib/button";
import BaseFormField from "../common/BaseFormField";
import { formTwoDefaultValues } from "@/constants/formDefaultValues";
import {
  CURRENT_EMPLOYMENT_DURATION,
  HOUSING_STATUS_OPTIONS,
  HOUSING_STAY_DURATION,
  HOUSING_TYPE_OPTIONS,
  JOB_INDUSTRY_OPTIONS,
  JOB_TITLE_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  NATIONALITY_OPTIONS,
  PREVIOUS_EMPLOYMENT_DURATION,
  YES_NO_OPTIONS,
} from "@/constants/formEnums";

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
        <div className="application__form-section">
          <h1 className="application__form-subtitle">Personal Details</h1>
          <BaseFormField
            form={form}
            fieldRef="personalDetails.uinfin.value"
            label="NRIC / FIN"
            type="text"
            placeholder="S1234567A"
          />

          <BaseFormField
            form={form}
            fieldRef="personalDetails.civilStatus.value"
            optionLabelRef="personalDetails.civilStatus.label"
            label="Marital Status"
            type="select"
            options={MARITAL_STATUS_OPTIONS}
          />
        </div>

        <div className="application__form-section">
          <h1 className="application__form-subtitle">Employment Details</h1>
          <BaseFormField
            form={form}
            fieldRef="employmentDetails.jobTitle.value"
            optionLabelRef="employmentDetails.jobTitle.label"
            label="Job Title"
            type="select"
            options={JOB_TITLE_OPTIONS}
          />
          <BaseFormField
            form={form}
            fieldRef="employmentDetails.jobIndustry.value"
            optionLabelRef="employmentDetails.jobIndustry.label"
            label="Job Industry"
            type="select"
            options={JOB_INDUSTRY_OPTIONS}
          />
          <BaseFormField
            form={form}
            fieldRef="employmentDetails.timeAtCurrentEmployer.value"
            optionLabelRef="employmentDetails.timeAtCurrentEmployer.label"
            label="Time with Current Employer"
            type="select"
            options={CURRENT_EMPLOYMENT_DURATION}
          />
          <BaseFormField
            form={form}
            fieldRef="employmentDetails.timeAtPreviousEmployer.value"
            optionLabelRef="employmentDetails.timeAtPreviousEmployer.label"
            label="Time with Previous Employer"
            type="select"
            options={PREVIOUS_EMPLOYMENT_DURATION}
          />
        </div>

        <div className="application__form-section">
          <h1 className="application__form-subtitle">Housing Details</h1>
          <BaseFormField
            form={form}
            fieldRef="housingDetails.address.value"
            label="Address"
            type="text"
          />
          <BaseFormField
            form={form}
            fieldRef="housingDetails.unitNo.value"
            label="Unit No."
            type="text"
          />
          <BaseFormField
            form={form}
            fieldRef="housingDetails.postalCode.value"
            label="Postal Code"
            type="text"
          />
          <BaseFormField
            form={form}
            fieldRef="housingDetails.country.value"
            optionLabelRef="housingDetails.country.label"
            label="Country"
            type="select"
            options={NATIONALITY_OPTIONS}
          />

          <BaseFormField
            form={form}
            fieldRef="housingDetails.typeOfHousing.value"
            optionLabelRef="housingDetails.typeOfHousing.label"
            label="House Type"
            type="select"
            options={HOUSING_TYPE_OPTIONS}
          />

          <BaseFormField
            form={form}
            fieldRef="housingDetails.housingStatus.value"
            optionLabelRef="housingDetails.housingStatus.label"
            label="House Status"
            type="select"
            options={HOUSING_STATUS_OPTIONS}
          />

          <BaseFormField
            form={form}
            fieldRef="housingDetails.housingPeriod.value"
            optionLabelRef="housingDetails.housingPeriod.label"
            label="House Period"
            type="select"
            options={HOUSING_STAY_DURATION}
          />

          <BaseFormField
            form={form}
            fieldRef="housingDetails.hasProperty.value"
            optionLabelRef="housingDetails.hasProperty.label"
            label="Do you own this propery?"
            type="radio"
            options={YES_NO_OPTIONS}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            size="lg"
            variant={"outline"}
            type="button"
            onClick={() => setStep(1)}
          >
            Back
          </Button>
          <Button size="lg" type="button" onClick={() => setStep(3)}>
            Next Step
          </Button>
          <Button
            size="lg"
            type="button"
            onClick={() => console.log(form.getValues())}
          >
            Tesst
          </Button>
          <Button size="lg" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormTwo;
