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
import { OfferData } from "@/schemas/offer.schema";
import React from "react";
import OfferDetailInfo from "./offer-details-info";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "../lib/select";
import { OFFER_STATUS_ENUM } from "@/constants/commonEnums";

interface OfferDetailDialogProps extends BaseDialogProps {
  offerDataList: OfferData[];
}

const OfferDetailsDialog = ({
  isOpen,
  onOpenChange,
  offerDataList,
}: OfferDetailDialogProps) => {
  const [selectedOfferData, setSelectedOfferData] = React.useState<OfferData>(
    offerDataList[0],
  );

  return (
    <BaseDialog isOpen={isOpen} onOpenChange={onOpenChange}>
      <div className="w-[50vw] min-w-[300px] p-10">
        <Card className="shadow-none">
          <CardHeader className="pb-0">
            <CardTitle className="text-xl text-app">
              {/* TODO: updated with lender actual name */}
              Offer Details - {selectedOfferData?.id}
            </CardTitle>
            <CardDescription className="pb-4 text-light-gray">
              The following information is related to the offer provided from
              multiple lenders. You can review and select the best offer.
            </CardDescription>
            <span className="text-sm text-light-gray">Offer from : </span>
            <Select
              value={selectedOfferData?.id}
              onValueChange={(value) => {
                const item = offerDataList.find(
                  (offerData) => offerData.id === value,
                );
                if (item) {
                  setSelectedOfferData(item);
                }
              }}
            >
              <SelectTrigger className="application__form-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="z-[1001]">
                {offerDataList.map((offerData) => (
                  <SelectItem
                    key={offerData.id}
                    value={offerData.id}
                    className="h-[42px] hover:bg-accent"
                  >
                    {/* TODO: updated with lender actual name */}
                    {offerData.status === OFFER_STATUS_ENUM.ACCEPTED
                      ? `${offerData.id} - Accepted ✅`
                      : offerData.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <OfferDetailInfo offerData={selectedOfferData} />
          </CardContent>
        </Card>
      </div>
    </BaseDialog>
  );
};

export default OfferDetailsDialog;
