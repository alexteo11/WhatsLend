import type { Metadata } from "next";
import "./globals.css";
import { Footer, Navbar } from "@/app/components";

export const metadata: Metadata = {
  title: "Compare Loan",
  description: "Discover the best loan for youself.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative h-screen">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
