import { cn } from "@/shared/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import { IconPlus } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

export default function DroppableArea({
  children,
  id = "root",
  data,
  className,
  isLast,
}: {
  children: React.ReactNode;
  id: string;
  data?: any;
  isLast?: boolean;
  className?: string;
}) {
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

  return (
    <div className={cn("relative group", className)}>
      {/* top drop placeholder */}
      <div
        ref={topSide.setNodeRef}
        {...(topSide.isOver ? { "data-over": true } : {})}
        className={cn(
          "transition-[height] group duration-300  z-10 inset-x-0  min-h-4 ease-in-out border-dashed rounded ",
          "data-[over]:h-full relative data-[over]:py-4 ",
        )}
      >
        <AnimatePresence>
          {topSide.isOver && (
            <motion.div
              initial={{ opacity: 0, height: 16 }}
              animate={{ opacity: 1, height: 56 }}
              exit={{ opacity: 1, height: 16 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className={cn(
                "rounded border flex items-center justify-center text-red-300",
                "group-data-[over]:duration-300 group-data-[over]:border-red-500 group-data-[over]:bg-[rgba(255,241,241,1)]",
              )}
            >
              <IconPlus />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="">{children}</div>

      {/* bottom drop placeholder */}
      <div
        ref={bottomSide.setNodeRef}
        {...(bottomSide.isOver ? { "data-over": true } : {})}
        className={cn(
          "duration-300 z-10 inset-x-0 min-h-4 ease-in-out border-dashed rounded ",
          "data-[over]:py-4",
          isLast && "block",
        )}
      >
        <AnimatePresence>
          {bottomSide.isOver && (
            <motion.div
              initial={{ opacity: 0, height: 16 }}
              animate={{ opacity: 1, height: 56 }}
              exit={{ opacity: 1, height: 16 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className={cn(
                "rounded border flex items-center justify-center text-red-300",
                "group-data-[over]:duration-300 group-data-[over]:border-red-500 group-data-[over]:bg-[rgba(255,241,241,1)]",
              )}
            >
              <IconPlus />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
