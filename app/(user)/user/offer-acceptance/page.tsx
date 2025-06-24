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
import { userLoanOfferDetailsQuery } from "@/queries/user/use-loan-offer-details-query";
import { LoanData } from "@/schemas/loan.schema";
import {
  AppointmentDetailsData,
  appointmentSchema,
  OfferData,
  offerPayloadSchema,
} from "@/schemas/offer.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import BaseDialog from "../../../components/common/BaseDialog";
import { OFFER_STATUS_ENUM } from "@/constants/commonEnums";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/app/components/lib/carousel";
import CarouselAutoHeight from "embla-carousel-auto-height";
import Image from "next/image";

// http://localhost:3000/user/offer-acceptance?offerId=1JPHz8SHoV0mm44mivk7
const OfferAcceptancePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const offerId = searchParams.get("offerId") || "";

  const [isLoading, setIsLoading] = React.useState(false);
  const [showLoanDetailsDialog, setShowLoanDetailsDialog] =
    React.useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [step, setStep] = useState(1);

  const { data: offerData, isLoading: isLoadingOfferData } =
    userLoanOfferDetailsQuery(offerId);

  const [showRejectDialog, setShowRejectDialog] = React.useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }
    api.scrollTo(step - 1);

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);
    setTimeout(() => {
      api.reInit();
      api.emit("resize");
    }, 1000);
  }, [step]);

  const {
    data: loanData,
    isLoading: isLoadingLoanDetails,
    refetch,
  } = useLoanApplicationDetailsQuery(offerData?.loanId);

  const form = useForm<OfferData>({
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
    values: offerData,
  });

  const appointmentForm = useForm<AppointmentDetailsData>({
    resolver: zodResolver(appointmentSchema),
    reValidateMode: "onChange",
  });

  const handleSubmit = () => {
    setStep(2);
  };

  const onBackClick = () => {
    setStep(1);
  };

  const onAcceptClick = async (appointmentData: AppointmentDetailsData) => {
    setIsLoading(true);
    try {
      // PUBLIC API
      await axios.put(`offer/${offerId}/status`, {
        status: OFFER_STATUS_ENUM.BORROWER_ACCEPTED,
        appointmentDetails: appointmentData,
      });
      router.replace("/user/offer-acceptance/success?action=accepted");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const onRejectClick = () => {
    setShowRejectDialog(true);
  };

  const onConfirmRejectClick = async () => {
    setIsLoading(true);
    try {
      // PUBLIC API
      await axios.put(`offer/${offerId}/status`, {
        status: OFFER_STATUS_ENUM.BORROWER_REJECTED,
      });
      router.replace("/user/offer-acceptance/success?action=rejected");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  if (!offerData) {
    return (
      <LoaderWrapper isLoading>
        <div />
      </LoaderWrapper>
    );
  }

  return (
    <LoaderWrapper isLoading={isLoading || isLoadingOfferData}>
      <Navbar hideButtons defaultHomeRoute="#" />
      <div className="middle-container-width mt-[var(--nav-height)] w-[90%] md:!w-[60%]">
        {[
          OFFER_STATUS_ENUM.BORROWER_ACCEPTED,
          OFFER_STATUS_ENUM.BORROWER_REJECTED,
          OFFER_STATUS_ENUM.EXPIRED,
        ].includes(offerData.status) ? (
          <AlreadyProcessed status={offerData.status} />
        ) : (
          <Carousel
            draggable={false}
            opts={{
              startIndex: step - 1,
              watchDrag: false,
              watchFocus: false,
              watchResize: (emblaApi, entries) => {
                // https://github.com/davidjerleke/embla-carousel/issues/910#issuecomment-2162274395
                for (const entry of entries) {
                  if (emblaApi.containerNode() === entry.target) return true;

                  window.requestAnimationFrame(() => {
                    emblaApi.reInit();
                    emblaApi.emit("resize");
                  });

                  break;
                }

                return true;
              },
              disableKeyBinding: true,
            }}
            setApi={setApi}
            plugins={[CarouselAutoHeight()]}
          >
            <CarouselContent className="my-16 flex items-start">
              <CarouselItem className="space-y-4 px-5">
                <h1 className="lender-page-title">
                  Loan Offer Acceptance / Rejection
                </h1>
                <p>
                  Please review the loan offer details below and decide whether
                  to <b>accept</b> or <b>reject</b> it.
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
                    {form.getValues("id") && (
                      <Form {...form}>
                        <form
                          className="space-y-4"
                          onSubmit={form.handleSubmit(handleSubmit)}
                        >
                          <BaseFormField
                            form={form}
                            fieldRef="loanAmount"
                            label="Loan Amount ($)"
                            type="number"
                            pattern="$ {value}"
                            disabled
                          />

                          <BaseFormField
                            form={form}
                            fieldRef="tenureMonths"
                            label="Tenure Months"
                            type="number"
                            pattern="{value} months"
                            disabled
                          />

                          <BaseFormField
                            form={form}
                            fieldRef="interestRate"
                            label="Interest Rate per month (%)"
                            type="number"
                            pattern="{value} %"
                            description={`Maximum for Interest Rate is 4%.`}
                            disabled
                          />

                          <BaseFormField
                            form={form}
                            fieldRef="lateInterestRate"
                            label="Late Interest Rate per month (%)"
                            type="number"
                            pattern="{value} %"
                            description={`Maximum for Late Interest Rate is 4%`}
                            disabled
                          />

                          <BaseFormField
                            form={form}
                            fieldRef="adminFee"
                            label="Admin Fee - only 1 time charge ($)"
                            type="number"
                            pattern="$ {value}"
                            description={`Maximum for Admin Fee is 10% of the Loan Amount.`}
                            disabled
                          />

                          <BaseFormField
                            form={form}
                            fieldRef="lateChargeFees"
                            label="Late Charge Fees - charged per month ($)"
                            type="number"
                            pattern="$ {value}"
                            description={`Maximum for Late Charge Fees is $60.`}
                            disabled
                          />

                          <BaseFormField
                            form={form}
                            fieldRef="repaymentPeriod"
                            label="Repayment Period"
                            type="number"
                            pattern="{value} months"
                            disabled
                          />

                          <div className="flex justify-end gap-4 pt-6">
                            <Button
                              size="lg"
                              variant="destructive"
                              onClick={onRejectClick}
                              type="button"
                            >
                              Reject
                            </Button>
                            <Button size="lg" type="submit">
                              Accept
                            </Button>
                          </div>
                        </form>
                      </Form>
                    )}
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <h1 className="lender-page-title">Loan Offer Acceptance</h1>
                <p>
                  Please fill in the form belows in order to proceed your
                  request.
                </p>
                <br />
                <br />
                <Card>
                  <CardContent>
                    <Form {...appointmentForm}>
                      <form
                        className="flex flex-col space-y-4"
                        onSubmit={appointmentForm.handleSubmit(onAcceptClick)}
                      >
                        <BaseFormField
                          form={appointmentForm}
                          type="date"
                          granularity="minute"
                          fieldRef="appointmentDateTime"
                          label="Appointment Date and Time"
                          calendarDisabledRange={(date) => date < new Date()}
                        />

                        <BaseFormField
                          form={appointmentForm}
                          type="text"
                          fieldRef="appointmentLocation"
                          label="Appointment Location"
                        />

                        <div className="flex flex-row justify-end gap-4">
                          <Button
                            size="lg"
                            variant="outline"
                            type="button"
                            onClick={onBackClick}
                          >
                            Back
                          </Button>
                          <Button size="lg" type="submit">
                            Confirm Accept
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        )}
      </div>
      {loanData && (
        <LoanOfferDetailsDialog
          isOpen={showLoanDetailsDialog}
          onOpenChange={setShowLoanDetailsDialog}
          loanData={loanData as NonNullable<LoanData>}
        />
      )}

      <BaseDialog isOpen={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <div className="flex flex-col items-center justify-center gap-4 p-8">
          <h1 className="text-center text-2xl text-app">
            Offer Reject Confirmation
          </h1>
          <p className="text-sm text-light-gray">
            Are you sure you want to reject this offer? This action cannot be
            undone.
          </p>
          <div className="mt-6 flex w-full flex-row justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => setShowRejectDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={onConfirmRejectClick}>
              Confirm Reject
            </Button>
          </div>
        </div>
      </BaseDialog>
    </LoaderWrapper>
  );
};

const AlreadyProcessed = ({ status }: { status: OFFER_STATUS_ENUM }) => {
  const statusText = useMemo(() => {
    if (status === OFFER_STATUS_ENUM.BORROWER_ACCEPTED) {
      return "accepted by you previously";
    }
    if (status === OFFER_STATUS_ENUM.BORROWER_REJECTED) {
      return "rejected by you previously";
    }
    return "expired";
  }, [status]);

  return (
    <div className="flex h-[80vh] items-center justify-center gap-4">
      <div className="flex w-[300px] flex-col items-center space-y-6">
        <Image
          src="../../../result-not-found.svg"
          width={200}
          height={200}
          alt="result-not-found"
        />
        <h1 className="text-center text-lg text-light-gray">
          This offer is already {statusText}. This request no longer needs to be
          processed.
        </h1>
      </div>
    </div>
  );
};

export default OfferAcceptancePage;
