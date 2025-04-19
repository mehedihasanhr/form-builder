/* eslint-disable @typescript-eslint/no-explicit-any */

type Tool = {
  id: string;
  type: string;
  icon: any;
  label: string;
  options?: string[];
};

interface BuilderToolsStore {
  tools: Map<string, Tool>;
  activeDraggedTool: Tool | null;
  activeDraggedToolId: string | number | null;

  sortTools: (tools: Tool[]) => void;
  setActiveDraggedTool: (tool: Tool | null) => void;
}

type BuilderElementField = Record<string, any> & {
  labelName: string;
  labelTextId: string;
  inputType: string;
  options: string | string[];
};

type BuilderElement = {
  fieldsetName: string;
  fieldsetTextId: string;
  fields: BuilderElementField[];
};

type SelectedElement =
  | ((BuilderElementField | BuilderElement) & { type: "field" | "fieldSet" })
  | null;

type BuilderStore = {
  elements: BuilderElement[];
  selectedElement: SelectedElement;
  selectedElementId: string | number | null;

  updateElement: (element: BuilderElement) => void;
  deleteElement: (elementId: string) => void;
  updateElementField: (field: BuilderElementField) => void;
  deleteElementField: (fieldId: string) => void;
  setElements: (elements: BuilderElement[]) => void;
  setSelectedElement: (element: SelectedElement) => void;
};
