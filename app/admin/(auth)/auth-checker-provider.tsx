"use client";

import AuthProvider, { useAuth } from "@/context/auth.context";
import React from "react";
import { LoaderWrapper } from "../../components/common/LoaderWrapper";
import { Role } from "@/constants/authEnums";
import Login from "../../components/auth/Login";
import { SidebarProvider } from "@/components/lib/sidebar";
import { AdminSidebar } from "../components/admin-sidebar";
import GlobalDialog from "@/app/components/layout/GlobalDialog";

const AuthCheckerProvider = ({
  children,
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <AuthProvider role={Role.ADMIN}>
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
        <AdminSidebar />
        <main className="mt-[var(--nav-height)] w-full">{children}</main>
      </SidebarProvider>
    </LoaderWrapper>
  );
};

export default AuthCheckerProvider;
