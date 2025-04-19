import { useBuilderToolsStore } from "@/shared/store/builder-tools.store";
import { useBuilderStore } from "@/shared/store/builder.store";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import BuilderModules from "./BuilderModules";
import { FormElementPanel } from "./FormElementPanel";
import FieldConfigSidebar from "./FieldConfigSidebar";

export function Builder() {
  const { selectedElementId } = useBuilderStore();
  const { tools, setActiveDraggedTool, sortTools } = useBuilderToolsStore();
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

  console.log({ selectedElementId });

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="grid grid-cols-[21rem_1fr_21rem] gap-9">
        <FormElementPanel />
        <BuilderModules />
        {selectedElementId && <FieldConfigSidebar />}
      </div>
    </DndContext>
  );
}
