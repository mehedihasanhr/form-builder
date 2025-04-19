import { cn } from "@/shared/lib/utils";
import React from "react";

export const Button = ({
  className,
  ...props
}: React.ComponentProps<"button">) => {
  return (
    <button
      className={cn(
        "py-2.5 px-6 h-9 rounded-[6px] inline-flex items-center gap-2.5",
        className,
      )}
      {...props}
    />
  );
};
