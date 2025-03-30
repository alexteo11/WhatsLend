"use client";

import AuthProvider, { useAuth } from "@/context/auth.context";
import React, { Suspense } from "react";
import { Toaster } from "sonner";
import { LoaderWrapper } from "../components/common/LoaderWrapper";
import GlobalDialog from "../components/layout/GlobalDialog";
import { Role } from "@/constants/authEnums";
import Login from "../components/auth/Login";
import { SidebarProvider, SidebarTrigger } from "@/components/lib/sidebar";
import { LenderSidebar } from "./components/lender-sidebar";

const RootProviders = ({
  children,
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <AuthProvider role={Role.LENDER}>
      <Suspense>
        <AuthWrapper>
          <>{children}</>
        </AuthWrapper>
        <GlobalDialog />
        <Toaster richColors closeButton />
      </Suspense>
    </AuthProvider>
  );
};

const AuthWrapper = ({
  children,
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  const { loading, user } = useAuth();

  if (!user && loading) {
    return (
      <LoaderWrapper isLoading>
        <div />
      </LoaderWrapper>
    );
  }

  if (!user) {
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

export default RootProviders;
