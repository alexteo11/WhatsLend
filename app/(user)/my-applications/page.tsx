"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/app/components/lib/card";
import { LoanData } from "@/schemas/loan.schema";
import { formatDate } from "@/helper/dateFormatter";
import { Button } from "@/app/components/lib/button";
import {
  ArchiveXIcon,
  EditIcon,
  HandCoinsIcon,
  SearchIcon,
} from "lucide-react";
import { useMyLoanApplicationsQuery } from "@/queries/use-my-loan-applications-query";
import { useAuth } from "@/context/auth.context";
import { LoaderWrapper } from "@/app/components/common/LoaderWrapper";
import ApplyButton from "@/app/components/common/ApplyButton";
import Image from "next/image";
import { authAxios } from "@/lib/axios";
import { toast } from "sonner";
import { getErrorMessage } from "@/helper/errorHelper";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/queries/constants";
import { LOAN_STATUS_ENUM } from "@/constants/commonEnums";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/lib/tooltip";
import OfferDetailsDialog from "@/app/components/data-display/offer-details-dialog";
import { useLoanOfferListQuery } from "@/queries/use-loan-offer-list-query";
import useApplicationDetailsStore, {
  ActionMode,
} from "@/stores/useApplicationStore";
import { useRouter } from "next/navigation";

const MyApplications = () => {
  const { user } = useAuth();
  const { data, isLoading } = useMyLoanApplicationsQuery(user?.uid);

  return (
    <LoaderWrapper isLoading={isLoading}>
      <div className="middle-container-width py-8 md:py-14">
        <h1 className="user-page-title">My Applications</h1>
        {data?.length ? (
          <>
            <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-2">
              {data.map((application, index) => (
                <ApplicationCard
                  key={index}
                  data={application}
                  index={data.length - index}
                />
              ))}
            </div>
          </>
        ) : (
          !isLoading &&
          data && (
            <div className="flex h-[60vh] items-center justify-center gap-4">
              <div className="flex w-[300px] flex-col items-center space-y-6">
                <Image
                  src="./result-not-found.svg"
                  width={200}
                  height={200}
                  alt="result-not-found"
                />
                <h1 className="text-center text-xl text-light-gray">
                  You have no applications yet. Start apply via
                </h1>
                <ApplyButton size="lg" />
              </div>
            </div>
          )
        )}
      </div>
    </LoaderWrapper>
  );
};

const ApplicationCard = ({
  data,
  index,
}: {
  data: LoanData;
  index: number;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOfferDialogOpen, setIsOfferDialogOpen] = React.useState(false);
  const { setApplicationId, setActionMode } = useApplicationDetailsStore();

  const {
    data: offerDataList,
    isFetching: isLoadingOffers,
    refetch,
  } = useLoanOfferListQuery(data.id);

  const cancelLoanApplication = async () => {
    setIsLoading(true);
    try {
      await authAxios.delete(`/loan/cancel/${data.id}`);
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MyLoanApplications],
      });
      toast.success("Loan application cancelled successfully.");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOfferDataList = async () => {
    await refetch();
    setIsOfferDialogOpen(true);
  };

  const navigateToLoanDetails = (id: string, mode: ActionMode) => {
    setApplicationId(id);
    setActionMode(mode);
    router.push("/my-applications/details");
  };

  return (
    <LoaderWrapper isLoading={isLoading}>
      <Card className="p-6">
        <CardTitle className="text-xl text-app underline">
          <div className="flex items-center justify-between">
            <h1>Application - {index}</h1>
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => navigateToLoanDetails(data.id, "view")}
              >
                <SearchIcon className="mr-1 h-4 w-4" />
              </Button>
              {data.status !== LOAN_STATUS_ENUM.CANCELLED && (
                <Button
                  onClick={() => navigateToLoanDetails(data.id, "modify")}
                >
                  <EditIcon className="mr-1 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardTitle>
        <CardContent className="grid grid-cols-2 gap-x-4 gap-y-2 p-4 [&>div]:text-sm [&>span]:font-semibold">
          <span>Loan amount: </span>
          <div>
            ${" "}
            {new Intl.NumberFormat().format(
              Number(data.loanDetails.loanAmount.value),
            )}
          </div>
          <span>Loan tenure: </span>
          <div>{data.loanDetails.loanTenure.value} months</div>
          <span>Loan purpose: </span>
          <div>{data.loanDetails.loanPurpose.value}</div>
          <span>Status: </span>
          <div>{data.status}</div>
          <span>Applied at: </span>
          <div>{formatDate(data.createdAt)}</div>
          <span>Updated at: </span>
          <div>{formatDate(data.updatedAt)}</div>
        </CardContent>
        <CardFooter className="flex justify-evenly gap-4 p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="w-full"
                  variant="destructive"
                  onClick={() => cancelLoanApplication()}
                  disabled={data.status !== LOAN_STATUS_ENUM.INITIAL}
                >
                  <ArchiveXIcon className="mr-1 h-4 w-4" />
                  {data.status === LOAN_STATUS_ENUM.CANCELLED
                    ? "Cancelled"
                    : "Cancel"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Loan application only can be cancelled in initial stage</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {data.status !== LOAN_STATUS_ENUM.CANCELLED && (
            <Button
              className="w-full"
              isLoading={isLoadingOffers}
              onClick={fetchOfferDataList}
            >
              {/* <Link href={`./my-applications/${data.id}?mode=view`}> */}
              <div className="flex items-center justify-center gap-2">
                <HandCoinsIcon className="mr-1 h-4 w-4" />
                View Offers
              </div>
              {/* </Link> */}
            </Button>
          )}
        </CardFooter>
      </Card>
      {offerDataList && (
        <OfferDetailsDialog
          isOpen={isOfferDialogOpen}
          onOpenChange={setIsOfferDialogOpen}
          offerDataList={offerDataList}
        />
      )}
    </LoaderWrapper>
  );
};

export default MyApplications;
