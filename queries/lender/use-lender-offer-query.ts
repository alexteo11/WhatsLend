import { toast } from "sonner";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { authAxios } from "@/lib/axios";
import { getErrorMessage } from "@/helper/errorHelper";
import { QUERY_KEY } from "../constants";
import { OfferData } from "@/schemas/offer.schema";
import { objectCompact } from "@/lib/objects";
import { LoanDataTableFilter } from "@/types/dataTable.types";

export const useLenderOfferQuery = (
  lenderId: string,
  filter: LoanDataTableFilter,
) => {
  const isEnabled = !!lenderId && !!filter;

  return useQuery({
    queryKey: [
      QUERY_KEY.LenderOffer,
      lenderId,
      filter.status,
      filter.date.from,
      filter.date.to,
    ],
    queryFn: async () => {
      if (!filter || !filter.date?.from || !filter.date?.to) {
        return [];
      }
      try {
        const {
          status,
          date: { from: startDate, to: endDate },
        } = filter;

        const params = objectCompact({
          lenderId: lenderId,
          status: status === "all" ? undefined : status,
          startDate: startDate?.toISOString(),
          endDate: endDate?.toISOString(),
        });

        const res = await authAxios.get<{
          data: OfferData[];
        }>(`/offer/list`, {
          params,
        });
        return res.data.data;
      } catch (err) {
        toast.error(getErrorMessage(err));
        throw new Error("Something went wrong.");
      }
    },
    enabled: isEnabled,
    placeholderData: keepPreviousData,
  });
};
