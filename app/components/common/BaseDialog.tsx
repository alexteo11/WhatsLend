"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../lib/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils";

export interface BaseDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const BaseDialog = ({
  isOpen,
  onOpenChange,
  children,
  className,
}: BaseDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} modal={true}>
      <DialogContent
        className={cn(
          "scrollable-dialog-content z-[1000] m-0 overflow-y-scroll rounded-lg p-0",
          className,
        )}
      >
        <VisuallyHidden asChild>
          <DialogHeader />
        </VisuallyHidden>
        <VisuallyHidden asChild>
          <DialogTitle />
        </VisuallyHidden>
        <VisuallyHidden asChild>
          <DialogDescription />
        </VisuallyHidden>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default BaseDialog;
