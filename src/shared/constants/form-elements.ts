import {
  IconCalendarWeek,
  IconCircle,
  IconLabel,
  IconRectangle,
  IconSquare,
  IconTypography,
} from "@tabler/icons-react";
import { ComboBoxIcon } from "@/components/icons/ComboBoxIcon";

export const FORM_ELEMENTS = [
  {
    id: "c0298038-8f88-4e2e-9deb-8b3e5021aeab",
    type: "text",
    icon: IconRectangle,
    placeholder: "",
    label: "Text Field",
  },
  {
    id: "f77add08-c1d0-44d8-a8a0-641bc4a666d4",
    type: "number",
    icon: IconRectangle,
    placeholer: "",
    label: "Number Input",
  },
  {
    id: "140ade69-f689-4679-99df-30e2a95fe4d6",
    type: "combobox",
    placeholer: "",
    icon: ComboBoxIcon,
    label: "Combo Box / Dropdown",
    options: ["opt 1", "opt 2"],
  },
  {
    id: "a1c60dfd-a662-43e7-924c-aebd2f74f25e",
    type: "combobox",
    placeholer: "",
    icon: ComboBoxIcon,
    label: "Number Combo Box",
    options: ["1", "2", "3"],
  },
  {
    id: "df3e9e4a-b51a-46c6-8098-3615f95a0fb7",
    type: "radio-group",
    icon: IconCircle,
    label: "Radio Button",
    options: ["Option 1", "Option 2"],
  },
  {
    id: "5940ff47-170c-4286-bb09-75a30b933655",
    type: "checkbox",
    icon: IconSquare,
    label: "Checkbox",
    options: ["Option 1", "Option 2"],
  },
  {
    id: "72db6396-be0e-48fa-87ac-85041fcbe071",
    type: "datepicker",
    placeholer: "",
    icon: IconCalendarWeek,
    label: "Datepicker",
  },
  {
    id: "c6728b41-0d0e-4eb5-ba68-4070237f3700",
    type: "textarea",
    placeholer: "",
    icon: IconTypography,
    label: "Textarea",
  },
];
