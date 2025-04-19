import { useBuilderToolsStore } from "@/shared/store/builder-tools.store";
import { DragOverlay } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { FormElement } from "./FormElement";

import { SortableContext, useSortable } from "@dnd-kit/sortable";

export const FormElementPanel = () => {
  const { tools, activeDraggedTool } = useBuilderToolsStore();

  return (
    <div>
      <div className="flex flex-col gap-y-4 sticky top-28 scroll-mt-20">
        <h4> Custom Field </h4>

        <SortableContext items={Array.from(tools.values())}>
          <ul className="flex flex-col gap-y-4">
            {Array.from(tools.values()).map((el) => (
              <SortableList key={el.id} el={el} />
            ))}
          </ul>
        </SortableContext>

        <DragOverlay>
          {activeDraggedTool ? (
            <FormElement el={activeDraggedTool} isOverlay={true} />
          ) : null}
        </DragOverlay>
      </div>
    </div>
  );
};

export const SortableList = ({ el }: { el: Tool }) => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: el.id, data: el });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      className="group"
      {...(isDragging ? { "data-dragging": "true" } : {})}
      {...listeners}
      {...attributes}
      style={style}
    >
      <FormElement el={el} />
    </li>
  );
};
