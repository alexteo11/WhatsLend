"use client";

import BaseDialog from "@/app/components/common/BaseDialog";
import BaseFormField from "@/app/components/common/BaseFormField";
import { LoaderWrapper } from "@/app/components/common/LoaderWrapper";
import { Button } from "@/app/components/lib/button";
import { Form } from "@/app/components/lib/form";
import {
  ImageUploader,
  ImageUploaderComponentRef,
} from "@/app/components/lib/image-uploader";
import { EITHER_YES_NO_OPTIONS } from "@/constants/formOptions";
import { useAuth } from "@/context/auth.context";
import { getErrorMessage } from "@/helper/errorHelper";
import { authAxios } from "@/lib/axios";
import { uploadImageToFirebase } from "@/lib/firebaseBucket";
import { QUERY_KEY } from "@/queries/constants";
import { useLenderRetrieveProfileQuery } from "@/queries/lender/use-lender-retrieve-profile-query";
import { Lender, lenderSchema } from "@/schemas/lender.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const imageUploaderRef = useRef<ImageUploaderComponentRef>(null);
  const { lenderId } = useAuth();
  const { data, isLoading } = useLenderRetrieveProfileQuery();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [showLenderEmployeesDialog, setShowLenderEmployeesDialog] =
    useState(false);
  const [showLoanCriteriaDialog, setShowLoanCriteriaDialog] = useState(false);

  const lenderForm = useForm<Lender & { image?: File }>({
    resolver: zodResolver(lenderSchema),
    defaultValues: {},
    values: data?.lender,
    reValidateMode: "onChange",
  });

  const uploadCompanyImage = async () => {
    const image = lenderForm.getValues().image;
    if (!image) {
      return;
    }
    setIsSubmitting(true);
    try {
      const fileUrl = await uploadImageToFirebase(
        image,
        `profile/${lenderId}/profile-${new Date().getTime()}`,
      );
      lenderForm.setValue("logoUrl", fileUrl);
      await handleSubmit(lenderForm.getValues());
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const logoUrl = lenderForm.watch("logoUrl");
  const imageWatch = lenderForm.watch("image");

  useEffect(() => {
    console.log("here");
    if (imageWatch) {
      uploadCompanyImage();
    }
  }, [imageWatch]);

  const handleSubmit = async (data: Lender & { image?: File }) => {
    const { image: _image, ..._data } = data;
    setIsSubmitting(true);
    try {
      await authAxios.post("/auth/lender/update", _data);
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.LenderProfile],
      });
      toast.success("Profile updated successfully.");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const restoreDefaultData = async () => {
    setIsResetting(true);
    lenderForm.reset();
    if (data?.lender?.licenseExpiryDate) {
      lenderForm.setValue(
        "licenseExpiryDate",
        new Date(data?.lender?.licenseExpiryDate),
      );
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
    setIsResetting(false);
  };

  const onViewLoanCriteriaClick = () => {
    setShowLoanCriteriaDialog(true);
  };

  const onViewAllLenderEmployeesClick = () => {
    setShowLenderEmployeesDialog(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="lender-page-title">Profile</h1>
      <LoaderWrapper isLoading={isLoading || isSubmitting || isResetting}>
        <Form {...lenderForm}>
          <form
            className="mt-8"
            onSubmit={lenderForm.handleSubmit(handleSubmit)}
          >
            {lenderForm.getValues("id") && (
              <div className="flex flex-row gap-8">
                <div className="flex flex-[0.5] flex-col items-center gap-4">
                  <ImageUploader
                    ref={imageUploaderRef}
                    className="rounded-full"
                    imgClassName="w-[250px] h-[250px]"
                    form={lenderForm}
                    imageRef="image"
                    title=""
                    imgCropShape="round"
                    defaultImage={logoUrl}
                    allowRemoveImage={false}
                  />
                  <div className="flex flex-col gap-4">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => imageUploaderRef?.current?.onClick()}
                    >
                      Update Company Image
                    </Button>
                    <Button type="button" onClick={onViewLoanCriteriaClick}>
                      View / Edit Loan Criteria
                    </Button>
                    <Button
                      type="button"
                      onClick={onViewAllLenderEmployeesClick}
                    >
                      View All Employees
                    </Button>
                  </div>
                </div>
                <div className="flex flex-auto flex-col gap-4">
                  <BaseFormField
                    form={lenderForm}
                    type="text"
                    label="Name"
                    fieldRef="name"
                  />
                  <BaseFormField
                    form={lenderForm}
                    type="text"
                    label="Address"
                    fieldRef="address"
                  />
                  <BaseFormField
                    form={lenderForm}
                    type="text"
                    label="Postal Code"
                    fieldRef="postalCode"
                  />
                  <BaseFormField
                    form={lenderForm}
                    type="text"
                    label="Postal District"
                    fieldRef="postalDistrict"
                  />
                  <BaseFormField
                    form={lenderForm}
                    type="text"
                    label="Business Registration No."
                    fieldRef="businessRegistrationNumber"
                  />
                  <BaseFormField
                    form={lenderForm}
                    type="text"
                    label="Reference Number"
                    fieldRef="referenceNumber"
                  />
                  <BaseFormField
                    form={lenderForm}
                    type="text"
                    label="License Number & Year"
                    fieldRef="licenseNumberAndYear"
                  />
                  {!isResetting && (
                    <BaseFormField
                      form={lenderForm}
                      type="date"
                      label="License Expiry Date"
                      fieldRef="licenseExpiryDate"
                      calendarDisabledRange={() => {
                        return false;
                      }}
                    />
                  )}
                  <BaseFormField
                    form={lenderForm}
                    type="text"
                    label="Mobile No."
                    fieldRef="mobileNo"
                  />
                  <div className="flex flex-row justify-end gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={restoreDefaultData}
                    >
                      Restore Default
                    </Button>
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </Form>
      </LoaderWrapper>
      <BaseDialog
        isOpen={showLenderEmployeesDialog}
        onOpenChange={setShowLenderEmployeesDialog}
      >
        <div className="min-w-[450px] p-10">
          <h1 className="text-center text-2xl text-app">All Employees</h1>
          {data?.staffs && data?.staffs?.length > 0 ? (
            <div className="mt-10 flex flex-col gap-8">
              {data.staffs.map((staff, index) => (
                <div key={index} className="flex flex-col gap-4">
                  <h2 className="text-xl underline">Employees {index + 1}</h2>
                  <div className="flex flex-wrap">
                    <span className="flex-1">Name: </span>
                    <span className="flex-2">{staff.name}</span>
                  </div>
                  <div className="flex flex-wrap">
                    <span className="flex-1">Email: </span>
                    <span className="flex-2">{staff.email}</span>
                  </div>
                  <div className="flex flex-wrap">
                    <span className="flex-1">Mobile No: </span>
                    <span className="flex-2">{staff.mobileNo}</span>
                  </div>
                  <div className="flex flex-wrap">
                    <span className="flex-1">Position: </span>
                    <span className="flex-2">{staff.position}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">No Employees Found</div>
          )}
        </div>
      </BaseDialog>

      {data?.lender && (
        <LoanCriteriaDialog
          data={data.lender}
          showLoanCriteriaDialog={showLoanCriteriaDialog}
          setShowLoanCriteriaDialog={setShowLoanCriteriaDialog}
        />
      )}
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
  form: UseFormReturn<Lender["criteria"]>;
  label: string;
  minFieldRef: keyof Lender["criteria"];
  maxFieldRef: keyof Lender["criteria"];
  pattern?: string;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <span className="font-bold underline">{label}</span>
      <div className="flex flex-row gap-4">
        <BaseFormField
          form={form}
          type="number"
          label="Minimum"
          fieldRef={minFieldRef}
          pattern={pattern}
        />
        <div className="mx-4 flex translate-y-4 items-center justify-center text-center">
          to
        </div>
        <BaseFormField
          form={form}
          type="number"
          label="Maximum"
          fieldRef={maxFieldRef}
          pattern={pattern}
        />
      </div>
    </div>
  );
};

const LoanCriteriaDialog = ({
  data,
  showLoanCriteriaDialog,
  setShowLoanCriteriaDialog,
}: {
  data: Lender;
  showLoanCriteriaDialog: boolean;
  setShowLoanCriteriaDialog: (open: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loanCriteriaForm = useForm<Lender["criteria"]>({
    resolver: zodResolver(lenderSchema.shape.criteria),
    values: data.criteria,
    reValidateMode: "onChange",
    context: lenderSchema.shape.criteria._type,
  });

  const handleSubmit = async (updatedData: Lender["criteria"]) => {
    setIsSubmitting(true);
    try {
      await authAxios.post("/auth/lender/update", {
        ...data,
        criteria: updatedData,
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.LenderProfile],
      });
      setShowLoanCriteriaDialog(false);
      toast.success("Loan Criteria updated successfully.");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseDialog
      isOpen={showLoanCriteriaDialog}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          loanCriteriaForm.reset(data.criteria);
        }
        setShowLoanCriteriaDialog(isOpen);
      }}
    >
      <LoaderWrapper isLoading={isSubmitting}>
        <div className="min-w-[450px] p-10">
          <h1 className="text-center text-2xl text-app">Loan Criteria</h1>
          <div className="mt-8 flex flex-col gap-8">
            <Form {...loanCriteriaForm}>
              <form
                className="space-y-4"
                onSubmit={loanCriteriaForm.handleSubmit(handleSubmit)}
              >
                <MinMaxNumberField
                  form={loanCriteriaForm}
                  label="Loan Amount"
                  minFieldRef="minLoanAmount"
                  maxFieldRef="maxLoanAmount"
                  pattern={"$ {value}"}
                />
                <MinMaxNumberField
                  form={loanCriteriaForm}
                  label="Loan Tenure"
                  minFieldRef="minLoanTenure"
                  maxFieldRef="maxLoanTenure"
                  pattern={"$ {value}"}
                />
                <MinMaxNumberField
                  form={loanCriteriaForm}
                  label="Borrower Age"
                  minFieldRef="minBorrowerAge"
                  maxFieldRef="maxBorrowerAge"
                />

                <BaseFormField
                  form={loanCriteriaForm}
                  type="number"
                  label="Borrower Minumum Monthly Income"
                  fieldRef="borrowerMinMonthlyIncome"
                />

                <BaseFormField
                  form={loanCriteriaForm}
                  type="select"
                  label="Borrower Has Existing Loan"
                  fieldRef="hasExistingLoan"
                  options={EITHER_YES_NO_OPTIONS}
                />

                <div className="flex flex-row justify-end gap-4">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => {
                      setShowLoanCriteriaDialog(false);
                      loanCriteriaForm.reset(data.criteria);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button>Save Changes</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </LoaderWrapper>
    </BaseDialog>
  );
};

export default ProfilePage;
