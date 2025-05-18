"use client";

import AuthProvider, { useAuth } from "@/context/auth.context";
import React, { Suspense } from "react";
import { Footer } from "react-day-picker";
import { Toaster } from "sonner";
import { Navbar } from "../components";
import { LoaderWrapper } from "../components/common/LoaderWrapper";
import GlobalDialog from "../components/layout/GlobalDialog";
import { Role } from "@/constants/authEnums";
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
      <AuthProvider role={Role.USER}>
        <Suspense>
          <Navbar />
          <AuthWrapper>{children}</AuthWrapper>
          <Footer />
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
  const { loading } = useAuth();

  return (
    <LoaderWrapper isLoading={loading}>
      <main className="mt-[var(--nav-height)]">{children}</main>
    </LoaderWrapper>
  );
};

export default RootProviders;
