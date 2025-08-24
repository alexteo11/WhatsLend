"use client";

import React, { useState } from "react";
import { Button } from "../lib/button";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import axios from "@/lib/axios";
import { toast } from "sonner";
import { z } from "zod";

const ApplyButton = ({
  className,
  size = "default",
  onlySingpassBtn,
}: React.HTMLAttributes<HTMLDivElement> & {
  size?: "default" | "lg" | "xl";
  onlySingpassBtn?: boolean;
}) => {
  // TODO: global loading
  const [isLoading, setIsLoading] = useState(false);

  const getSingpassAuthorise = async () => {
    setIsLoading(true);

    try {
      const endpoint = `/loan/sgpass/authorise`;
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
        "flex flex-row flex-wrap items-center justify-start gap-4 md:justify-start [&>*]:min-w-[250px]",
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
        className="w-auto bg-transparent p-0 shadow-none transition-transform duration-200 ease-in-out hover:scale-[102.5%] hover:bg-transparent"
        onClick={() => getSingpassAuthorise()}
      >
        <Image
          src="/retrieve_myinfo_with_singpass.png"
          alt="singpass_logo"
          height={60}
          width={350}
        />
      </Button>
    </div>
  );
};

export default ApplyButton;
