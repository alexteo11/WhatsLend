"use client";

import React, { useState } from "react";
import { Button } from "../lib/button";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";
import { z } from "zod";

const ApplyButton = ({
  className,
  size,
  onlySingpassBtn,
}: React.HTMLAttributes<HTMLDivElement> & {
  size: "default" | "lg" | "xl";
  onlySingpassBtn?: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const getSingpassAuthorise = async () => {
    setIsLoading(true);

    try {
      const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/core_kyc/sgpass/authorise`;
      const response = await axios.get(endpoint);
      const data = response.data?.data;

      if (!data) {
        throw new Error("Something went wrong. Please try again.");
      }

      const schema = z.object({
        authorizationUrl: z.string(),
        session: z.object({
          code_verifier: z.string(),
          nonce: z.string(),
        }),
      });
      const { session, authorizationUrl } = schema.parse(data);

      // store session into localStorage and redirect
      localStorage.setItem("singpass_session", JSON.stringify(session));
      window.location.href = authorizationUrl;
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

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
        className="w-auto border border-input bg-background text-foreground shadow-sm transition-transform duration-200 ease-in-out hover:scale-[102.5%] hover:bg-background"
        onClick={() => getSingpassAuthorise()}
      >
        {/* <Link href="/application?source=mib" className="relative"> */}
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
        {/* </Link> */}
      </Button>
    </div>
  );
};

export default ApplyButton;
