import { cn } from "@/shared/lib/utils";
import React from "react";

export default function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "h-32 rounded-[4px] border border-border placeholder:text-sm placeholder:text-[rgba(99,99,102,1)] py-2 px-3",
        className,
      )}
      {...props}
    />
  );
}
