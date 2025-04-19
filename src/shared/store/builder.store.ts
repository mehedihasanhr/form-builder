import { enableMapSet } from "immer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { FORM_ELEMENTS } from "../constants/form-elements";
import { v4 as uuidv4 } from "uuid";

enableMapSet();

export const useBuilderStore = create<BuilderStore>()(
  immer((set) => ({
    elements: new Map(
      FORM_ELEMENTS.map((tool) => [tool.id, { ...tool, id: uuidv4() }]),
    ),
    selectedElement: null,
    selectedElementId: null,
    draggedElement: null,
    draggedElementId: null,

    setSelectedElement: (element) => {
      set((state) => {
        state.selectedElement = element;
        state.selectedElementId = element?.id || null;
      });
    },

    setDraggedElement: (element) => {
      set((state) => {
        state.draggedElement = element ? { ...element, id: uuidv4() } : null;
        state.draggedElementId = element?.id || null;
      });
    },
  })),
);
