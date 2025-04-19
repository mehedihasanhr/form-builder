import { DragOverlay, useDndContext } from "@dnd-kit/core";
import { FormElement } from "./FormElement";
import RenderElement from "./RenderElement";

export default function DragOverlayComp() {
  const dndCtx = useDndContext();

  const renderOverlayContent = () => {
    if (dndCtx?.active?.data?.current?.type === "tool") {
      return <FormElement isOverlay el={dndCtx?.active?.data?.current?.data} />;
    }

    if (dndCtx?.active?.data?.current?.type === "fieldSet") {
      return <div className="bg-white shadow-lg h-34"> Field set </div>;
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
