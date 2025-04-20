import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { cn } from "@/shared/lib/utils";
import { IconEye } from "@tabler/icons-react";
import React from "react";

export const AppNavbar = ({ className }: React.ComponentProps<"div">) => {
  return (
    <header
      className={cn(
        "bg-white py-5 px-7 flex sticky top-0 inset-x-0 z-50 border-b border-border items-center",
        className,
      )}
    >
      <div className="inline-flex items-stretch gap-x-6 flex-1">
        <div className="size-12 rounded bg-slate-100" />
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-auto"
        />
        <div>
          <h4> Form Builder </h4>
          <p className="text-[13px]">Add and customize forms for your needs</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <p className="text-[13px]"> Changes saved 2 mins ago </p>
        <Button aria-label="Preview Button">
          <IconEye />
        </Button>
      </div>
    </header>
  );
};
