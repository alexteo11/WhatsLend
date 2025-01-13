import "./globals.css";
import type { Metadata } from "next";
import RootProviders from "./providers";

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
      <body className="h-screen min-h-screen">
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
