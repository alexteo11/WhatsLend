"use client";

import { Navbar } from "@/app/components";
import BaseFormField from "@/app/components/common/BaseFormField";
import { LoaderWrapper } from "@/app/components/common/LoaderWrapper";
import LoanOfferDetailsDialog from "@/app/components/data-display/loan-offer-details-dialog";
import { Button } from "@/app/components/lib/button";
import { Card, CardContent } from "@/app/components/lib/card";
import { Form } from "@/app/components/lib/form";
import { getErrorMessage } from "@/helper/errorHelper";
import axios from "@/lib/axios";
import { useLoanApplicationDetailsQuery } from "@/queries/user/use-loan-application-details-query";
import { LoanData } from "@/schemas/loan.schema";
import { OfferPayLoad, offerPayloadSchema } from "@/schemas/offer.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// http://localhost:3000/lender/offer-loan?userId=2X0w1yfAz2UXt4LFKoHVBNwtaz62&email=qweqweqe@gmail.com&loanId=RXXrGrnyOEC3b1ovsoTU&lenderId=gZ4TUqUdbYMnwdqBIT5gRnkwAQ83
// http://localhost:3000/lender/offer-loan?loanId=RXXrGrnyOEC3b1ovsoTU&lenderId=gZ4TUqUdbYMnwdqBIT5gRnkwAQ83
const OfferLoanPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const loanId = searchParams.get("loanId") || "";
  const lenderId = searchParams.get("lenderId") || "";

  const [isLoading, setIsLoading] = React.useState(false);
  const [showLoanDetailsDialog, setShowLoanDetailsDialog] =
    React.useState(false);

  const {
    data: loanData,
    isLoading: isLoadingLoanDetails,
    refetch,
  } = useLoanApplicationDetailsQuery(loanId, true);

  const form = useForm<OfferPayLoad>({
    resolver: zodResolver(
      offerPayloadSchema.refine(
        (data) => {
          const max = Math.round((data.loanAmount || 0) * 0.1);
          return data.adminFee <= max;
        },
        {
          message: "Admin Fee cannot exceed 10% of the loan amount.",
          path: ["adminFee"],
        },
      ),
    ),
    reValidateMode: "onChange",
    defaultValues: {
      // TODO: ask William should we use jwt token to encrypt those
    },
  });

  useEffect(() => {
    if (loanData?.contactDetails?.email?.value) {
      form.setValue("email", loanData?.contactDetails?.email?.value);
    }
    if (loanData?.userId) {
      form.setValue("userId", loanData?.userId);
    }
  }, [loanData]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // PUBLIC API
      await axios.post(`offer/${loanId}/submit/${lenderId}`, form.getValues());
      router.replace("/lender/offer-loan/success");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoaderWrapper isLoading={isLoading || isLoadingLoanDetails}>
      <Navbar hideButtons defaultHomeRoute="#" />
      <div className="middle-container-width mt-[var(--nav-height)] w-[90%] space-y-4 py-8 md:!w-[60%] md:py-14">
        <h1 className="lender-page-title">Loan Offer Submission</h1>
        <p>
          Please fill out the form below to submit your loan offer to{" "}
          <b className="text-app">{loanData?.contactDetails.email.value}</b>.
        </p>
        <Button
          variant="outline"
          onClick={async () => {
            await refetch();
            setShowLoanDetailsDialog(true);
          }}
          isLoading={isLoadingLoanDetails}
        >
          View loan applications
        </Button>
        <br />
        <br />
        <Card>
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <BaseFormField
                  form={form}
                  fieldRef="email"
                  label="Email"
                  type="email"
                  disabled
                />

                <BaseFormField
                  form={form}
                  fieldRef="loanAmount"
                  label="Loan Amount ($)"
                  type="number"
                  pattern="$ {value}"
                />

                <BaseFormField
                  form={form}
                  fieldRef="tenureMonths"
                  label="Tenure Months"
                  type="number"
                  pattern="{value} months"
                />

                <BaseFormField
                  form={form}
                  fieldRef="interestRate"
                  label="Interest Rate per month (%)"
                  type="number"
                  pattern="{value} %"
                  description={`Maximum for Interest Rate is 4%.`}
                />

                <BaseFormField
                  form={form}
                  fieldRef="lateInterestRate"
                  label="Late Interest Rate per month (%)"
                  type="number"
                  pattern="{value} %"
                  description={`Maximum for Late Interest Rate is 4%`}
                />

                <BaseFormField
                  form={form}
                  fieldRef="adminFee"
                  label="Admin Fee - only 1 time charge ($)"
                  type="number"
                  pattern="$ {value}"
                  description={`Maximum for Admin Fee is 10% of the Loan Amount.`}
                />

                <BaseFormField
                  form={form}
                  fieldRef="lateChargeFees"
                  label="Late Charge Fees - charged per month ($)"
                  type="number"
                  pattern="$ {value}"
                  description={`Maximum for Late Charge Fees is $60.`}
                />

                <BaseFormField
                  form={form}
                  fieldRef="repaymentPeriod"
                  label="Repayment Period"
                  type="number"
                  pattern="{value} months"
                />

                <div className="flex justify-end pt-6">
                  <Button size="lg" type="submit">
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      {loanData && (
        <LoanOfferDetailsDialog
          isOpen={showLoanDetailsDialog}
          onOpenChange={setShowLoanDetailsDialog}
          loanData={loanData as NonNullable<LoanData>}
        />
      )}
    </LoaderWrapper>
  );
};

export default OfferLoanPage;
