import { toast } from "sonner";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { authAxios } from "@/lib/axios";
import { getErrorMessage } from "@/helper/errorHelper";
import { QUERY_KEY } from "../constants";
import { OfferData } from "@/schemas/offer.schema";
import { objectCompact } from "@/lib/objects";
import { LoanDataTableFilter } from "@/types/dataTable.types";

export const useAdminGetApplicationOfferQuery = (
  filter: LoanDataTableFilter,
) => {
  return useQuery({
    queryKey: [
      QUERY_KEY.AdminGetLenderApplicationOffer,
      filter.status,
      filter.date.from,
      filter.date.to,
      filter.lenderId,
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
          status: status === "all" ? undefined : status,
          startDate: startDate?.toISOString(),
          endDate: endDate?.toISOString(),
          lenderId: filter.lenderId === "all" ? undefined : filter.lenderId,
        });

        const res = await authAxios.get<{
          data: (OfferData & { lenderName: string })[];
        }>(`/offer/list`, {
          params,
        });
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
