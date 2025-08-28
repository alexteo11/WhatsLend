import { toast } from "sonner";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { getErrorMessage } from "@/helper/errorHelper";
import { QUERY_KEY } from "../constants";
import { OfferData } from "@/schemas/offer.schema";

export const userLoanOfferDetailsQuery = (offerId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.LoanOfferDetails, offerId],
    queryFn: async () => {
      try {
        const res = await axios.get<{ data: OfferData }>(
          `/offer/${offerId}/offerDetails`,
        );
        return res.data.data;
      } catch (err) {
        toast.error(getErrorMessage(err));
        throw new Error("Something went wrong.");
      }
    },
    enabled: true,
    placeholderData: keepPreviousData,
  });
};
