"use client";

import AuthProvider, { useAuth } from "@/context/auth.context";
import React, { Suspense } from "react";
import { Footer } from "react-day-picker";
import { Toaster } from "sonner";
import { Navbar } from "./components";
import { LoaderWrapper } from "./components/common/LoaderWrapper";
import GlobalDialog from "./components/layout/GlobalDialog";

const RootProviders = ({
  children,
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <AuthProvider>
      <Suspense>
        <Navbar />
        <AuthWrapper>{children}</AuthWrapper>
        <Footer />
        <GlobalDialog />
        <Toaster richColors closeButton />
      </Suspense>
    </AuthProvider>
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
