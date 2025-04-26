import { z } from "zod";
import { OFFER_STATUS_ENUM } from "@/constants/commonEnums";

export const offerPayloadSchema = z.object({
  lender_id: z.string(),
  loan_id: z.string(),
  user_id: z.string(),
  loanAmount: z.number(),
  interestRate: z.number(),
  adminFee: z.number(),
  lateInterestRate: z.number(),
  lateCharges: z.number(),
  tenureMonths: z.number(),
  repaymentPeriod: z.number(),
});

export const offerSchema = z
  .object({
    id: z.string(),
    status: z.nativeEnum(OFFER_STATUS_ENUM),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    stillValid: z.boolean(),
  })
  .merge(offerPayloadSchema);

export type OfferData = z.infer<typeof offerSchema>;
