"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { LoaderWrapper } from "../components/common/LoaderWrapper";

const Lender = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/dashboard");
  }, []);

  return (
    <LoaderWrapper isLoading>
      <div />
    </LoaderWrapper>
  );
};

export default Lender;
