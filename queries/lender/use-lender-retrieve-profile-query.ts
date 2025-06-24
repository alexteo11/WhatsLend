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

        // very cacat de checking - need check how to handle this rubbish
        if (res.data.data.lender.criteria.hasExistingLoan == undefined) {
          res.data.data.lender.criteria.hasExistingLoan =
            "undefined" as unknown as boolean;
        } else {
          res.data.data.lender.criteria.hasExistingLoan = String(
            res.data.data.lender.criteria.hasExistingLoan,
          ) as unknown as boolean;
        }

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
