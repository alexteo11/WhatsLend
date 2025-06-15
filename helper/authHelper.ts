export const getLenderId = () => {
  if (typeof window !== "undefined") {
    const lenderId = window.localStorage.getItem("compareLoanLenderId");
    if (lenderId) {
      console.log({ lenderId });
      return lenderId;
    }
  }

  return "";
};
