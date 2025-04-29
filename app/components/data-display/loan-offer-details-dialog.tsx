 
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
import React from "react";
import LoanDetailsInfo from "./loan-details-info";
import OfferDetailInfo from "./offer-details-info";
import { LoanData } from "@/schemas/loan.schema";
import { cn } from "@/lib/utils";

interface OfferDetailDialogProps extends BaseDialogProps {
  loanData: LoanData;
  offerData?: OfferData;
}

const LoanOfferDetailsDialog = ({
  isOpen,
  onOpenChange,
  loanData,
  offerData,
}: OfferDetailDialogProps) => {
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
                <LoanDetailsInfo loanData={loanData} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </BaseDialog>
  );
};

export default LoanOfferDetailsDialog;
