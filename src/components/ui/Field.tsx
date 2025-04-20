import { cn } from "@/shared/lib/utils";
import { useDraggable, UseDraggableArguments } from "@dnd-kit/core";
import { IconGripVertical } from "@tabler/icons-react";
import React from "react";

export default function Field({
  className,
  children,
  draggableConfig,
  ...props
}: React.ComponentProps<"div"> & { draggableConfig: UseDraggableArguments }) {
  const { isDragging, attributes, listeners, setNodeRef, setActivatorNodeRef } =
    useDraggable(draggableConfig);

  return (
    <div
      ref={setNodeRef}
      {...(isDragging ? { "data-dragging": true } : {})}
      className={cn(
        "group transition-all grid grid-cols-[40px_1fr] bg-field-bg pr-4 rounded-[8px] border border-border items-stretch select-none data-[selected=true]:border-[rgba(28,81,184,1)]",
        "data-[dragging]:opacity-50 data-[dragging]:border-red-500 data-[dragging]:border-dashed data-[dragging]:cursor-grabbing",
      )}
      {...props}
      {...attributes}
    >
      <div>
        <div
          ref={setActivatorNodeRef}
          className="flex items-center justify-center h-full rounded-l-[8px]"
          {...listeners}
        >
          <IconGripVertical
            size={18}
            className="text-[rgba(217,217,217,1)] pointer-events-none"
          />
        </div>
      </div>
      <div
        className={cn(
          "flex-1 flex flex-col space-y-2 pointer-events-none py-4",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
