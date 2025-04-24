export const formatDate = (date: Date, showDateTime = true) => {
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

  return new Intl.DateTimeFormat("en-GB", options).format(date);
};
