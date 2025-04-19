import { cn } from "@/shared/lib/utils";
import { IconGripVertical } from "@tabler/icons-react";
import React from "react";
import { Button } from "./Button";

export default function Field({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className="flex p-4 bg-field-bg rounded-[8px] border border-border items-stretch select-none border-dashed data-[selected=true]:border-[rgba(28,81,184,1)]"
      {...props}
    >
      <div className="w-fit flex items-center">
        <Button className="aspect-square p-0 w-fit">
          <IconGripVertical size={18} />
        </Button>
      </div>
      <div
        className={cn(
          "flex-1 flex flex-col space-y-2 pointer-events-none",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
