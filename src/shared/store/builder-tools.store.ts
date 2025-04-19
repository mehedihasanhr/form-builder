import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { FORM_ELEMENTS } from "../constants/form-elements";
import { enableMapSet } from "immer";

enableMapSet();

export const useBuilderToolsStore = create<BuilderToolsStore>()(
  immer((set) => ({
    tools: new Map(FORM_ELEMENTS.map((tool) => [tool.id, tool])),
    activeDraggedTool: null,
    activeDraggedToolId: null,

    sortTools: (newOrder: Tool[]) => {
      const newMap = new Map(newOrder.map((tool) => [tool.id, tool]));
      set({ tools: newMap });
    },

    setActiveDraggedTool: (tool) =>
      set((state) => {
        state.activeDraggedTool = tool;
        state.activeDraggedToolId = tool?.id || null;
      }),
  })),
);
