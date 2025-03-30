import "../../globals.css";
import { Navbar } from "../../components";
import { ScrollArea } from "@/app/components/lib/scroll-area";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <ScrollArea className="p-8">{children}</ScrollArea>
    </>
  );
}
