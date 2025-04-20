import { useFieldConfig } from "@/shared/hooks/useFieldConfig";
import { useBuilderToolsStore } from "@/shared/store/builder-tools.store";
import { useBuilderStore } from "@/shared/store/builder.store";
import {
  handleFieldRearrangement,
  handleFieldSetRearrangement,
  handleToolSorting,
  handleToolToElement,
  isToolSorting,
} from "@/shared/utils/drag-methods";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  pointerWithin,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Button } from "../ui/Button";
import BuilderModules from "./BuilderModules";
import DragOverlayComp from "./DragOverlayComp";
import FieldConfigSidebar from "./FieldConfigSidebar";
import { FormElementPanel } from "./FormElementPanel";

export function Builder() {
  const {
    elements,
    hasChanged,
    setElements,
    setSelectedElement,
    selectedElementId,
  } = useBuilderStore();

  const { isLoading, handleUpdate } = useFieldConfig();

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
    } else if (active.data?.current?.type === "fieldSet") {
      const [newElements, selectedELement] = handleFieldSetRearrangement(
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
      collisionDetection={pointerWithin}
    >
      <div className="grid grid-cols-[21rem_1fr_21rem] gap-9">
        <FormElementPanel />
        <BuilderModules />
        <div className="flex flex-col items-stretch max-h-[calc(100vh-150px)] gap-4 sticky top-28 scroll-mt-20">
          <div className="flex-1 overflow-y-auto">
            {selectedElementId && <FieldConfigSidebar />}
          </div>

          {hasChanged && (
            <div className="flex gap-2">
              <Button className="bg-neutral-300 flex-1 font-medium">
                Draft
              </Button>

              <Button
                className="bg-primary text-white flex-1 hover:bg-primary/90 font-medium"
                onClick={() => handleUpdate(elements)}
              >
                {isLoading ? "Processing..." : "Apply"}
              </Button>
            </div>
          )}
        </div>
      </div>
      <DragOverlayComp />
    </DndContext>
  );
}
