import { DragOverlay, useDndContext } from "@dnd-kit/core";
import { FormElement } from "./FormElement";
import RenderElement from "./RenderElement";
import FieldSet from "../ui/FieldSet";

export default function DragOverlayComp() {
  const dndCtx = useDndContext();

  const renderOverlayContent = () => {
    if (dndCtx?.active?.data?.current?.type === "tool") {
      return (
        <FormElement
          className="pointer-events-none"
          isOverlay
          el={dndCtx?.active?.data?.current?.data}
        />
      );
    }

    if (dndCtx?.active?.data?.current?.type === "fieldSet") {
      return (
        <div
          className="shadow-lg"
          style={{
            height: dndCtx?.active?.rect?.current?.translated?.height,
          }}
        >
          <FieldSet
            label={dndCtx?.active?.data?.current?.data?.fieldsetName}
            id={dndCtx?.active?.data?.current?.data?.fieldsetTextId}
          >
            <div className="flex flex-col space-y-4 py-4">
              {dndCtx?.active?.data?.current?.data?.fields?.map(
                (field: BuilderElementField) => (
                  <RenderElement el={field} key={field.labelTextId} />
                ),
              )}
            </div>
          </FieldSet>
        </div>
      );
    }

    if (dndCtx?.active?.data?.current?.type === "field") {
      return (
        <div className="cursor-grabbing bg-field-bg rounded-[8px] shadow-lg [&_)div]:!border-none">
          <RenderElement disabledDrag el={dndCtx?.active?.data?.current.data} />
        </div>
      );
    }
  };

  return <DragOverlay>{renderOverlayContent()}</DragOverlay>;
}
