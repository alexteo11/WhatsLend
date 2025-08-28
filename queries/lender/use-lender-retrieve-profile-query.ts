import { toast } from "sonner";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { authAxios } from "@/lib/axios";
import { getErrorMessage } from "@/helper/errorHelper";
import { QUERY_KEY } from "../constants";
import { Lender } from "@/schemas/lender.schema";
import { LenderStaff } from "@/schemas/lenderStaff.schema";

export const useLenderRetrieveProfileQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.LenderProfile],
    queryFn: async () => {
      try {
        const res = await authAxios.get<{
          data: {
            lender: Lender;
            staffs: LenderStaff[];
          };
        }>(`auth/lender/retrieveProfile`);

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
