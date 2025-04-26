"use client";

import { LoaderWrapper } from "@/app/components/common/LoaderWrapper";
import { FormOneSection } from "@/app/components/forms/FormOne";
import FormSkeleton from "@/app/components/forms/FormSkeleton";
import { FormThreeSection } from "@/app/components/forms/FormThree";
import { FormTwoSection } from "@/app/components/forms/FormTwo";
import { Button } from "@/app/components/lib/button";
import { Card, CardContent } from "@/app/components/lib/card";
import { Form } from "@/app/components/lib/form";
import { useAuth } from "@/context/auth.context";
import { getErrorMessage } from "@/helper/errorHelper";
import { authAxios } from "@/lib/axios";
import { QUERY_KEY } from "@/queries/constants";
import { useMyLoanApplicationsQuery } from "@/queries/use-my-loan-applications-query";
import { LoanData, loanSchema } from "@/schemas/loan.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

enum ActionMode {
  View = "view",
  Modify = "modify",
}

const ViewModifyApplicationPage = ({
  params,
}: {
  params: Promise<{ applicationId: string }>;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const actionMode = searchParams.get("mode") as ActionMode;

  const { user } = useAuth();

  const { applicationId } = React.use(params);
  const { data, isLoading } = useMyLoanApplicationsQuery(user?.uid);
  const [isSubmittingForm, setIsSubmittingForm] = React.useState(false);

  const selectedApplication = useMemo(() => {
    return data?.find((item) => item.id === applicationId);
  }, [applicationId, data]);

  return (
    <LoaderWrapper isLoading={isSubmittingForm}>
      <div className="middle-container-width py-8 md:!w-[60%] md:py-14">
        <Card>
          <CardContent className="p-8 md:p-10">
            {!selectedApplication || isLoading ? (
              <FormSkeleton />
            ) : (
              <FormContent
                selectedApplication={selectedApplication}
                actionMode={actionMode}
                setIsSubmittingForm={setIsSubmittingForm}
              />
            )}
          </CardContent>
        </Card>
        <div className="fixed left-[7.5%] top-[calc(var(--nav-height)+16px)] opacity-90 md:left-[12.5%] md:top-[calc(var(--nav-height)+56px)]">
          <Button
            className="aspect-square !h-[50px] rounded-full"
            onClick={() => router.back()}
          >
            <ArrowLeftIcon className="aspect-auto rounded-full" />
          </Button>
        </div>
      </div>
    </LoaderWrapper>
  );
};

const FormContent = ({
  selectedApplication,
  actionMode,
  setIsSubmittingForm,
}: {
  selectedApplication: LoanData;
  actionMode: ActionMode;
  setIsSubmittingForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<LoanData>({
    resolver: zodResolver(loanSchema),
    defaultValues: selectedApplication || undefined,
    values: selectedApplication || undefined,
    reValidateMode: "onChange",
  });

  const haveExistingLoan = form.watch(
    "existingLoanDetails.hasExistingLoans.value",
  );

  const handleSubmit = async (data: LoanData) => {
    // call API
    setIsSubmittingForm(true);
    try {
      await authAxios.post("/loan/resubmit", data);
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MyLoanApplications],
      });
      toast.success("Application resubmitted successfully.");
      router.back();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-10" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormOneSection
          form={form}
          isViewMode={actionMode === ActionMode.View}
        />
        <FormTwoSection
          form={form}
          isViewMode={actionMode === ActionMode.View}
        />
        <FormThreeSection
          form={form}
          haveExistingLoan={haveExistingLoan}
          isViewMode={actionMode === ActionMode.View}
        />
        <div className="flex justify-end gap-4">
          <Button
            size="lg"
            variant="outline"
            type="button"
            onClick={() => router.back()}
          >
            Back
          </Button>

          {actionMode === ActionMode.Modify && (
            <Button size="lg" type="submit">
              Modify
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default ViewModifyApplicationPage;
