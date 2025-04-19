import { enableMapSet } from "immer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

enableMapSet();

export const useBuilderStore = create<BuilderStore>()(
  immer((set) => ({
    elements: [],
    selectedElement: null,
    selectedElementId: null,

    // init elements
    setElements: (elements) =>
      set((state) => {
        console.log("ELMENETS: ", elements);
        state.elements = elements;
      }),

    // update Elements
    updateElement: (element) =>
      set((state) => {
        const index = state.elements.findIndex(
          (el) => el.fieldsetTextId === element.fieldsetTextId,
        );

        if (index !== -1) {
          state.elements[index] = element;
        } else {
          state.elements.push(element);
        }
      }),

    // delete element
    deleteElement: (elementId: string) =>
      set((state) => {
        state.elements = state.elements.filter(
          (el) => el.fieldsetTextId !== elementId,
        );
      }),

    // update the elements with new fields
    updateElementField: (field) =>
      set((state) => {
        const newElements = state.elements.map((el) => {
          const fields = el.fields.map((f) =>
            f.labelTextId === field.labelTextId ? field : f,
          );
          return { ...el, fields };
        });

        console.log({ newElements });

        state.elements = newElements;
      }),

    // delete element field
    deleteElementField: (fieldId: string) =>
      set((state) => {
        const newElements = state.elements.map((el) => {
          const fields = el.fields.filter((f) => f.labelTextId !== fieldId);
          return { ...el, fields };
        });

        console.log({ newElements });

        state.elements = newElements;
      }),

    // handle selectedElement
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
  })),
);
