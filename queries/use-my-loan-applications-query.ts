import { z } from "zod";
import { toast } from "sonner";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { authAxios } from "@/lib/axios";
import { loanSchema } from "@/schemas/loan.schema";
import { getErrorMessage } from "@/helper/errorHelper";
import { QUERY_KEY } from "./constants";

export const useMyLoanApplicationsQuery = (
  userId?: string,
  page?: number,
  pageSize?: number,
) => {
  return useQuery({
    queryKey: [QUERY_KEY.MyLoanApplications, userId, page, pageSize],
    queryFn: async () => {
      const res = await authAxios.get(`loan/user/${userId}`, {
        params: { page, pageSize },
      });
      const result = z.array(loanSchema).safeParse(res.data.data);

      if (result.error) {
        console.log(result.error);
        toast.error(getErrorMessage(result.error));
        throw result.error;
      }
      return result.data;
    },
    enabled: !!userId,
    placeholderData: keepPreviousData,
  });
};
