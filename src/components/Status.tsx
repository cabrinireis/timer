import { ReactNode } from "react";
import { cn } from "../utils";

type Props = {
  status: "yellow" | "green" | "red";
  children: ReactNode;
};

export const Status = ({ children, status }: Props) => {
  return (
    <span
      className={cn(
        `flex items-center gap-2 before:content-[attr(before)] before:w-[0.5rem] before:h-[0.5rem] before:rounded-full before:bg-${status}-500`
      )}
    >
      {children}
    </span>
  );
};
