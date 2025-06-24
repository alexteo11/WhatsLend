import { LenderStatus } from "@/schemas/lender.schema";
import { LOAN_STATUS_ENUM, OFFER_STATUS_ENUM } from "./commonEnums";
import { UserStatus } from "@/schemas/user.schema";

export const LoanStatusMapping: Record<LOAN_STATUS_ENUM, string> = {
  [LOAN_STATUS_ENUM.INITIAL]: "Initiated",
  [LOAN_STATUS_ENUM.IN_PROGRESS]: "In Progress",
  [LOAN_STATUS_ENUM.COMPLETED]: "Completed",
  [LOAN_STATUS_ENUM.EXPIRED]: "Expired",
  [LOAN_STATUS_ENUM.CANCELLED]: "Cancelled",
};

export const OfferStatusMapping: Record<OFFER_STATUS_ENUM, string> = {
  [OFFER_STATUS_ENUM.ISSUED]: "Issued",
  [OFFER_STATUS_ENUM.BORROWER_ACCEPTED]: "Accepted by borrower",
  [OFFER_STATUS_ENUM.BORROWER_REJECTED]: "Rejected by borrower",
  [OFFER_STATUS_ENUM.LENDER_REJECTED]: "Rejected by lender",
  [OFFER_STATUS_ENUM.COMPLETED]: "Completed",
  [OFFER_STATUS_ENUM.EXPIRED]: "Expired",
};

export const UserStatusMapping: Record<UserStatus, string> = {
  [UserStatus.ACTIVE]: "Active",
  [UserStatus.INACTIVE]: "Inactive",
};

export const LenderStatusMapping: Record<LenderStatus, string> = {
  [LenderStatus.ACTIVE]: "Active",
  [LenderStatus.INACTIVE]: "Inactive",
};
