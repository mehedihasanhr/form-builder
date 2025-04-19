import { cn } from "@/shared/lib/utils";
import React from "react";

export const ComboBoxIcon = ({
  className,
  ...props
}: React.ComponentProps<"svg">) => {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("fill-zinc-400", className)}
      {...props}
    >
      <path d="M15 4h-14c-0.6 0-1 0.4-1 1v6c0 0.6 0.4 1 1 1h14c0.6 0 1-0.4 1-1v-6c0-0.6-0.4-1-1-1zM10 11h-9v-6h9v6zM13 8.4l-2-1.4h4l-2 1.4z" />
      <path d="M2 6h1v4h-1v-4z" />
    </svg>
  );
};
