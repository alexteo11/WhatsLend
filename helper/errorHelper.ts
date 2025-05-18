import { isAxiosError } from "axios";

export const getErrorMessage = (
  error: unknown,
  fallbackMessage = "Something went wrong. Please try again.",
) => {
  if (isAxiosError(error)) {
    return error.response?.data?.message
      ? String(error.response.data.message)
      : fallbackMessage;
  }
  return fallbackMessage;
};
