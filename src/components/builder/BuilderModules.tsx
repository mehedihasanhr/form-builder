import { cn } from "@/shared/lib/utils";
import { useBuilderStore } from "@/shared/store/builder.store";
import { DndContext, useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import FieldSet from "../ui/FieldSet";
import RenderElement from "./RenderElement";

const URL =
  "http://team.dev.helpabode.com:54292/api/wempro/react-dev/coding-test/devinfo.mehedi@gmail.com";

export default function BuilderModules() {
  const [isLoading, setIsLoading] = useState(false);
  const { elements, setElements, setSelectedElement, selectedElementId } =
    useBuilderStore();
  const { isOver, setNodeRef } = useDroppable({ id: "canvas" });

  const fetchElementData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(URL);
      console.log(res);
      if (res.ok) {
        const data = await res.json();
        setElements(data.your_respons);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // fetch builder elements data
  useEffect(() => {
    fetchElementData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // on field select
  const onFieldSelect = (field: BuilderElementField) => {
    setSelectedElement({ ...field, id: field.labelTextId, type: "field" });
  };

  // on fieldSet select
  const onFieldSet =
    (field: BuilderElement) => (e: React.MouseEvent<HTMLFieldSetElement>) => {
      e.stopPropagation();

      setSelectedElement({ ...field, type: "fieldSet" } as SelectedElement);
    };

  return (
    <DndContext>
      <div className="flex flex-col gap-y-4">
        <h4> Your Modules </h4>

        {isLoading ? (
          <div className="w-full h-full bg-white p-4 rounded">Loading...</div>
        ) : (
          <div
            ref={setNodeRef}
            className={cn(
              "w-full h-full bg-white p-4 rounded",
              isOver && "border border-green-500 border-dashed"
            )}
          >
            <SortableContext
              items={elements.map((el) => ({ ...el, id: el.fieldsetTextId }))}
            >
              <div className="flex flex-col items-stretch gap-y-4">
                {elements.map((element) => (
                  <FieldSet
                    key={element.fieldsetTextId}
                    label={element.fieldsetName}
                    id={element.fieldsetTextId}
                    onClick={onFieldSet(element)}
                    data-selected={selectedElementId === element.fieldsetTextId}
                  >
                    {element.fields.map((field) => (
                      <RenderElement
                        el={field}
                        onSelect={onFieldSelect}
                        isSelected={selectedElementId === field.labelTextId}
                      />
                    ))}
                  </FieldSet>
                ))}
              </div>
            </SortableContext>
          </div>
        )}
      </div>
    </DndContext>
  );
}
