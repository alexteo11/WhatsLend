import type { Metadata } from "next";
import "./globals.css";
import { Footer, Navbar } from "@/app/components";
import Head from "next/head";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Compare Loan",
  description: "Discover the best loan for yourself.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Tell the browser to never restore the scroll position on load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration = "manual"`,
          }}
        />
      </Head>
      <body className="h-screen min-h-screen">
        <Suspense fallback="Loading...">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
