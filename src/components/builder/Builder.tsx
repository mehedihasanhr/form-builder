import { useBuilderToolsStore } from "@/shared/store/builder-tools.store";
import { useBuilderStore } from "@/shared/store/builder.store";
import {
  handleFieldRearrangement,
  handleToolSorting,
  handleToolToElement,
  isToolSorting,
} from "@/shared/utils/drag-methods";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  pointerWithin,
  rectIntersection,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import BuilderModules from "./BuilderModules";
import DragOverlayComp from "./DragOverlayComp";
import FieldConfigSidebar from "./FieldConfigSidebar";
import { FormElementPanel } from "./FormElementPanel";

export function Builder() {
  const { elements, setElements, setSelectedElement, selectedElementId } =
    useBuilderStore();
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
    const { active, over } = event;

    if (!active || !over) return;

    if (isToolSorting(active, over)) {
      const toolsArray = Array.from(tools.values());
      const sortedTools = handleToolSorting(active, over, toolsArray);
      sortTools(sortedTools);
      setActiveDraggedTool(null);
    } else if (active.data?.current?.type === "tool") {
      const [newElements, selectedELement] = handleToolToElement(
        active,
        over,
        elements,
      );
      setElements(newElements);
      setSelectedElement(selectedELement);
    } else if (active.data?.current?.type === "field") {
      const [newElements, selectedELement] = handleFieldRearrangement(
        active,
        over,
        elements,
      );
      setElements(newElements);
      setSelectedElement(selectedELement);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      collisionDetection={closestCenter}
    >
      <div className="grid grid-cols-[21rem_1fr_21rem] gap-9">
        <FormElementPanel />
        <BuilderModules />
        {selectedElementId && <FieldConfigSidebar />}
      </div>
      <DragOverlayComp />
    </DndContext>
  );
}
