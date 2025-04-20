import { cn } from "@/shared/lib/utils";
import { useDndContext, useDroppable } from "@dnd-kit/core";
import React from "react";
import DropAreaPlaceholder from "./DropAreaPlaceHolder";

export default function DroppableArea({
  children,
  id = "root",
  data,
  className,
  isLast,
}: {
  children?: React.ReactNode;
  id: string;
  data?: any;
  isLast?: boolean;
  className?: string;
}) {
  const { active } = useDndContext();

  const topSide = useDroppable({
    id: `${id}--top`,
    data: {
      ...(data || { id }),
      position: "top",
    },
  });

  const bottomSide = useDroppable({
    id: `${id}--bottom`,
    data: {
      ...(data || { id }),
      position: "bottom",
    },
  });

  const canDrop = () => {
    if (active?.data?.current?.type === "fieldSet" && data.type === "field") {
      return false;
    }
    return true;
  };

  return (
    <div className={cn("relative group", className)}>
      {/* top drop placeholder */}
      <div
        ref={topSide.setNodeRef}
        {...(topSide.isOver ? { "data-over": true } : {})}
        className={cn(
          "transition-[height] group duration-300 z-10 inset-x-0  min-h-4 ease-in-out border-dashed rounded ",
          "data-[over]:relative",
          canDrop() && "data-[over]:py-4",
        )}
      >
        <DropAreaPlaceholder isOver={topSide.isOver && canDrop()} />
      </div>
      {children && (
        <>
          <div className="">{children}</div>

          {/* bottom drop placeholder */}
          {isLast && (
            <div
              ref={bottomSide.setNodeRef}
              {...(bottomSide.isOver
                ? {
                    "data-over": true,
                    "data-acitve": bottomSide.active,
                  }
                : {})}
              className={cn(
                "transition-[height] group duration-300 z-10 inset-x-0  min-h-4 ease-in-out border-dashed rounded ",
                "data-[over]:relative",
                canDrop() && "data-[over]:py-4",
              )}
            >
              <DropAreaPlaceholder isOver={bottomSide.isOver && canDrop()} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
