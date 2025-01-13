import React from "react";
import { Button } from "../lib/button";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ApplyButton = ({
  className,
  size,
  onlySingpassBtn,
}: React.HTMLAttributes<HTMLDivElement> & {
  size: "default" | "lg" | "xl";
  onlySingpassBtn?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex flex-row flex-wrap items-center justify-start gap-4 md:justify-start [&>*]:min-w-[250px] [&>*]:max-w-[300px] [&>*]:flex-1",
        className,
      )}
    >
      {!onlySingpassBtn && (
        <Button
          size={size}
          asChild
          className="transition-transform duration-200 ease-in-out hover:scale-[102.5%]"
        >
          <Link href="/application">Apply Manually</Link>
        </Button>
      )}
      <Button
        size={size}
        asChild
        className="w-auto border border-input bg-background text-foreground shadow-sm transition-transform duration-200 ease-in-out hover:scale-[102.5%] hover:bg-background"
      >
        <Link href="/application?source=mib" className="relative">
          <div className="flex items-end gap-2">
            <span className="font-semibold">Apply via</span>
            <Image
              src="/singpass_logo_fullcolours.png"
              alt="singpass_logo"
              height={20}
              width={115}
              className="translate-y-[1px] object-contain"
            />
          </div>
        </Link>
      </Button>
    </div>
  );
};

export default ApplyButton;
