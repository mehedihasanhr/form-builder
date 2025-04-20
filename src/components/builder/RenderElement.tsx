import {
  Checkbox,
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Radio,
  RadioGroup,
  Select,
} from "@headlessui/react";
import { IconCheck, IconCircle, IconSelector } from "@tabler/icons-react";
import { match } from "ts-pattern";
import { DatePicker } from "../ui/DatePicker";
import Field from "../ui/Field";
import Input from "../ui/Input";
import Label from "../ui/Label";
import Textarea from "../ui/Textarea";

export default function RenderElement({
  el,
  isSelected = false,
  onSelect,
  disabledDrag = false,
  fieldSetId,
}: {
  el: BuilderElementField;
  isSelected?: boolean;
  onSelect?: (el: BuilderElementField) => void;
  disabledDrag?: boolean;
  fieldSetId?: string;
}) {
  const handleOnSelect =
    (field: BuilderElementField) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      onSelect?.(field);
    };

  return (
    match(el)
      .with({ inputType: "text" }, (field) => (
        <Field
          draggableConfig={{
            id: el.labelTextId,
            data: { data: el, type: "field", parent: fieldSetId },
            disabled: disabledDrag,
          }}
          onClick={handleOnSelect(field)}
          data-selected={isSelected}
        >
          {field.labelName && <Label> {field.labelName} </Label>}
          <Input
            type={field.inputType}
            placeholder={field.placeholder || "Number Field"}
            readOnly
          />
        </Field>
      ))

      // Number input field
      .with({ inputType: "number" }, (field) => (
        <Field
          draggableConfig={{
            id: el.labelTextId,
            data: { data: el, type: "field", parent: fieldSetId },
            disabled: disabledDrag,
          }}
          onClick={handleOnSelect(field)}
          data-selected={isSelected}
        >
          {field.labelName && <Label> {field.labelName} </Label>}
          <Input
            type={field.inputType}
            placeholder={field.placeholder || "Number Field"}
            readOnly
          />
        </Field>
      ))

      // select field
      .with({ inputType: "select" }, (field) => (
        <Field
          draggableConfig={{
            id: el.labelTextId,
            data: { data: el, type: "field", parent: fieldSetId },
            disabled: disabledDrag,
          }}
          onClick={handleOnSelect(field)}
          data-selected={isSelected}
        >
          {field.labelName && <Label> {field.labelName} </Label>}
          <Select
            name="status"
            aria-label="Project status"
            disabled
            className="h-9 rounded-[4px] border border-border placeholder:text-sm placeholder:text-[rgba(99,99,102,1)] py-2 px-3"
          >
            {typeof field.options !== "string" &&
              field.options?.map((opt, index) => (
                <option key={`option-${index}`} value={opt}>
                  {opt}
                </option>
              ))}
          </Select>
        </Field>
      ))

      // combobox
      .with({ inputType: "combobox" }, (field) => (
        <Field
          draggableConfig={{
            id: el.labelTextId,
            data: { data: el, type: "field", parent: fieldSetId },
            disabled: disabledDrag,
          }}
          onClick={handleOnSelect(field)}
          data-selected={isSelected}
        >
          {field.labelName && <Label> {field.labelName} </Label>}
          <Combobox disabled>
            <div className="relative">
              <ComboboxInput
                aria-label="Assignee"
                placeholder={field.placeholder || "Combobox"}
                className="h-9  w-full rounded-[4px] border border-border placeholder:text-sm placeholder:text-[rgba(99,99,102,1)] py-2 px-3"
              />
              <ComboboxButton className="absolute inset-y-0 right-0 px-2.5">
                <IconSelector className="size-4 fill-white/60 group-data-[hover]:fill-white" />
              </ComboboxButton>
            </div>
            <ComboboxOptions anchor="bottom" className="border empty:invisible">
              {typeof field.options !== "string" &&
                field.options?.map((opt, index) => (
                  <ComboboxOption
                    key={`option-${index}`}
                    value={opt}
                    className="data-[focus]:bg-blue-100"
                  >
                    {opt}
                  </ComboboxOption>
                ))}
            </ComboboxOptions>
          </Combobox>
        </Field>
      ))

      // checkbox
      .with({ inputType: "checkbox" }, (field) => (
        <Field
          draggableConfig={{
            id: el.labelTextId,
            data: { data: el, type: "field", parent: fieldSetId },
            disabled: disabledDrag,
          }}
          onClick={handleOnSelect(field)}
          data-selected={isSelected}
        >
          {field.labelName && <Label> {field.labelName} </Label>}

          <div className="flex flex-col items-stretch gap-1.5">
            {typeof field.options !== "string" &&
              field.options.map((opt, index) => (
                <label
                  key={`option-${index}`}
                  className="flex items-center gap-2"
                >
                  <Checkbox
                    checked
                    className="group size-6 rounded-md bg-white p-1 ring-1 ring-[rgba(119,119,119,1)] ring-inset data-[checked]:text-gray-500"
                  >
                    <IconCheck className="hidden size-4 group-data-[checked]:block" />
                  </Checkbox>
                  <span> {opt} </span>
                </label>
              ))}
          </div>
        </Field>
      ))

      // radio-group
      .with({ inputType: "radio-group" }, (field) => (
        <Field
          draggableConfig={{
            id: el.labelTextId,
            data: { data: el, type: "field", parent: fieldSetId },
            disabled: disabledDrag,
          }}
          onClick={handleOnSelect(field)}
          data-selected={isSelected}
        >
          {field.labelName && <Label> {field.labelName} </Label>}

          <RadioGroup className="flex items-center gap-4">
            {typeof field.options !== "string" &&
              field.options?.map((opt, index) => (
                <Radio
                  key={`option-${index}`}
                  value={opt}
                  className="flex items-center gap-2"
                >
                  <IconCircle className="size-5 text-[rgba(119,119,119,1)] group-data-[checked]:block" />
                  <span> {opt} </span>
                </Radio>
              ))}
          </RadioGroup>
        </Field>
      ))

      .with({ inputType: "textarea" }, (field) => (
        <Field
          draggableConfig={{
            id: el.labelTextId,
            data: { data: el, type: "field", parent: fieldSetId },
            disabled: disabledDrag,
          }}
          onClick={handleOnSelect(field)}
          data-selected={isSelected}
        >
          {field.labelName && <Label> {field.labelName} </Label>}

          <Textarea
            placeholder={field.placeholder || "Textarea Field"}
            readOnly
          />
        </Field>
      ))

      .with({ inputType: "datepicker" }, (field) => (
        <Field
          draggableConfig={{
            id: el.labelTextId,
            data: { data: el, type: "field", parent: fieldSetId },
            disabled: disabledDrag,
          }}
          onClick={handleOnSelect(field)}
          data-selected={isSelected}
        >
          {field.labelName && <Label> {field.labelName} </Label>}

          <DatePicker />
        </Field>
      ))

      .otherwise(() => null)
  );
}
