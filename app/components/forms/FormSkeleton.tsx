import React from "react";
import { Skeleton } from "../lib/skeleton";

const FormSkeleton = () => {
  const titleSkeleton = <Skeleton className="h-[32px] w-[200px]" />;
  const fieldSkeleton = (
    <div className="mt-4 flex w-full flex-col gap-2">
      <Skeleton className="h-[20px] w-[100px]" />
      <Skeleton className="h-[52px] w-full" />
    </div>
  );

  return (
    <div className="space-y-10">
      {Array.from({ length: 3 }).map((_, i) => (
        <div className="flex flex-col gap-2 pb-10" key={i}>
          {titleSkeleton}
          {fieldSkeleton}
          {fieldSkeleton}
          <div className="flex flex-wrap gap-4 [&>div]:flex-auto md:[&>div]:flex-1">
            {fieldSkeleton}
            {fieldSkeleton}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormSkeleton;
