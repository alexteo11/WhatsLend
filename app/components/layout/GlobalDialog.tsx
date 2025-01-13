"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  //   DialogFooter,
} from "../lib/dialog";
import useDialogStore from "../../../stores/useDialogStore";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
// import { Button } from "../lib/button";

const GlobalDialog = () => {
  const { isOpen, content, onDialogClose } = useDialogStore();

  return (
    <Dialog open={isOpen} onOpenChange={onDialogClose}>
      <DialogContent className="m-0 p-0">
        <VisuallyHidden asChild>
          <DialogHeader />
        </VisuallyHidden>
        <VisuallyHidden asChild>
          <DialogTitle />
        </VisuallyHidden>
        <VisuallyHidden asChild>
          <DialogDescription />
        </VisuallyHidden>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default GlobalDialog;
