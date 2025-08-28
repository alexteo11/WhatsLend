"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/app/components/lib/form";
import { CreateLender, createLenderSchema } from "@/schemas/lender.schema";
import BaseFormField from "@/app/components/common/BaseFormField";
import { Button } from "@/app/components/lib/button";
import {
  ImageUploader,
  ImageUploaderComponentRef,
} from "@/app/components/lib/image-uploader";
import { LoaderWrapper } from "@/app/components/common/LoaderWrapper";
import { toast } from "sonner";
import { uploadImageToFirebase } from "@/lib/firebaseBucket";
import { getErrorMessage } from "@/helper/errorHelper";
import { authAxios } from "@/lib/axios";
import LoanCriteria from "@/app/lender/(auth)/profile/loan-criteria";
import z from "zod";
import { getImageSchema } from "@/schemas/image.schema";
import EmployeesDetails from "@/app/lender/(auth)/profile/employees-details";
import { Separator } from "@/app/components/lib/separator";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/queries/constants";
import { useRouter } from "next/navigation";

const AddLenderPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const imageUploaderRef = useRef<ImageUploaderComponentRef>(null);

  const imageSchema = z.object({
    image: getImageSchema(),
  });
  const lenderForm = useForm<CreateLender & { image?: File }>({
    resolver: zodResolver(createLenderSchema.merge(imageSchema)),
    defaultValues: {
      image: new File([""], "filename"),
      logoUrl: "sample",
      criteria: {},
    },
  });

  const subForm = useForm<CreateLender["criteria"]>({
    resolver: zodResolver(createLenderSchema.shape.criteria),
    reValidateMode: "onChange",
  });

  useEffect(() => {
    const subscription = subForm.watch((value) => {
      lenderForm.setValue("criteria", value);
    });

    return () => subscription.unsubscribe();
  }, [subForm, lenderForm]);

  const uploadCompanyImage = async (lenderId: string) => {
    const image = lenderForm.getValues().image;
    if (!image) {
      return;
    }
    const fileUrl = await uploadImageToFirebase(
      image,
      `profile/${lenderId}/profile-${new Date().getTime()}`,
    );
    lenderForm.setValue("logoUrl", fileUrl);
    await authAxios.post("/auth/lender/update", {
      ...lenderForm.getValues(),
      id: lenderId,
      logoUrl: fileUrl,
    });
  };

  const handleSubmit = async (data: CreateLender & { image?: File }) => {
    // after api call -> call upload company image
    setIsSubmitting(true);
    const { image: _, ..._data } = data;
    try {
      const response = await authAxios.post<{ data: string }>(
        "/auth/lender/create",
        _data,
      );
      const lenderId = response.data.data;
      await uploadCompanyImage(lenderId);
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.AdminGetLenders],
      });
      toast.success("Lender added successfully.");
      router.push("./");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="lender-page-title">Add New Lender</h1>
      <LoaderWrapper isLoading={isSubmitting}>
        <Form {...lenderForm}>
          <form
            className="mt-8"
            onSubmit={(e) => {
              e.preventDefault();
              if (lenderForm.formState.errors.image) {
                imageUploaderRef.current?.scrollIntoView();
              }
              return lenderForm.handleSubmit(handleSubmit)(e);
            }}
          >
            <div className="flex flex-row gap-8">
              <ImageUploader
                ref={imageUploaderRef}
                className="rounded-full"
                imgClassName="w-[250px] h-[250px]"
                form={lenderForm}
                imageRef="image"
                title=""
                imgCropShape="round"
                allowRemoveImage={false}
              />
              <div className="flex flex-auto flex-col gap-10">
                <div className="flex flex-auto flex-col gap-4">
                  <h1 className="text-2xl font-bold text-app underline">
                    Lender's Company Information
                  </h1>
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
                  <BaseFormField
                    form={lenderForm}
                    type="date"
                    label="License Expiry Date"
                    fieldRef="licenseExpiryDate"
                    calendarDisabledRange={() => {
                      return false;
                    }}
                  />
                  <BaseFormField
                    form={lenderForm}
                    type="phone"
                    label="Mobile No."
                    fieldRef="mobileNo"
                  />
                </div>

                <Separator />

                <div className="flex flex-auto flex-col gap-4">
                  <h1 className="text-2xl font-bold text-app underline">
                    Lender's Loan Matching Criteria
                  </h1>
                  <LoanCriteria form={subForm} />
                </div>

                <Separator />
                <div className="flex flex-auto flex-col gap-4">
                  <h1 className="text-2xl font-bold text-app underline">
                    Lender's Employees
                  </h1>
                  <EmployeesDetails lenderStaffs={[]} form={lenderForm} />
                </div>

                <div className="flex flex-row justify-end gap-4">
                  <Button
                    size="lg"
                    type="button"
                    onClick={() => {
                      console.log(lenderForm.formState.errors);
                      console.log(lenderForm.getValues());
                      if (lenderForm.formState.errors.image) {
                        imageUploaderRef.current?.scrollIntoView();
                      }
                    }}
                  >
                    test
                  </Button>

                  <Button size="lg">Add lenders</Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </LoaderWrapper>
    </div>
  );
};

export default AddLenderPage;
