import { motion } from "framer-motion";
import { IconPlus } from "@tabler/icons-react";
import { cn } from "@/shared/lib/utils";

export default function DropAreaPlaceholder({ isOver }: { isOver: boolean }) {
  return (
    <div
      className={cn(
        "transition-[height] duration-300 ease-in-out border-dashed min-h-4 rounded overflow-hidden",
      )}
    >
      {isOver && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 56 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className={cn(
            "rounded border flex items-center justify-center text-red-300",
            "border-red-500 bg-[rgba(255,241,241,1)]",
          )}
        >
          <IconPlus />
        </motion.div>
      )}
    </div>
  );
}
