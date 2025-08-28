import { LOAN_STATUS_ENUM, OFFER_STATUS_ENUM } from "@/constants/commonEnums";
import { LenderStatus } from "@/schemas/lender.schema";
import { UserStatus } from "@/schemas/user.schema";
import { DateRange } from "react-day-picker";

export interface LoanDataTableFilter {
  date: DateRange;
  status: OFFER_STATUS_ENUM | "all";
  keyword?: string;
  lenderId?: string;
}

export interface PaymentDataTableFilter {
  date?: DateRange;
}

export interface UsersDataTableFilter {
  status: UserStatus | "all";
  keyword?: string;
}

export interface UserApplicationHistoryDataTableFilter {
  status: LOAN_STATUS_ENUM | "all";
  date?: DateRange;
  email?: string;
  keyword?: string;
}

export interface LendersDataTableFilter {
  status: LenderStatus | "all";
  keyword?: string;
}
