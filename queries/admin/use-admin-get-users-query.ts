import { toast } from "sonner";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { authAxios } from "@/lib/axios";
import { getErrorMessage } from "@/helper/errorHelper";
import { QUERY_KEY } from "../constants";
import { objectCompact } from "@/lib/objects";
import { UsersDataTableFilter } from "@/types/dataTable.types";
import { User } from "@/schemas/user.schema";

export const useAdminGetUsersQuery = (filter: UsersDataTableFilter) => {
  return useQuery({
    queryKey: [QUERY_KEY.AdminGetUsers, filter.status],
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
          data: User[];
        }>(`/auth/user/admin/retrieve`, {
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
