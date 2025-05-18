import { toast } from "sonner";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { LoanData } from "@/schemas/loan.schema";
import { getErrorMessage } from "@/helper/errorHelper";
import { QUERY_KEY } from "./constants";

export const useLoanApplicationDetailsQuery = (loanId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.LoanApplicationDetails, loanId],
    queryFn: async () => {
      try {
        const res = await axios.get<{ data: LoanData }>(
          `/loan/details/${loanId}`,
        );
        return res.data.data;
      } catch (err) {
        toast.error(getErrorMessage(err));
        throw new Error("Something went wrong mtfk");
      }
    },
    enabled: false,
    placeholderData: keepPreviousData,
  });
};
