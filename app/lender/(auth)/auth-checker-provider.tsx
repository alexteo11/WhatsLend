"use client";

import AuthProvider, { useAuth } from "@/context/auth.context";
import React from "react";
import { LoaderWrapper } from "../../components/common/LoaderWrapper";
import { Role } from "@/constants/authEnums";
import Login from "../../components/auth/Login";
import { SidebarProvider } from "@/components/lib/sidebar";
import { LenderSidebar } from "../components/lender-sidebar";
import GlobalDialog from "@/app/components/layout/GlobalDialog";
import { useRouter } from "next/navigation";

const AuthCheckerProvider = ({
  children,
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <AuthProvider role={Role.LENDER}>
      <AuthWrapper>
        <>{children}</>
        <GlobalDialog />
      </AuthWrapper>
    </AuthProvider>
  );
};

const AuthWrapper = ({
  children,
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  const router = useRouter();
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
        <Login
          className="h-auto"
          onBeforeLoginSuccess={() => {
            router.replace("/lender/dashboard");
          }}
        />
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
