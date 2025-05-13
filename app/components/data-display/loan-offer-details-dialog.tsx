import BaseDialog, {
  BaseDialogProps,
} from "@/app/components/common/BaseDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/lib/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/lib/tabs";
import { OfferData } from "@/schemas/offer.schema";
import React, { useEffect, useMemo, useState } from "react";
import LoanDetailsInfo from "./loan-details-info";
import OfferDetailInfo from "./offer-details-info";
import { LoanData } from "@/schemas/loan.schema";
import { cn } from "@/lib/utils";
import { useLoanApplicationDetailsQuery } from "@/queries/use-loan-application-details-query";
import { Loader2 } from "lucide-react";

// loanData = must have
// offerData = optional
interface OfferDetailDialogProps extends BaseDialogProps {
  loanData?: LoanData;
  offerData?: OfferData;
}

const LoanOfferDetailsDialog = ({
  isOpen,
  onOpenChange,
  offerData,
  loanData,
}: OfferDetailDialogProps) => {
  const { data, isLoading, refetch } = useLoanApplicationDetailsQuery(
    offerData?.loanId,
  );
  const [_loanData, setLoanData] = useState<LoanData | undefined>(loanData);

  useEffect(() => {
    // if already fetched data, reuse it
    if (data && offerData?.loanId === _loanData?.id) {
      return;
    }

    if (!offerData?.loanId) {
      return;
    }

    (async () => {
      await refetch();
      setLoanData(data);
    })();
  }, [offerData?.loanId, data]);

  const showLoading = useMemo(() => {
    if (!offerData) {
      return false;
    }
    return isLoading;
  }, [offerData, isLoading]);

  return (
    <BaseDialog isOpen={isOpen} onOpenChange={onOpenChange}>
      <div className="w-[50vw] min-w-[300px] p-10">
        <Tabs defaultValue={offerData ? "offerDetails" : "loanDetails"}>
          <TabsList
            className={(cn("w-full"), offerData ? "grid grid-cols-2" : "flex")}
          >
            {offerData && (
              <TabsTrigger value="offerDetails">Offer Details</TabsTrigger>
            )}
            <TabsTrigger value="loanDetails" className="w-full">
              Loan Details
            </TabsTrigger>
          </TabsList>
          {offerData && (
            <TabsContent value="offerDetails">
              <Card>
                <CardHeader className="pb-0">
                  <CardTitle className="text-xl text-app">
                    Offer Details
                  </CardTitle>
                  <CardDescription className="text-light-gray">
                    The following information is related to the offer you sent.
                    You can view and edit the information as needed.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <OfferDetailInfo offerData={offerData} />
                </CardContent>
              </Card>
            </TabsContent>
          )}
          <TabsContent value="loanDetails">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-xl text-app">Loan Details</CardTitle>
                <CardDescription className="text-light-gray">
                  Below are the detailed terms and conditions of the loan offer
                  you are about to accept. Please review them carefully to
                  ensure you understand all aspects of the loan agreement.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {_loanData && !showLoading ? (
                  <LoanDetailsInfo loanData={_loanData} />
                ) : (
                  <div className="flex h-[300px] items-center justify-center">
                    <Loader2 className="size-10 animate-spin items-center text-app" />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </BaseDialog>
  );
};

export default LoanOfferDetailsDialog;
