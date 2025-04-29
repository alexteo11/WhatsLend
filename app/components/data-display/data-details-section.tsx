import React from "react";
import { Path, PathValue, get } from "react-hook-form";

export type Row<T, K extends Path<T>> = {
  title: string;
  path: K;
  formatter?: (value: NonNullable<PathValue<T, K>>) => string;
};

export type Rows<T> = { [K in Path<T>]: Row<T, Path<T>>[] };

const DataDetailsSection = <T extends object>({
  title,
  data,
  rows,
}: {
  title: string;
  data?: T;
  rows: {
    [K in Path<T>]: {
      title: string;
      path: K;
      formatter?: (value: NonNullable<PathValue<T, K>>) => string;
    };
  }[Path<T>][];
}) => {
  if (!data) return null;
  return (
    <div className="my-3 space-y-4">
      <div className="text-xl font-semibold underline">{title}</div>
      <div className="space-y-3">
        {rows.map(({ title, path, formatter }) => {
          const value = get(data, path);
          const displayValue =
            value && formatter ? formatter(value) : String(value || "-");

          return (
            <div className="grid grid-cols-3 gap-3 text-sm" key={title}>
              <div className="font-semibold">{title}</div>
              <div>{displayValue}</div>
              <div />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DataDetailsSection;
