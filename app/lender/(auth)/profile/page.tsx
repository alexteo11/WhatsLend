"use client";

import React from "react";
import { useAuth } from "@/context/auth.context";
import LenderProfile from "@/app/components/auth/lender-profile";

const ProfilePage = () => {
  const { lenderId } = useAuth();

  return <LenderProfile lenderId={lenderId} />;
};

export default ProfilePage;
