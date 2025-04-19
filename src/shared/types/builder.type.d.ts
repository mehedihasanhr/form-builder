/* eslint-disable @typescript-eslint/no-explicit-any */

type Tool = {
  id: string;
  type: string;
  icon: any;
  label: string;
  config: Record<string, any>;
};

interface BuilderToolsStore {
  tools: Map<string, Tool>;
  activeDraggedTool: Tool | null;
  activeDraggedToolId: string | number | null;

  sortTools: (tools: Tool[]) => void;
  setActiveDraggedTool: (tool: Tool | null) => void;
}

interface BuilderStore {
  elements: Map<string, Tool>;
  selectedElement: Tool | null;
  selectedElementId: string | number | null;
  draggedElement: Tool | null;
  draggedElementId: string | number | null;

  setSelectedElement: (element: Tool | null) => void;
  setDraggedElement: (element: Tool | null) => void;
}
