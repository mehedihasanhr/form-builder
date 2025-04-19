import { Active, Over } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";

/**
 * Handles sorting of tools in the tools list
 */
export function handleToolSorting(active: Active, over: Over, tools: Tool[]) {
  const oldIndex = tools.findIndex((el) => el.id === active.id);
  const newIndex = tools.findIndex((el) => el.id === over.id);

  if (oldIndex !== -1 && newIndex !== -1) {
    const sorted = arrayMove(tools, oldIndex, newIndex);
    return sorted;
  }

  return tools;
}

/**
 * Handles dragging a tool into the form builder area
 */
export function handleToolToElement(
  active: Active,
  over: Over,
  elements: BuilderElement[],
) {
  const element = active.data.current?.data as Tool;
  const parent = over.data.current?.parent;
  const overContainer = over.data.current?.data;
  const position = over.data.current?.position;

  const newField: BuilderElementField = {
    labelName: element.label,
    labelTextId: uuidv4(),
    inputType: element.type,
    options: element?.options || "",
  };

  if (parent === "root") {
    return handleRootLevelInsertion(
      newField,
      overContainer,
      position,
      elements,
    );
  } else {
    return handleFieldsetInsertion(
      newField,
      parent,
      overContainer,
      position,
      elements,
    );
  }
}

/**
 * Handles inserting a new field at the root level (new fieldset)
 */
export function handleRootLevelInsertion(
  field: BuilderElementField,
  overContainer: any,
  position: string,
  elements: BuilderElement[],
) {
  const newElement: BuilderElement = {
    fieldsetName: `Field-set ${elements.length}`,
    fieldsetTextId: uuidv4(),
    fields: [field],
  };

  const index = elements.findIndex(
    (el) => el.fieldsetTextId === overContainer.fieldsetTextId,
  );

  const newElements =
    position === "top"
      ? [...elements.slice(0, index), newElement, ...elements.slice(index)]
      : [
          ...elements.slice(0, index + 1),
          newElement,
          ...elements.slice(index + 1),
        ];

  const selectedElement = {
    ...newElement,
    type: "fieldSet",
  } as SelectedElement;

  return [newElements, selectedElement];
}

/**
 * Handles inserting a new field into an existing fieldset
 */
export function handleFieldsetInsertion(
  field: BuilderElementField,
  parentId: string,
  overContainer: BuilderElementField,
  position: string,
  elements: BuilderElement[],
) {
  const fieldSet = elements.find((el) => el.fieldsetTextId === parentId);
  if (!fieldSet) return;

  const index = fieldSet.fields.findIndex(
    (f) => f.labelTextId === overContainer.labelTextId,
  );
  if (index === -1) return;

  const fields =
    position === "top"
      ? [
          ...fieldSet.fields.slice(0, index),
          field,
          ...fieldSet.fields.slice(index),
        ]
      : [
          ...fieldSet.fields.slice(0, index + 1),
          field,
          ...fieldSet.fields.slice(index + 1),
        ];

  const updatedFieldSet = { ...fieldSet, fields };
  const newElements = elements.map((el) =>
    el.fieldsetTextId === updatedFieldSet.fieldsetTextId ? updatedFieldSet : el,
  );

  const selectedElement = { ...field, type: "field" };
  return [newElements, selectedElement];
}

/**
 * Handles rearranging fields within or between fieldsets
 */
export function handleFieldRearrangement(
  active: Active,
  over: Over,
  elements: BuilderElement[],
) {
  const dragElement = active.data.current;
  const overElement = over.data.current;
  const position = over.data.current?.position;

  if (!dragElement || !overElement) return;

  if (dragElement.parent === overElement.parent) {
    return handleSameFieldsetMove(dragElement, overElement, elements);
  } else {
    return handleCrossFieldsetMove(
      dragElement,
      overElement,
      position,
      elements,
    );
  }
}

/**
 * Handles moving a field within the same fieldset
 */
export function handleSameFieldsetMove(
  dragElement: any,
  overElement: any,
  elements: BuilderElement[],
) {
  const parentFieldSet = elements.find(
    (el) => el.fieldsetTextId === overElement.parent,
  );
  if (!parentFieldSet) return;

  const oldIndex = parentFieldSet.fields.findIndex(
    (field) => field.labelTextId === dragElement.data.labelTextId,
  );
  const newIndex = parentFieldSet.fields.findIndex(
    (field) => field.labelTextId === overElement.data.labelTextId,
  );

  if (oldIndex === -1 || newIndex === -1) return;

  const sortedFields = arrayMove(parentFieldSet.fields, oldIndex, newIndex);
  const updatedFieldSet = { ...parentFieldSet, fields: sortedFields };

  const newElements = elements.map((el) =>
    el.fieldsetTextId === updatedFieldSet.fieldsetTextId ? updatedFieldSet : el,
  );

  return [newElements, dragElement];
}

/**
 * Handles moving a field between different fieldsets
 */
export function handleCrossFieldsetMove(
  dragElement: any,
  overElement: any,
  position: string,
  elements: BuilderElement[],
) {
  const fromFieldset = elements.find(
    (el) => el.fieldsetTextId === dragElement.parent,
  );
  const toFieldset = elements.find(
    (el) => el.fieldsetTextId === overElement.parent,
  );

  if (!fromFieldset || !toFieldset) return;

  const movingField = dragElement.data as BuilderElementField;
  const oldIndex = fromFieldset.fields.findIndex(
    (field) => field.labelTextId === movingField.labelTextId,
  );
  let newIndex = toFieldset.fields.findIndex(
    (field) => field.labelTextId === overElement.data.labelTextId,
  );

  newIndex = position === "top" ? newIndex : newIndex + 1;
  if (oldIndex === -1 || newIndex === -1) return;

  // Remove from old fieldset
  const newFromFields = [...fromFieldset.fields];
  newFromFields.splice(oldIndex, 1);

  // Insert into new fieldset
  const newToFields = [...toFieldset.fields];
  newToFields.splice(newIndex, 0, movingField);

  const updatedElements = elements.map((el) => {
    if (el.fieldsetTextId === fromFieldset.fieldsetTextId) {
      return { ...el, fields: newFromFields };
    }
    if (el.fieldsetTextId === toFieldset.fieldsetTextId) {
      return { ...el, fields: newToFields };
    }
    return el;
  });

  return [updatedElements, dragElement];
}

// Type guards and utility functions
export function isToolSorting(active: Active, over: Over): boolean {
  return Boolean(
    active?.id &&
      over?.id &&
      over.data?.current?.sortable?.containerId === "tools",
  );
}
