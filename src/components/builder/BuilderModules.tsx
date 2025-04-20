import { cn } from "@/shared/lib/utils";
import { fetchData } from "@/shared/service/fetchData";
import { useBuilderStore } from "@/shared/store/builder.store";
import { SortableContext } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import FieldSet from "../ui/FieldSet";
import DroppableArea from "./DropableArea";
import RenderElement from "./RenderElement";

export default function BuilderModules() {
  const [isLoading, setIsLoading] = useState(false);
  const { elements, initElements, setSelectedElement, selectedElementId } =
    useBuilderStore();

  const fetchElementData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchData();
      initElements(data.your_respons);
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
    <div className="flex flex-col gap-y-4">
      <h4> Your Modules </h4>

      {isLoading ? (
        <div className="w-full h-full bg-white p-4 rounded">Loading...</div>
      ) : (
        <div className={cn("w-full h-full bg-white p-4 rounded")}>
          <div className="flex flex-col items-stretch">
            {elements.map((element, elIndex) => (
              <DroppableArea
                key={element.fieldsetTextId}
                id={element.fieldsetTextId}
                isLast={elIndex === elements.length - 1}
                data={{
                  data: element,
                  parent: "root",
                }}
              >
                <FieldSet
                  key={element.fieldsetTextId}
                  label={element.fieldsetName}
                  id={element.fieldsetTextId}
                  onClick={onFieldSet(element)}
                  data-selected={selectedElementId === element.fieldsetTextId}
                  data={element}
                >
                  {element.fields.length ? (
                    <SortableContext
                      id="field-sorting"
                      items={element.fields.map((f) => ({
                        id: f.labelTextId,
                      }))}
                    >
                      {element.fields.map((field, index) => (
                        <DroppableArea
                          key={field.labelTextId}
                          id={field.labelTextId}
                          isLast={index === element.fields.length - 1}
                          data={{
                            type: "field",
                            data: field,
                            parent: element.fieldsetTextId,
                          }}
                        >
                          <RenderElement
                            el={field}
                            onSelect={onFieldSelect}
                            isSelected={selectedElementId === field.labelTextId}
                            fieldSetId={element.fieldsetTextId}
                          />
                        </DroppableArea>
                      ))}
                    </SortableContext>
                  ) : null}
                </FieldSet>
              </DroppableArea>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
