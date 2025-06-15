"use client";

import React, { Suspense } from "react";
import { Toaster } from "sonner";
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
        retry: 2,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>
        <>{children}</>
        <Toaster richColors closeButton />
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default RootProviders;
