"use client";

import { useAuth } from "@/context/auth.context";
import React from "react";

const Lender = () => {
  const { user } = useAuth();

  console.log({ user });

  return <div>Lender</div>;
};

export default Lender;
