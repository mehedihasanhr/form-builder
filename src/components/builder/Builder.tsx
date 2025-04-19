import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { FormElementPanel } from "./FormElementPanel";
import BuilderModules from "./BuilderModules";
import { useBuilderToolsStore } from "@/shared/store/builder-tools.store";
import { arrayMove } from "@dnd-kit/sortable";
import { useBuilderStore } from "@/shared/store/builder.store";

export function Builder() {
  const { tools, setActiveDraggedTool, sortTools } = useBuilderToolsStore();
  const { setDraggedElement } = useBuilderStore();

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  // handle onDragStart
  const onDragStart = (event: DragStartEvent) => {
    if (event?.active?.data?.current) {
      setActiveDraggedTool(event.active.data.current as Tool);
    }
  };

  // handle Drag end
  const onDragEnd = (event: DragEndEvent) => {
    setActiveDraggedTool(null);

    const { active, over } = event;
    const toolsArray = Array.from(tools.values());

    if (active?.id && over?.id && active.id !== over.id) {
      const oldIndex = toolsArray.findIndex((el) => el.id === active.id);
      const newIndex = toolsArray.findIndex((el) => el.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const sorted = arrayMove(toolsArray, oldIndex, newIndex);
        sortTools(sorted);
      }
    }
  };

  // handle DragOver
  const onDragOver = (event: DragOverEvent) => {
    console.log({ event });
    if (event?.over?.id === "canvas" && event?.active?.data?.current) {
      setDraggedElement(event.active.data.current as Tool);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div className="grid grid-cols-[21rem_1fr_21rem] gap-9">
        <FormElementPanel />
        <BuilderModules />
        <div></div>
      </div>
    </DndContext>
  );
}
