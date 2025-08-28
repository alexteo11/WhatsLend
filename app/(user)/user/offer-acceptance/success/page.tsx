"use client";

import { Navbar } from "@/app/components";
import { LoaderWrapper } from "@/app/components/common/LoaderWrapper";
import { Button } from "@/app/components/lib/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const OfferAcceptanceSuccessPage = () => {
  const searchParams = useSearchParams();
  const action = searchParams.get("action") || "";

  return (
    <LoaderWrapper isLoading={false}>
      <Navbar hideButtons defaultHomeRoute="#" />
      <div className="middle-container-width mt-[var(--nav-height)] h-[90vh] w-[90%] space-y-4 py-8 md:!w-[60%] md:py-14">
        <div className="flex h-full flex-col items-center justify-center gap-4 pb-20 pt-5 text-center">
          <DotLottieReact
            autoplay
            className="-my-10 object-contain opacity-[0.75] brightness-150"
            src="/success.lottie"
            height={250}
            width={250}
          />
          <h1 className="text-2xl font-bold md:text-3xl">
            Loan offer {action} successfully!
          </h1>
          <div className="flex flex-col gap-4 text-light-gray">
            <p>You may close this page or continue to the home page</p>
            <Button size="lg" asChild>
              <Link href="/">Go Home Page</Link>
            </Button>
          </div>
        </div>
      </div>
    </LoaderWrapper>
  );
};

export default OfferAcceptanceSuccessPage;
