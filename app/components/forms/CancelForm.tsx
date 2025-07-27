import React from "react";
import { Button } from "../lib/button";
import Link from "next/link";
import useDialogStore from "@/stores/useDialogStore";

const CancelForm = () => {
  const { closeDialog } = useDialogStore();
  return (
    <div className="w-[90vw] max-w-[500px]">
      <div className="flex flex-col gap-2 px-6 py-10">
        <h1 className="text-center text-3xl text-app">Are you sure?</h1>
        <p className="mb-8 text-center text-sm text-light-gray">
          Are you sure you want to cancel this form application? Once cancelled,
          you had to re-input the form again.
        </p>

        <div className="flex flex-row justify-end gap-4">
          <Button variant="outline" onClick={closeDialog}>
            No, continue application
          </Button>
          <Button asChild variant="destructive" onClick={closeDialog}>
            <Link href="./">Yes, cancel application</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CancelForm;
