import { toast } from "sonner";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { authAxios } from "@/lib/axios";
import { getErrorMessage } from "@/helper/errorHelper";
import { QUERY_KEY } from "./constants";
import { LoanOfferFilter } from "@/app/lender/(auth)/offer/data-table";
import { OfferData } from "@/schemas/offer.schema";
import { objectCompact } from "@/lib/objects";

export const useLenderOfferAppointmentQuery = (
  lenderId: string,
  filter?: LoanOfferFilter,
) => {
  const isEnabled = !!lenderId && !!filter;

  return useQuery({
    queryKey: [
      QUERY_KEY.LenderOffer,
      lenderId,
      filter?.date?.from,
      filter?.date?.to,
    ],
    queryFn: async () => {
      if (!filter || !filter.date?.from || !filter.date?.to) {
        return [];
      }
      try {
        const {
          date: { from: start_date, to: end_date },
        } = filter;

        const params = objectCompact({
          lender_id: lenderId,
          start_date: start_date?.toISOString(),
          end_date: end_date?.toISOString(),
        });

        const res = await authAxios.get<{
          data: OfferData[];
        }>(`/offer/listByAppointmentDate`, {
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
