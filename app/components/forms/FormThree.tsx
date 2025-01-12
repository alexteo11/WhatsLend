import React, { useEffect } from "react";
import { FormOneData, formOneDataSchema } from "@/schemas/form.schema";
import { useFormStore } from "@/stores/useFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../lib/form";
import PersonalInfoForm from "./PersonalInfoForm";
import { Button } from "../lib/button";
import BaseFormField from "../common/BaseFormField";
import { SOURCES_ENUM } from "@/schemas/common.schema";
import { useRouter } from "next/navigation";

const FormThree = () => {
  const router = useRouter();

  const { formOneDefaultValues, setFormData, setStep } = useFormStore();

  const form = useForm<FormOneData>({
    resolver: zodResolver(formOneDataSchema),
    defaultValues: formOneDefaultValues || undefined,
  });

  useEffect(() => {
    form.reset(formOneDefaultValues || undefined);
  }, [formOneDefaultValues]);

  const handleSubmit = (data: FormOneData) => {
    console.log(`here`);
    // setFormData(data);
    setStep(4);
  };

  const switchMode = () => {
    router.push("./application?source=mib");
  };

  const test = () => {
    console.log(form.getValues());
    console.log(form.formState);
    setStep(2);
    window.scrollTo(0, 0);
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
        {/* <div className="application__form-section">
          <h1 className="application__form-subtitle">Loan Details</h1>
          <div className="flex flex-row gap-4 [&>*]:flex-1">
            <BaseFormField
              form={form}
              fieldRef="loanDetails.loanAmount.value"
              label="Loan Amount"
              type="number"
              placeholder="20000"
            />

            <BaseFormField
              form={form}
              fieldRef="loanDetails.loanTenure.value"
              optionLabelRef="loanDetails.loanTenure.label"
              label="Loan Tenure"
              type="select"
              options={[{ value: "1", label: "1 year" }]}
            />
          </div>

          <BaseFormField
            form={form}
            fieldRef="loanDetails.loanPurpose.value"
            label="Loan Purpose"
            type="text"
          />
        </div>

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
            type="text"
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
          />
        </div> */}

        {/* <Button type="submit">Submit</Button> */}
        <Button onClick={() => handleSubmit({} as FormOneData)}>Submit</Button>

        {/* <Button type="button" onClick={switchMode}>
          Switch
        </Button>
        <Button type="button" onClick={test}>
          Test
        </Button> */}
      </form>
    </Form>
  );
};

export default FormThree;
