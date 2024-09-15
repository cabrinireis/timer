import { ReactNode } from "react";
import { cn } from "../utils";

type Props = {
  status: "yellow" | "green" | "red";
  children: ReactNode;
};

export const Status = ({ children, status }: Props) => {
  const color =
    status === "yellow"
      ? "before:bg-yellow-500"
      : status === "green"
      ? "before:bg-green-500"
      : "before:bg-red-500";
  return (
    <span
      className={cn(
        `flex items-center gap-2 before:content-[attr(before)] before:w-[0.5rem] before:h-[0.5rem] before:rounded-full ${color}`
      )}
    >
      {children}
    </span>
  );
};
