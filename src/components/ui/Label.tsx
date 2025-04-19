import { cn } from "@/shared/lib/utils";
import React from "react";

export default function Label({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return <label className={cn("text-sm font-normal", className)} {...props} />;
}
