import { cn } from "@/shared/lib/utils";
import { IconGripVertical } from "@tabler/icons-react";
import { Button } from "../ui/Button";

export const FormElement = ({
  el,
  isOverlay = false,
}: {
  el: Tool;
  isOverlay?: boolean;
}) => {
  return (
    <div
      {...(isOverlay ? { "data-overlay": "true" } : {})}
      className={cn(
        "bg-white flex items-center gap-3 py-3.5 px-4 rounded-[8px] select-none h-12  border-dashed",
        "group-data-[dragging]:opacity-15 group-data-[dragging]:border-2 group-data-[dragging]:bg-transparent",
        "data-[overlay]:rotate-5 data-[overlay]:cursor-grabbing data-[overlay]:shadow-[0_8px_32px_0_rgba(17,17,26,0.05),0_4px_16px_0_rgba(17,17,26,0.05)]",
      )}
    >
      <div className="flex-1 font-medium flex items-center gap-3">
        <el.icon className="w-8 h-5 text-zinc-400" />
        {el.label}
      </div>
      <Button aria-label={`${el.label} Drag button`} className="w-fit px-0 ">
        <IconGripVertical className="text-neutral-400 group-data-[overlay]:!text-green-500" />
      </Button>
    </div>
  );
};
