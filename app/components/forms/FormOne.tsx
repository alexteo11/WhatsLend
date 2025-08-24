import React, { useEffect } from "react";
import { FormOneData, formOneDataSchema } from "@/schemas/form.schema";
import { useFormStore } from "@/stores/useFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Path, PathValue, useForm, UseFormReturn } from "react-hook-form";
import { Form } from "../lib/form";
import { Button } from "../lib/button";
import BaseFormField from "../common/BaseFormField";
import SliderField from "../common/SliderField";
import {
  COUNTRY_PLACE_OPTIONS,
  foreignIdType,
  ID_TYPE_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  NATIONALITY_OPTIONS,
  PASS_STATUS_OPTIONS,
  PASS_TYPE_OPTIONS,
  RACE_OPTIONS,
  RESIDENTIAL_STATUS_OPTIONS,
  SEX_OPTIONS,
} from "@/constants/formOptions";
import { LoanData } from "@/schemas/loan.schema";
import useDialogStore from "@/stores/useDialogStore";
import CancelForm from "./CancelForm";
import { SOURCES_ENUM } from "@/schemas/common.schema";
import { Separator } from "../lib/separator";

const FormOne = () => {
  const { openDialog } = useDialogStore();
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

        <div className="flex flex-wrap justify-end gap-4">
          <Button
            size="lg"
            type="button"
            variant="destructive"
            onClick={() => openDialog(<CancelForm />)}
          >
            Cancel
          </Button>

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
  const passExpiryDate = form.watch(
    "personalDetails.passExpiryDate.value" as Path<T>,
  );

  const idType = form.watch("personalDetails.idType.value" as Path<T>);

  useEffect(() => {
    if (passExpiryDate) {
      const isLivePass = new Date(passExpiryDate as Date) > new Date();

      form.setValue(
        "personalDetails.passStatus" as Path<T>,
        {
          value: isLivePass
            ? PASS_STATUS_OPTIONS[0].value
            : PASS_STATUS_OPTIONS[1].value,
          source: SOURCES_ENUM.MANUAL,
        } as PathValue<T, Path<T>>,
      );
    }
  }, [passExpiryDate]);

  useEffect(() => {
    if (idType !== foreignIdType) {
      if (
        form.getValues("personalDetails.passType.source" as Path<T>) ===
        SOURCES_ENUM.MANUAL
      ) {
        form.resetField("personalDetails.passType" as Path<T>);
      }

      if (
        form.getValues("personalDetails.passStatus.source" as Path<T>) ===
        SOURCES_ENUM.MANUAL
      ) {
        form.resetField("personalDetails.passStatus" as Path<T>);
      }

      if (
        form.getValues("personalDetails.passExpiryDate.source" as Path<T>) ===
        SOURCES_ENUM.MANUAL
      ) {
        form.resetField("personalDetails.passExpiryDate" as Path<T>);
      }
    }
  }, [idType]);

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
          fieldRef={"personalDetails.uinfin.value" as Path<T>}
          form={form}
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
          options={COUNTRY_PLACE_OPTIONS}
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
            disabled={isViewMode == undefined ? false : isViewMode}
          />
        </div>

        <BaseFormField
          form={form}
          fieldRef={"personalDetails.idType.value" as Path<T>}
          optionLabelRef={"personalDetails.idType.label" as Path<T>}
          label="ID Type"
          type="select"
          options={ID_TYPE_OPTIONS}
          disabled={isViewMode}
        />

        {idType === foreignIdType && (
          <div className="flex w-full flex-wrap gap-4 [&>div]:w-full md:[&>div]:flex-1">
            <BaseFormField
              form={form}
              fieldRef={"personalDetails.passType.value" as Path<T>}
              optionLabelRef={"personalDetails.passType.label" as Path<T>}
              label="Pass Type"
              type="select"
              options={PASS_TYPE_OPTIONS}
              disabled={isViewMode}
            />
            <BaseFormField
              form={form}
              fieldRef={"personalDetails.passExpiryDate.value" as Path<T>}
              label="Pass Expiry Date"
              type="date"
              calendarDisabledRange={() => {
                return false;
              }}
              disabled={isViewMode}
            />
          </div>
        )}
      </div>

      <br />
      <Separator />

      <div className="application__form-section">
        <h1 className="application__form-subtitle">Contact Details</h1>
        <BaseFormField
          form={form}
          fieldRef={"contactDetails.email.value" as Path<T>}
          label="Email"
          type="email"
          placeholder="johndoe@gmail.com"
          disabled={isViewMode == undefined ? false : isViewMode}
        />
        <BaseFormField
          form={form}
          fieldRef={"contactDetails.mobileNo.value" as Path<T>}
          label="Mobile Number"
          type="phone"
          placeholder="+6595556969"
          disabled={isViewMode == undefined ? false : isViewMode}
        />
      </div>

      <br />
      <Separator />

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
