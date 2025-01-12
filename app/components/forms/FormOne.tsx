import React from "react";
import { FormOneData, formOneDataSchema } from "@/schemas/form.schema";
import { useFormStore } from "@/stores/useFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../lib/form";
import { Button } from "../lib/button";
import BaseFormField from "../common/BaseFormField";
import SliderField from "../common/SliderField";

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
      <form
        className="space-y-10"
        onSubmit={form.handleSubmit((value) => {
          console.log(`hereee`);
          handleSubmit(value);
        })}
      >
        <div className="application__form-section">
          <h1 className="application__form-subtitle">General Information</h1>
          <BaseFormField
            form={form}
            fieldRef="generalInformation.fullName.value"
            label="Full Name"
            type="text"
          />
          <BaseFormField
            form={form}
            fieldRef="generalInformation.dob.value"
            label="Date of Birth"
            type="date"
          />
          <div className="flex w-full flex-wrap gap-4 [&>div]:w-full md:[&>div]:flex-1">
            <BaseFormField
              form={form}
              fieldRef="generalInformation.residencyStatus.value"
              optionLabelRef="generalInformation.residencyStatus.label"
              label="Residency Status"
              type="select"
              options={[{ value: "1", label: "Singapore" }]}
            />
            <BaseFormField
              form={form}
              fieldRef="generalInformation.nationality.value"
              optionLabelRef="generalInformation.nationality.label"
              label="Nationality"
              type="select"
              options={[{ value: "1", label: "Singaporean" }]}
            />
          </div>
        </div>

        <div className="application__form-section">
          <h1 className="application__form-subtitle">Contact Details</h1>
          <BaseFormField
            form={form}
            fieldRef="contactDetails.email.value"
            label="Email"
            type="email"
          />
          <BaseFormField
            form={form}
            fieldRef="contactDetails.mobileNo.value"
            label="Mobile Number"
            type="phone"
            placeholder="+6595556969"
          />
        </div>

        <div className="application__form-section">
          <h1 className="application__form-subtitle">Income Details</h1>
          <BaseFormField
            form={form}
            fieldRef="incomeDetails.employmentStatus.value"
            optionLabelRef="incomeDetails.employmentStatus.label"
            label="Employment Status"
            type="select"
            options={[{ value: "1", label: "Employed" }]}
          />
          <BaseFormField
            form={form}
            fieldRef="incomeDetails.monthlyIncome.value"
            label="Monthly Income"
            type="number"
            pattern="$ {value}"
          />
        </div>

        <div className="application__form-section">
          <h1 className="application__form-subtitle">Loan Details</h1>
          <div className="flex flex-row gap-4 [&>*]:flex-1"></div>
          <SliderField
            form={form}
            fieldRef="loanDetails.loanAmount.value"
            label="Loan Amount"
            min={1000}
            max={50000}
            step={1000}
            placeholder="$ 50,000"
            pattern="$ {value}"
          />
          <SliderField
            form={form}
            fieldRef="loanDetails.loanTenure.value"
            label="Loan Period (months)"
            min={3}
            max={120}
            step={1}
            pattern="{value} months"
          />

          <BaseFormField
            form={form}
            fieldRef="loanDetails.loanPurpose.value"
            label="Loan Purpose"
            type="text"
            placeholder="e.g. House Renovation"
          />
        </div>

        <div className="flex justify-end">
          <Button size="lg" onClick={() => setStep(2)}>
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormOne;
