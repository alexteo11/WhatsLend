"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Navbar } from "../components";

const Lender = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/lender/dashboard");
  }, []);

  return <Navbar />;
};

export default Lender;
