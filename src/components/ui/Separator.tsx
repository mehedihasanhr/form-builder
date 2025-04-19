import { cn } from "@/shared/lib/utils";
import React from "react";

interface SeparatorProps extends React.ComponentProps<"div"> {
  orientation?: "vertical" | "horizontal";
}

export const Separator = ({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorProps) => {
  return (
    <div
      data-orientation={orientation}
      className={cn(
        "bg-border",
        "data-[orientation=vertical]:w-[1px] data-[orientation=vertical]:h-full",
        "data-[orientation=horizontal]:h-[1px] data-[orientation=horizontal]:w-full",
        className,
      )}
      {...props}
    />
  );
};
