"use client";

import AuthProvider, { useAuth } from "@/context/auth.context";
import React, { Suspense } from "react";
import { Toaster } from "sonner";
import { LoaderWrapper } from "../components/common/LoaderWrapper";
import GlobalDialog from "../components/layout/GlobalDialog";
import { Role } from "@/constants/authEnums";
import Login from "../components/auth/Login";
import { SidebarProvider } from "@/components/lib/sidebar";
import { LenderSidebar } from "./components/lender-sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const RootProviders = ({
  children,
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider role={Role.LENDER}>
        <Suspense>
          <AuthWrapper>
            <>{children}</>
          </AuthWrapper>
          <GlobalDialog />
          <Toaster richColors closeButton />
        </Suspense>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const AuthWrapper = ({
  children,
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  const { loading, isInitializing, isAuthenticatedUser } = useAuth();

  if (isInitializing) {
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

export default RootProviders;
