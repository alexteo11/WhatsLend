import { toast } from "sonner";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { authAxios } from "@/lib/axios";
import { getErrorMessage } from "@/helper/errorHelper";
import { QUERY_KEY } from "./constants";
import { OFFER_STATUS_ENUM } from "@/constants/commonEnums";
import { LenderDashboardDetails } from "@/schemas/dashboard.schema";

export const useLenderDashboardDetailsQuery = (
  params: {
    start_date?: string;
    end_date?: string;
    status?: OFFER_STATUS_ENUM;
  },
  lenderId?: string,
) => {
  return useQuery({
    queryKey: [
      QUERY_KEY.LenderDashboardDetails,
      lenderId,
      params?.start_date,
      params?.end_date,
      params?.status,
    ],
    queryFn: async () => {
      try {
        const res = await authAxios.get<{
          data: LenderDashboardDetails;
        }>(`/report/${lenderId}/offer/daily`, {
          params,
        });
        return res.data.data;
      } catch (err) {
        toast.error(getErrorMessage(err));
        throw new Error("Something went wrong mtfk");
      }
    },
    enabled: () => {
      return (
        !!lenderId &&
        !!params?.start_date &&
        !!params?.end_date &&
        !!params?.status
      );
    },
    placeholderData: keepPreviousData,
  });
};
