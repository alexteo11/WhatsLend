import "../../globals.css";
import { Navbar } from "../../components";
import { ScrollArea } from "@/app/components/lib/scroll-area";
import AuthCheckerProvider from "./auth-checker-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthCheckerProvider>
      <Navbar />
      <ScrollArea className="p-8">
        <div className="p-2">{children}</div>
      </ScrollArea>
    </AuthCheckerProvider>
  );
}
