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
import { ArchiveXIcon, EditIcon, SearchIcon } from "lucide-react";
import { useMyLoanApplicationsQuery } from "@/queries/use-my-loan-applications-query";
import { useAuth } from "@/context/auth.context";
import { LoaderWrapper } from "@/app/components/common/LoaderWrapper";
import ApplyButton from "@/app/components/common/ApplyButton";
import Image from "next/image";
import Link from "next/link";

const MyApplications = () => {
  const { user } = useAuth();
  const { data, isLoading } = useMyLoanApplicationsQuery(user?.uid);

  return (
    <LoaderWrapper isLoading={isLoading}>
      <div className="middle-container-width py-8 md:py-14">
        <h1 className="user-page-title">My Applications</h1>
        {data?.length ? (
          <>
            <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-2 lg:grid-cols-3">
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
  return (
    <Card className="p-6">
      <CardTitle className="text-xl text-app underline">
        Application - {index}
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
      <CardFooter className="flex flex-wrap justify-start gap-2 p-2">
        <Button variant="outline" asChild>
          <Link href={`./my-applications/${data.id}?mode=view`}>
            <SearchIcon className="mr-1 h-4 w-4" />
            View
          </Link>
        </Button>
        <Button asChild>
          <Link href={`./my-applications/${data.id}?mode=modify`}>
            <EditIcon className="mr-1 h-4 w-4" />
            Modify
          </Link>
        </Button>
        <Button variant="destructive">
          <ArchiveXIcon className="mr-1 h-4 w-4" />
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MyApplications;
