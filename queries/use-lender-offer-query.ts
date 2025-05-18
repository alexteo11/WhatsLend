import { toast } from "sonner";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { authAxios } from "@/lib/axios";
import { getErrorMessage } from "@/helper/errorHelper";
import { QUERY_KEY } from "./constants";
import { LoanOfferFilter } from "@/app/lender/(auth)/offer/data-table";
import { OfferData } from "@/schemas/offer.schema";
import { objectCompact } from "@/lib/objects";

export const useLenderOfferQuery = (
  lenderId: string,
  filter?: LoanOfferFilter,
) => {
  const isEnabled = !!lenderId && !!filter;

  return useQuery({
    queryKey: [
      QUERY_KEY.LenderOffer,
      lenderId,
      //   filter?.keyword,
      filter?.status,
      filter?.date?.from,
      filter?.date?.to,
      //   filter?.pagination?.pageIndex,
      //   filter?.pagination?.pageSize,
      //   filter?.sorting?.id,
      //   filter?.sorting?.desc,
    ],
    queryFn: async () => {
      if (!filter || !filter.date?.from || !filter.date?.to) {
        return [];
      }
      try {
        const {
          //   keyword,
          status,
          date: { from: start_date, to: end_date },
          //   pagination: { pageIndex: page, pageSize: limit },
          //   sorting: { id: sortBy, desc },
        } = filter;

        const params = objectCompact({
          lender_id: lenderId,
          //   email: keyword,
          status: status === "all" ? undefined : status,
          start_date: start_date?.toISOString(),
          end_date: end_date?.toISOString(),
          //   page,
          //   limit,
          //   sortBy,
          //   sortDirection: desc ? "desc" : "asc",
        });

        const res = await authAxios.get<{
          data: OfferData[];
        }>(`/offer/list`, {
          params,
        });
        return res.data.data;
      } catch (err) {
        toast.error(getErrorMessage(err));
        throw new Error("Something went wrong mtfk");
      }
    },
    enabled: isEnabled,
    placeholderData: keepPreviousData,
  });
};
