import { toast } from "sonner";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { authAxios } from "@/lib/axios";
import { getErrorMessage } from "@/helper/errorHelper";
import { QUERY_KEY } from "../constants";
import { objectCompact } from "@/lib/objects";
import { LendersDataTableFilter } from "@/types/dataTable.types";
import { Lender } from "@/schemas/lender.schema";
import { LenderStaff } from "@/schemas/lenderStaff.schema";

export const useAdminGetLendersQuery = (filter: LendersDataTableFilter) => {
  return useQuery({
    queryKey: [QUERY_KEY.AdminGetLenders, filter.status],
    queryFn: async () => {
      if (!filter) {
        return [];
      }
      try {
        const { status } = filter;
        const params = objectCompact({
          status: status === "all" ? undefined : status,
        });

        const res = await authAxios.get<{
          data: (Lender & { staff: LenderStaff[] })[];
        }>(`/auth/lender/admin/retrieve`, {
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
