import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useBuilderStore = create<BuilderStore>()(
  immer((set) => ({
    hasChanged: false,
    elements: [],
    selectedElement: null,
    selectedElementId: null,

    // init elements
    initElements: (elements) =>
      set((state) => {
        state.elements = elements;
      }),

    // set elements
    setElements: (elements) =>
      set((state) => {
        state.elements = elements;
        state.hasChanged = true;
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

        state.hasChanged = true;
      }),

    // delete element
    deleteElement: (elementId: string) =>
      set((state) => {
        state.elements = state.elements.filter(
          (el) => el.fieldsetTextId !== elementId,
        );

        state.hasChanged = true;
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

        state.elements = newElements;
        state.hasChanged = true;
      }),

    // delete element field
    deleteElementField: (fieldId: string) =>
      set((state) => {
        const newElements = state.elements.map((el) => {
          const fields = el.fields.filter((f) => f.labelTextId !== fieldId);
          return { ...el, fields };
        });

        state.elements = newElements;
        state.hasChanged = true;
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

        state.hasChanged = true;
      });
    },

    markUnchanged: () =>
      set((state) => {
        state.hasChanged = false;
      }),
  })),
);
