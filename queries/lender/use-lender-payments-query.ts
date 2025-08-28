import { toast } from "sonner";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { authAxios } from "@/lib/axios";
import { getErrorMessage } from "@/helper/errorHelper";
import { QUERY_KEY } from "../constants";
import { Payment } from "@/schemas/payment.schema";

export const userLenderPaymentsQuery = (params?: {
  startDate: string;
  endDate: string;
}) => {
  return useQuery({
    queryKey: [QUERY_KEY.LenderPayments, params?.startDate, params?.endDate],
    queryFn: async () => {
      try {
        const res = await authAxios.get<{
          data: Payment[];
        }>(`/report/lender/payment`, {
          params,
        });
        return res.data.data;
      } catch (err) {
        toast.error(getErrorMessage(err));
        throw new Error("Something went wrong.");
      }
    },
    placeholderData: keepPreviousData,
  });
};
