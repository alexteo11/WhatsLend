import { z } from "zod";

export enum PaymentStatus {
  PAID = "PAID",
  UNPAID = "UNPAID",
}

export const paymentSchema = z.object({
  id: z.string(),
  lenderId: z.string(),
  amount: z.number(),
  status: z.nativeEnum(PaymentStatus).default(PaymentStatus.UNPAID),
  paidAt: z.coerce.date().optional(),
  fileUrl: z.string().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  stillValid: z.boolean(),
});

export type Payment = z.infer<typeof paymentSchema>;
