import { toast } from "sonner";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { authAxios } from "@/lib/axios";
import { getErrorMessage } from "@/helper/errorHelper";
import { QUERY_KEY } from "../constants";
import { objectCompact } from "@/lib/objects";
import { UserApplicationHistoryDataTableFilter } from "@/types/dataTable.types";
import { LoanData } from "@/schemas/loan.schema";

export const useAdminGetApplicationHistoryQuery = (
  filter: UserApplicationHistoryDataTableFilter,
) => {
  return useQuery({
    queryKey: [
      QUERY_KEY.AdminGetUserApplicationHistory,
      filter.status,
      filter.email,
    ],
    queryFn: async () => {
      try {
        const { status } = filter;
        const params = objectCompact({
          status: status === "all" ? undefined : status,
        });

        const res = await authAxios.get<{
          data: LoanData[];
        }>(`/loan/list`, {
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
