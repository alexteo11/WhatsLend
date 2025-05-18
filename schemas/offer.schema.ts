import { z } from "zod";
import { OFFER_STATUS_ENUM } from "@/constants/commonEnums";

export const appointmentSchema = z.object({
  appointmentDateTime: z.coerce.date(),
  appointmentLocation: z.string(),
});

export const offerPayloadSchema = z.object({
  userId: z.string(),
  email: z.string(),
  loanAmount: z.number(),
  tenureMonths: z.number(),
  interestRate: z.number().max(4),
  lateInterestRate: z.number().max(4),
  adminFee: z.number(),
  lateChargeFees: z.number().max(60),
  repaymentPeriod: z.number(),
});

export const offerSchema = z
  .object({
    id: z.string(),
    loanId: z.string(),
    lenderId: z.string(),
    status: z.nativeEnum(OFFER_STATUS_ENUM),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    offerExpiryDate: z.coerce.date(),
    stillValid: z.boolean(),
    appointmentDetails: appointmentSchema.optional(),
  })
  .merge(offerPayloadSchema);

export type OfferPayLoad = z.infer<typeof offerPayloadSchema>;
export type OfferData = z.infer<typeof offerSchema>;
