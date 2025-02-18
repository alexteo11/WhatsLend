import React, { useEffect } from "react";
import { FormThreeData, formThreeDataSchema } from "@/schemas/form.schema";
import { useFormStore } from "@/stores/useFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../lib/form";
import { Button } from "../lib/button";
import BaseFormField from "../common/BaseFormField";
import { YES_NO_OPTIONS } from "@/constants/formEnums";

const FormThree = () => {
  const { formThreeDefaultValues, setFormData, setStep } = useFormStore();

  const form = useForm<FormThreeData>({
    resolver: zodResolver(formThreeDataSchema),
    reValidateMode: "onChange",
    defaultValues: formThreeDefaultValues || undefined,
  });

  const haveExistingLoan = form.watch("hasExistingLoans.value");

  useEffect(() => {
    form.reset(formThreeDefaultValues || undefined);
  }, [formThreeDefaultValues]);

  const handleSubmit = (data: FormThreeData) => {
    console.log(`here`);
    setFormData(data);
    setStep(4);
  };

  return (
    <Form {...form}>
      <form className="space-y-10" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="application__form-section">
          <h1 className="application__form-subtitle">Financial Information</h1>
          <BaseFormField
            form={form}
            fieldRef="isContactingWithAgency.value"
            optionLabelRef="isContactingWithAgency.label"
            label="Are you currently contacting with other agency / money lender?"
            type="radio"
            options={YES_NO_OPTIONS}
          />

          <BaseFormField
            form={form}
            fieldRef="hasExistingLoans.value"
            optionLabelRef="hasExistingLoans.label"
            label="Do you have any existing loans?"
            type="radio"
            options={YES_NO_OPTIONS}
          />

          {String(haveExistingLoan) === "true" && (
            <>
              <BaseFormField
                form={form}
                fieldRef="existingLoanFromBank.value"
                label="Existing loan amount from bank"
                type="number"
                pattern="$ {value}"
              />

              <BaseFormField
                form={form}
                fieldRef="existingLoanFromNonBank.value"
                label="Existing loan amount from non-bank (e.g. personal loan, moneylender)"
                type="number"
                pattern="$ {value}"
              />

              <BaseFormField
                form={form}
                fieldRef="monthlyRepaymentToBank.value"
                label="Current monthly repayment to bank"
                type="number"
                pattern="$ {value}"
              />

              <BaseFormField
                form={form}
                fieldRef="monthlyRepaymentToNonBank.value"
                label="Current monthly repayment to non-bank"
                type="number"
                pattern="$ {value}"
              />
            </>
          )}
        </div>
        <div className="flex justify-end gap-4">
          <Button
            size="lg"
            variant={"outline"}
            type="button"
            onClick={() => setStep(2)}
          >
            Back
          </Button>
          <Button size="lg" type="submit">
            Submit
          </Button>
          <Button
            size="lg"
            type="button"
            onClick={() =>
              console.log({
                errors: form.formState.errors,
                value: form.getValues(),
              })
            }
          >
            Test
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormThree;
