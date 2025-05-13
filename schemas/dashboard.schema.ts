import { z } from "zod";

export const lenderDashboardSummarySchema = z.object({
  offerSent: z.number(),
  offerAccepted: z.number(),
  offerRejected: z.number(),
  offerDisbursed: z.number(),
});

export const lenderDashboardDetailsSchema = z.record(z.number());

export type LenderDashboardSummary = z.infer<
  typeof lenderDashboardSummarySchema
>;
export type LenderDashboardDetails = z.infer<
  typeof lenderDashboardDetailsSchema
>;
