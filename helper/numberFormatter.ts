export const currencyFormatter = (value: number, currency = "$") => {
  return `${currency} ${new Intl.NumberFormat().format(value)}`;
};

export const percentageFormatter = (value: number) => {
  return `${new Intl.NumberFormat().format(value)} %`;
};

export const monthFormatter = (value: number) => {
  return `${new Intl.NumberFormat().format(value)} months`;
};
