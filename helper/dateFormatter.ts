export const formatDate = (date?: Date | string, showDateTime = true) => {
  if (!date) {
    return "";
  }

  let _date = date;

  if (typeof _date === "string") {
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

  return new Intl.DateTimeFormat("en-GB", options).format(_date);
};
