import { cn } from "@/shared/lib/utils";
import { useBuilderStore } from "@/shared/store/builder.store";
import { DndContext, useDroppable } from "@dnd-kit/core";
import RenderElement from "./RenderElement";
import { SortableContext } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { SortableModule } from "./SortableMoudle";

export default function BuilderModules() {
  const { elements, draggedElement } = useBuilderStore();
  const { isOver, active, setNodeRef } = useDroppable({ id: "canvas" });

  return (
    <DndContext>
      <div className="flex flex-col gap-y-4">
        <h4> Your Modules </h4>
        <div
          ref={setNodeRef}
          className={cn(
            "w-full h-full bg-white p-4 rounded",
            isOver && "border border-green-500 border-dashed",
          )}
        >
          <SortableContext
            items={
              draggedElement
                ? [...Array.from(elements.values()), draggedElement]
                : [...Array.from(elements.values())]
            }
          >
            <div className="flex flex-col items-stretch gap-y-4">
              {Array.from(elements.values()).map((element) => (
                <SortableModule key={element.id} id={element.id} data={element}>
                  <div> {element.label} </div>
                </SortableModule>
              ))}

              {draggedElement && (
                <SortableModule id={draggedElement.id} data={draggedElement}>
                  <RenderElement el={draggedElement} />
                </SortableModule>
              )}
            </div>
          </SortableContext>
          BuilderModules
        </div>
      </div>
    </DndContext>
  );
}
