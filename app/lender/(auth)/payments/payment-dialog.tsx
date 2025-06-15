import { LoaderWrapper } from "@/app/components/common/LoaderWrapper";
import { Button } from "@/app/components/lib/button";
import { Form } from "@/app/components/lib/form";
import { ImageUploader } from "@/app/components/lib/image-uploader";
import { useAuth } from "@/context/auth.context";
import { formatDate } from "@/helper/dateFormatter";
import { getErrorMessage } from "@/helper/errorHelper";
import { authAxios } from "@/lib/axios";
import { uploadImageToFirebase } from "@/lib/firebaseBucket";
import { QUERY_KEY } from "@/queries/constants";
import { getImageSchema } from "@/schemas/image.schema";
import { Payment, PaymentStatus } from "@/schemas/payment.schema";
import useDialogStore from "@/stores/useDialogStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const PaymentDialog = ({ selectedPayment }: { selectedPayment: Payment }) => {
  const queryClient = useQueryClient();
  const { user, lenderId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const imageSchema = z.object({
    image: getImageSchema(),
  });
  const form = useForm({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      image: new File([""], "filename"),
    },
  });

  const imageName = useMemo(() => {
    return `Payment bill for ${formatDate(selectedPayment.createdAt)}`;
  }, [selectedPayment]);

  const dismissDialog = () => {
    const { closeDialog } = useDialogStore.getState();
    closeDialog();
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Something went wrong. Please try again.");
      return;
    }

    setIsLoading(true);
    try {
      const fileUrl = await uploadImageToFirebase(
        lenderId,
        selectedPayment.id,
        form.getValues().image,
        imageName,
      );
      await authAxios.post(`/report/lender/payment/markAsPaid`, {
        paymentId: selectedPayment.id,
        fileUrl,
      });

      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.LenderPayments],
      });

      toast.success("Payment uploaded successfully.");
      dismissDialog();
    } catch (err) {
      console.log(err);
      toast.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-w-[300px] flex-col items-center gap-10 p-10">
      <h1 className="text-center text-2xl text-app">{imageName}</h1>
      <Form {...form}>
        <form
          className="justify-center space-y-10"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          {selectedPayment.fileUrl ? (
            <LoaderWrapper isLoading={isImageLoading}>
              <Image
                src={selectedPayment.fileUrl}
                alt="payment receipt"
                height={400}
                width={400}
                onLoad={() => setIsImageLoading(true)}
                onLoadingComplete={() => setIsImageLoading(false)}
              />
            </LoaderWrapper>
          ) : (
            <ImageUploader
              form={form}
              imageRef="image"
              title="Payment Receipt"
              className=""
              imgCropShape="rect"
            />
          )}

          {selectedPayment.status !== PaymentStatus.PAID && (
            <div className="flex justify-center gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={dismissDialog}
                isLoading={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" isLoading={isLoading}>
                Upload Receipt
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default PaymentDialog;
