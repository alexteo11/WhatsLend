export const objectCompact = (object: Record<string, unknown>) => {
  return Object.keys(object).reduce(
    (acc, key) => {
      if (
        object[key] !== null &&
        object[key] !== undefined &&
        object[key] !== ""
      ) {
        acc[key] = object[key];
      }
      return acc;
    },
    {} as Record<string, unknown>,
  );
};
