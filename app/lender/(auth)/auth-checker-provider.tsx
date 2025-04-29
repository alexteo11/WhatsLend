"use client";

import AuthProvider, { useAuth } from "@/context/auth.context";
import React from "react";
import { LoaderWrapper } from "../../components/common/LoaderWrapper";
import { Role } from "@/constants/authEnums";
import Login from "../../components/auth/Login";
import { SidebarProvider } from "@/components/lib/sidebar";
import { LenderSidebar } from "../components/lender-sidebar";

const AuthCheckerProvider = ({
  children,
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <AuthProvider role={Role.LENDER}>
      <AuthWrapper>
        <>{children}</>
      </AuthWrapper>
    </AuthProvider>
  );
};

const AuthWrapper = ({
  children,
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  const { loading, isInitializing, isAuthenticatedUser } = useAuth();

  if (isInitializing || loading) {
    return (
      <LoaderWrapper isLoading>
        <div />
      </LoaderWrapper>
    );
  }

  if (!isAuthenticatedUser) {
    return (
      <div className="middle-container-width flex h-screen items-center justify-center">
        <Login className="h-auto" />
      </div>
    );
  }

  return (
    <LoaderWrapper isLoading={loading}>
      <SidebarProvider>
        <LenderSidebar />
        <main className="mt-[var(--nav-height)] w-full">{children}</main>
      </SidebarProvider>
    </LoaderWrapper>
  );
};

export default AuthCheckerProvider;
