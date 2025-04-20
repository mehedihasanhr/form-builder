import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { useFieldConfig } from "@/shared/hooks/useFieldConfig";
import { useBuilderStore } from "@/shared/store/builder.store";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { match } from "ts-pattern";
import { DeleteButton } from "./DeleteButton";

export default function FieldConfigSidebar() {
  const { selectedElement } = useBuilderStore();
  const [newOption, setNewOption] = useState("");
  const {
    isLoading,
    handleFieldSetChange,
    handleFieldChange,
    handleAddOption,
    handleDeleteOption,
    handleSubmit,
    deleteFieldSetElements,
    deleteField,
  } = useFieldConfig();

  const onDelete = async () => {
    if (!selectedElement) return;

    if (selectedElement.type === "fieldSet") {
      deleteFieldSetElements(
        (selectedElement as BuilderElement).fieldsetTextId,
      );
    }

    if (selectedElement.type === "field") {
      deleteField((selectedElement as BuilderElementField).labelTextId);
    }
  };

  if (!selectedElement) return null;

  // Render Field options
  const renderFieldOptions = () => {
    return Object.entries(selectedElement).map(([key, value]) =>
      match({ key, value })
        .with({ key: "labelName" }, ({ key, value }) => (
          <div className="flex flex-col gap-2" key={key}>
            <Label>Label Name</Label>
            <Input
              value={value}
              placeholder="Label Name"
              onChange={(e) => handleFieldChange(key, e.target.value)}
            />
          </div>
        ))
        .with({ key: "options" }, ({ key, value }) => (
          <div className="flex flex-col gap-2" key={key}>
            {Array.isArray(value) && (
              <>
                {value.map((opt: string, index: number) => (
                  <div
                    key={`${key}-${index}`}
                    className="flex items-center gap-2"
                  >
                    <Input
                      value={opt}
                      onChange={(e) => {
                        const updatedOptions = [...value];
                        updatedOptions[index] = e.target.value;

                        handleFieldChange("options", updatedOptions as any);
                      }}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      className="size-9 p-0 items-center justify-center bg-slate-100"
                      onClick={() => handleDeleteOption(index)}
                    >
                      <IconTrash size={20} />
                    </Button>
                  </div>
                ))}

                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Add new option"
                    className="flex-1"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                  />
                  <Button
                    type="button"
                    className="size-9 p-0 items-center justify-center bg-[rgba(191,204,221,1)] hover:bg-[rgb(138,167,205)]"
                    onClick={() =>
                      handleAddOption(newOption, () => setNewOption(""))
                    }
                  >
                    <IconPlus size={20} className="text-[rgba(28,81,184,1)]" />
                  </Button>
                </div>
              </>
            )}
          </div>
        ))
        .otherwise(() => null),
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-4 ">
        <h4>Field Properties</h4>

        <div className="flex-1">
          <div className="w-full h-fit bg-white p-4 rounded flex-col flex gap-4">
            {selectedElement &&
              ("fieldsetTextId" in selectedElement ? (
                // Fieldset configuration
                <div className="flex flex-col gap-2">
                  <Label>Field-set</Label>
                  <Input
                    placeholder="Enter field-set name"
                    value={selectedElement.fieldsetName}
                    onChange={(e) =>
                      handleFieldSetChange("fieldsetName", e.target.value)
                    }
                  />
                </div>
              ) : (
                // Field configuration
                <>
                  <div className="flex flex-col gap-2">
                    <Label>Field Name</Label>
                    <Input placeholder="Field name" />
                  </div>
                  {renderFieldOptions()}
                </>
              ))}

            <div className="flex gap-2">
              <DeleteButton onConfirm={onDelete} />
              <Button className="bg-primary text-white flex-1">
                {isLoading ? "Processing..." : "Apply change"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
