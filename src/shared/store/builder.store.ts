import { enableMapSet } from "immer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

enableMapSet();

export const useBuilderStore = create<BuilderStore>()(
  immer((set) => ({
    elements: [],
    selectedElement: null,
    selectedElementId: null,

    updateElement: (element) =>
      set((state) => {
        const index = state.elements.findIndex(
          (el) => el.fieldsetTextId === element.fieldsetTextId
        );

        if (index !== -1) {
          state.elements[index] = element;
        } else {
          state.elements.push(element);
        }
      }),

    updateElementField: (field) =>
      set((state) => {
        // update the elements with new fields
        const newElements = state.elements.map((el) => {
          const fields = el.fields.map((f) =>
            f.labelTextId === field.labelTextId ? field : f
          );
          return { ...el, fields };
        });

        state.elements = newElements;
      }),

    setElements: (elements) =>
      set((state) => {
        console.log("ELMENETS: ", elements);
        state.elements = elements;
      }),

    setSelectedElement: (element) => {
      set((state) => {
        if (element && "fieldsetTextId" in element) {
          state.selectedElement = element;
          state.selectedElementId = element?.fieldsetTextId || null;
        } else {
          state.selectedElement = element;
          state.selectedElementId = element?.labelTextId || null;
        }
      });
    },
  }))
);
