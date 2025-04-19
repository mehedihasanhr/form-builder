import { cn } from "@/shared/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { ReactNode } from "react";

export default function FieldSet({
  label,
  id,
  children,
  onClick,
  data,
  ...props
}: React.ComponentProps<"fieldset"> & {
  label: string;
  id: string;
  children: ReactNode;
  data?: any;
}) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id,
    data: { data, type: "fieldSet" },
  });

  return (
    <fieldset
      ref={setNodeRef}
      id={`fieldset-${id}`}
      onClick={onClick}
      className={cn(
        "group relative border px-4 border-border rounded-[8px] select-none data-[selected=true]:border-green-500",
        "data-[dragging]:border-red-500 data-[dragging]:border-dashed data-[dragging]:bg-[rgba(255,241,241,1)]",
      )}
      {...props}
      {...attributes}
    >
      <legend
        {...listeners}
        className="group-data-[selected=true]:border-green-500 bg-white py-2 px-4 rounded-[6px] text-[15px] font-medium border border-border"
      >
        {label}
      </legend>
      <div
        className={cn(
          "flex flex-col items-stretch ",
          "group-data-[dragging]:sr-only",
        )}
      >
        {children}
      </div>
    </fieldset>
  );
}
