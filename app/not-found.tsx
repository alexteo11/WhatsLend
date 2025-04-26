import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./components/lib/button";

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen flex-col items-center justify-center gap-4">
          <Image
            src="./result-not-found.svg"
            width={200}
            height={200}
            alt="result-not-found"
          />
          <h1 className="text-2xl font-bold text-app">Page Not Found</h1>
          <p className="text-light-gray">Please ensure the URL is correct</p>
          <Button size="lg" asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </body>
    </html>
  );
}
