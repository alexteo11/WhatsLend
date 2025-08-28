import { subDays } from "date-fns";

export const formatDate = (date?: Date | string, showDateTime = true) => {
  if (!date) {
    return "";
  }

  let _date = date;

  if (typeof _date === "string") {
    if (date === "******") {
      return "******";
    }

    _date = new Date(_date);
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  if (showDateTime) {
    options.hour = "numeric";
    options.minute = "numeric";
    options.second = "numeric";
  }

  try {
    const dateString = new Intl.DateTimeFormat("en-GB", options).format(_date);
    return dateString;
  } catch (error) {
    console.error(error);
    return "Invalid Date";
  }
};

export const getLast30Days = () => {
  return {
    from: subDays(new Date(new Date().setHours(0, 0, 0, 0)), 29),
    to: new Date(new Date().setHours(23, 59, 59, 999)),
  };
};
