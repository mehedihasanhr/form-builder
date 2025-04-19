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
import DragOverlayComp from "./DragOverlayComp";
import { v4 as uuidv4 } from "uuid";

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
    setActiveDraggedTool(null);

    const { active, over } = event;

    // handle tool sorting
    if (
      active?.id &&
      over?.id &&
      over.data?.current?.sortable?.containerId === "tools" &&
      active.id !== over.id
    ) {
      const toolsArray = Array.from(tools.values());
      // if sorting tools list
      const oldIndex = toolsArray.findIndex((el) => el.id === active.id);
      const newIndex = toolsArray.findIndex((el) => el.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const sorted = arrayMove(toolsArray, oldIndex, newIndex);
        sortTools(sorted);
      }
    } else if (active?.data?.current?.type === "tool") {
      if (active?.id && over?.id && active.id !== over.id) {
        const element = active.data.current?.data as Tool;
        const parent = over.data.current?.parent;
        const overContainer = over.data.current?.data;
        const position = over.data.current?.position;

        const field: BuilderElementField = {
          labelName: element.label,
          labelTextId: uuidv4(),
          inputType: element.type,
          options: element?.options || "",
        };

        if (parent === "root") {
          const entryElement: BuilderElement = {
            fieldsetName: `Field-set ${elements.length}`,
            fieldsetTextId: uuidv4(),
            fields: [field],
          };

          const index = elements.findIndex(
            (el) => el.fieldsetTextId === overContainer.fieldsetTextId,
          );

          if (position === "top") {
            const newElements = [
              ...elements.slice(0, index),
              entryElement,
              ...elements.slice(index),
            ];
            setElements(newElements);
          } else {
            const newElements = [
              ...elements.slice(0, index + 1),
              entryElement,
              ...elements.slice(index + 1),
            ];
            setElements(newElements);
          }

          setSelectedElement({
            ...entryElement,
            type: "fieldSet",
          } as SelectedElement);
        } else {
          const fieldSet = elements.find((el) => el.fieldsetTextId === parent);

          if (!fieldSet) return;

          const index = fieldSet?.fields.findIndex(
            (field) =>
              field.labelTextId ===
              (overContainer as BuilderElementField)?.labelTextId,
          );

          if (index === -1) return;

          let fields: BuilderElementField[] = [];

          if (position === "top") {
            fields = [
              ...fieldSet?.fields.slice(0, index),
              field,
              ...fieldSet?.fields.slice(index),
            ];
          } else {
            fields = [
              ...fieldSet?.fields.slice(0, index + 1),
              field,
              ...fieldSet?.fields.slice(index + 1),
            ];
          }

          const entryElement: BuilderElement = {
            ...fieldSet,
            fields,
          };

          const newElements = elements.map((el) =>
            el.fieldsetTextId === entryElement.fieldsetTextId
              ? entryElement
              : el,
          );

          setElements(newElements);
          setSelectedElement({ ...field, type: "field" });
        }
      }
    } else if (active?.data?.current?.type === "field") {
      // controll field rearrange
      if (active?.id && over?.id && active.id !== over.id) {
        const dragElement = active.data.current;
        const overElement = over.data.current;
        const position = over?.data?.current?.position;

        if (dragElement.parent === overElement?.parent) {
          const parentFieldSet = elements.find(
            (el) => el.fieldsetTextId === overElement?.parent,
          );

          if (!parentFieldSet) return;

          const oldIndex = parentFieldSet?.fields?.findIndex(
            (field) => field.labelTextId === dragElement.data?.labelTextId,
          );

          const newIndex = parentFieldSet?.fields.findIndex(
            (field) => field.labelTextId === overElement?.data?.labelTextId,
          );

          if (oldIndex !== -1 && newIndex !== -1) {
            const sorted = arrayMove(
              parentFieldSet?.fields,
              oldIndex,
              newIndex,
            );

            const newFieldSet = {
              ...parentFieldSet,
              fields: sorted,
            };

            const newElements = elements.map((el) =>
              el.fieldsetTextId === newFieldSet.fieldsetTextId
                ? newFieldSet
                : el,
            );

            setElements(newElements);
          }
        } else {
          const fromFieldset = elements.find(
            (el) => el.fieldsetTextId === dragElement.parent,
          );
          const toFieldset = elements.find(
            (el) => el.fieldsetTextId === overElement?.parent,
          );

          if (!fromFieldset || !toFieldset) return;

          const movingField = dragElement.data as BuilderElementField;

          const oldIndex = fromFieldset.fields.findIndex(
            (field) => field.labelTextId === movingField.labelTextId,
          );

          let newIndex = toFieldset.fields.findIndex(
            (field) => field.labelTextId === overElement?.data?.labelTextId,
          );

          newIndex = position === "top" ? newIndex : newIndex + 1;

          if (oldIndex === -1 || newIndex === -1) return;

          // Remove from old fieldset
          const newFromFields = [...fromFieldset.fields];
          newFromFields.splice(oldIndex, 1);

          // Insert into new fieldset
          const newToFields = [...toFieldset.fields];
          newToFields.splice(newIndex, 0, movingField);

          const updatedElements = elements.map((el) => {
            if (el.fieldsetTextId === fromFieldset.fieldsetTextId) {
              return {
                ...el,
                fields: newFromFields,
              };
            } else if (el.fieldsetTextId === toFieldset.fieldsetTextId) {
              return {
                ...el,
                fields: newToFields,
              };
            }
            return el;
          });

          setElements(updatedElements);
        }
      }
    }
  };

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
      <DragOverlayComp />
    </DndContext>
  );
}
