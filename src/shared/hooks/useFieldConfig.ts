import { toast } from "sonner";
import { useBuilderStore } from "../store/builder.store";
import { applyChange } from "../service/applyChange";

export const useFieldConfig = () => {
  const {
    elements,
    selectedElement,
    updateElement,
    updateElementField,
    setSelectedElement,
  } = useBuilderStore();

  // Handle value change for fieldsets
  const handleFieldSetChange = (
    key: keyof typeof selectedElement | string,
    value: string,
  ) => {
    if (!selectedElement || selectedElement.type !== "fieldSet") return;

    const updated = { ...selectedElement, [key]: value } as BuilderElement;
    updateElement(updated);
    setSelectedElement(updated as SelectedElement);
  };

  // Handle value change for fields
  const handleFieldChange = (
    key: keyof typeof selectedElement | string,
    value: string,
  ) => {
    if (!selectedElement || selectedElement.type !== "field") return;

    const updated = { ...selectedElement, [key]: value } as BuilderElementField;
    updateElementField(updated);
    setSelectedElement(updated as SelectedElement);
  };

  // Add new option to the field
  const handleAddOption = (newOption: string, cb: VoidFunction) => {
    if (!selectedElement || selectedElement.type !== "field" || !newOption)
      return;

    const updatedOptions =
      "options" in selectedElement && Array.isArray(selectedElement.options)
        ? [...selectedElement.options, newOption]
        : [newOption];

    const updated = {
      ...selectedElement,
      options: updatedOptions,
    } as BuilderElementField;

    updateElementField(updated);
    setSelectedElement(updated as SelectedElement);

    cb();
  };

  // Delete option from the field
  const handleDeleteOption = (index: number) => {
    if (!selectedElement || selectedElement.type !== "field") return;

    const updatedOptions = [
      ...("options" in selectedElement ? selectedElement.options : []),
    ];
    updatedOptions.splice(index, 1);

    const updated = {
      ...selectedElement,
      options: updatedOptions,
    } as BuilderElementField;

    updateElementField(updated);
    setSelectedElement(updated as SelectedElement);
  };

  // Handle form submission to save changes
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedElement) return;

    const data = JSON.stringify(elements);

    try {
      const response = await applyChange(data);
      if (response?.ok) {
        toast.success("Changes applied successfully.");
      }
    } catch (err) {
      toast.error("Failed to apply changes.");
    }
  };

  return {
    handleFieldSetChange,
    handleFieldChange,
    handleAddOption,
    handleDeleteOption,
    handleSubmit,
  };
};
