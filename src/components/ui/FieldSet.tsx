import { cn } from "@/shared/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { ReactNode } from "react";
import DroppableArea from "../builder/DropableArea";
import { useDndContext } from "@dnd-kit/core";

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
  const { isDragging, attributes, listeners, setNodeRef } = useSortable({
    id: id,
    data: { data, type: "fieldSet", parent: "root" },
  });

  return (
    <fieldset
      ref={setNodeRef}
      id={`fieldset-${id}`}
      {...(isDragging ? { "data-dragging": true } : {})}
      onClick={onClick}
      className={cn(
        "group relative border p-4 border-border rounded-[8px] select-none data-[selected=true]:border-green-500",
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
      <div className="flex flex-col items-stretch">
        {children || (
          <DroppableArea
            id={`${id}-emptyFidldset`}
            data={{
              data: {
                id,
                fieldsetTextId: id,
                ...data,
              },
              type: "field",
              parent: id,
            }}
            className="h-40"
          />
        )}
      </div>
    </fieldset>
  );
}
