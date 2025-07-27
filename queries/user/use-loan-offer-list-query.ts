import { authAxios } from "@/lib/axios";
import { toast } from "sonner";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getErrorMessage } from "@/helper/errorHelper";
import { QUERY_KEY } from "../constants";
import { OfferData } from "@/schemas/offer.schema";

export const useLoanOfferListQuery = (loanId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.LoanOfferList, loanId],
    queryFn: async () => {
      try {
        const res = await authAxios.get<{ data: OfferData[] }>(
          `offer/${loanId}/list`,
        );
        return res.data.data;
      } catch (err) {
        toast.error(getErrorMessage(err));
        throw new Error("Something went wrong.");
      }
    },
    enabled: false,
    placeholderData: keepPreviousData,
  });
};
