import React, { useEffect, useRef } from "react";
import {
  FormData,
  FormThreeData,
  formThreeDataSchema,
} from "@/schemas/form.schema";
import { useFormStore } from "@/stores/useFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Path, useForm, UseFormReturn } from "react-hook-form";
import { Form } from "../lib/form";
import { Button } from "../lib/button";
import BaseFormField from "../common/BaseFormField";
import { YES_NO_OPTIONS } from "@/constants/formOptions";
import { default as myAxios } from "@/lib/axios";
import axios from "axios";
import { toast } from "sonner";
import { StatusCodes } from "@/constants/http-status-codes";
import { useAuth } from "@/context/auth.context";
import useDialogStore from "@/stores/useDialogStore";
import Login from "../auth/Login";
import { User } from "firebase/auth";
import { LoanData } from "@/schemas/loan.schema";
import CancelForm from "./CancelForm";

const FormThree = () => {
  const { user, isAuthenticatedUser, signIn } = useAuth();
  const userRef = useRef<
    Record<
      string,
      {
        user: User | null;
        isAuthenticatedUser: boolean;
      } | null
    >
  >({}).current;
  userRef.value = { user, isAuthenticatedUser };

  const { openDialog, closeDialog } = useDialogStore();
  const {
    formThreeDefaultValues,
    getFormData,
    setFormData,
    setStep,
    setIsSubmittingApplication,
  } = useFormStore();

  const form = useForm<FormThreeData>({
    resolver: zodResolver(formThreeDataSchema),
    reValidateMode: "onChange",
    defaultValues: formThreeDefaultValues || undefined,
  });

  const haveExistingLoan = form.watch(
    "existingLoanDetails.hasExistingLoans.value",
  );

  useEffect(() => {
    form.reset(formThreeDefaultValues || undefined);
  }, [formThreeDefaultValues]);

  const submitKycApplication = async (formData: Partial<FormData> | null) => {
    if (!formData) {
      toast.error(`Incompleted data. Please filled in all the required field.`);
      return;
    }

    setIsSubmittingApplication(true);

    const userId = userRef.value?.isAuthenticatedUser
      ? userRef.value?.user?.uid
      : undefined;

    try {
      const endpoint = `/loan/submit`;
      const postData = {
        userId,
        applicationPayload: formData,
      };
      const response = await myAxios.post<{
        data: { newUserId: string | undefined };
      }>(endpoint, postData);
      const { newUserId } = response.data.data;

      if (newUserId) {
        // AUTO LOGIN USER if is newly created user
        await signIn(
          formData.contactDetails?.email.value as string,
          formData.personalDetails?.uinfin.value as string,
          () => {
            toast.success(
              `A new account has been registered with your email: ${formData.contactDetails?.email.value}. You have been automatically logged in.`,
            );
          },
        );
      }
      setStep(4);
    } catch (err) {
      console.log({
        err,
      });

      if (axios.isAxiosError(err) && err.status === StatusCodes.CONFLICT) {
        if (userId) {
          // mean there is active ongoing application
          toast.error(
            "An active application already exists. Please wait until it is processed.",
          );
          return;
        }
        toast.error(
          "Email already registered with an existing account. Please login to your account to submit your application.",
        );
        openDialog(
          <Login
            onLoginSuccess={async () => {
              closeDialog();
              await submitKycApplication(formData);
            }}
          />,
        );
        return;
      }

      toast.error(`Failed to submit application. Please try again.`);
    } finally {
      setIsSubmittingApplication(false);
    }
  };

  const handleSubmit = async (data: FormThreeData) => {
    setFormData(data);

    const formData = getFormData();
    await submitKycApplication(formData);
  };

  return (
    <Form {...form}>
      <form className="space-y-10" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormThreeSection form={form} haveExistingLoan={haveExistingLoan} />
        <div className="flex flex-wrap justify-end gap-4">
          <Button
            size="lg"
            type="button"
            variant="destructive"
            onClick={() => openDialog(<CancelForm />)}
          >
            Cancel
          </Button>
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
        </div>
      </form>
    </Form>
  );
};

export const FormThreeSection = <
  T extends Pick<LoanData, "existingLoanDetails">,
>({
  form,
  haveExistingLoan,
  isViewMode,
}: {
  form: UseFormReturn<T>;
  haveExistingLoan?: boolean;
  isViewMode?: boolean;
}) => {
  return (
    <>
      <div className="application__form-section">
        <h1 className="application__form-subtitle">Financial Information</h1>
        <BaseFormField
          form={form}
          fieldRef={
            "existingLoanDetails.isContactingWithAgency.value" as Path<T>
          }
          optionLabelRef={
            "existingLoanDetails.isContactingWithAgency.label" as Path<T>
          }
          label="Are you currently contacting with other agency / money lender?"
          type="radio"
          options={YES_NO_OPTIONS}
          disabled={isViewMode}
        />

        <BaseFormField
          form={form}
          fieldRef={"existingLoanDetails.hasExistingLoans.value" as Path<T>}
          optionLabelRef={
            "existingLoanDetails.hasExistingLoans.label" as Path<T>
          }
          label="Do you have any existing loans?"
          type="radio"
          options={YES_NO_OPTIONS}
          disabled={isViewMode}
        />

        {String(haveExistingLoan) === "true" && (
          <>
            <BaseFormField
              form={form}
              fieldRef={
                "existingLoanDetails.existingLoanFromBank.value" as Path<T>
              }
              label="Existing loan amount from bank"
              type="number"
              pattern="$ {value}"
              disabled={isViewMode}
            />

            <BaseFormField
              form={form}
              fieldRef={
                "existingLoanDetails.existingLoanFromNonBank.value" as Path<T>
              }
              label="Existing loan amount from non-bank (e.g. personal loan, moneylender)"
              type="number"
              pattern="$ {value}"
              disabled={isViewMode}
            />

            <BaseFormField
              form={form}
              fieldRef={
                "existingLoanDetails.monthlyRepaymentToBank.value" as Path<T>
              }
              label="Current monthly repayment to bank"
              type="number"
              pattern="$ {value}"
              disabled={isViewMode}
            />

            <BaseFormField
              form={form}
              fieldRef={
                "existingLoanDetails.monthlyRepaymentToNonBank.value" as Path<T>
              }
              label="Current monthly repayment to non-bank"
              type="number"
              pattern="$ {value}"
              disabled={isViewMode}
            />
          </>
        )}
      </div>
    </>
  );
};
export default FormThree;
