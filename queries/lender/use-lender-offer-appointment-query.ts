import { toast } from "sonner";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { authAxios } from "@/lib/axios";
import { getErrorMessage } from "@/helper/errorHelper";
import { QUERY_KEY } from "../constants";
import { OfferData } from "@/schemas/offer.schema";
import { objectCompact } from "@/lib/objects";

interface LoanOfferFilter {
  date: {
    from: Date;
    to: Date;
  };
}

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
          date: { from: startDate, to: endDate },
        } = filter;

        const params = objectCompact({
          lenderId: lenderId,
          startDate: startDate?.toISOString(),
          endDate: endDate?.toISOString(),
        });

        const res = await authAxios.get<{
          data: OfferData[];
        }>(`/offer/listByAppointmentDate`, {
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
