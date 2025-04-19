import { ReactNode } from "react";

export default function FieldSet({
  label,
  id,
  children,
  onClick,
  ...props
}: React.ComponentProps<"fieldset"> & {
  label: string;
  id: string;
  children: ReactNode;
}) {
  return (
    <fieldset
      id={`fieldset-${id}`}
      onClick={onClick}
      className="group relative border p-4 border-border rounded-[8px] select-none data-[selected=true]:border-green-500"
      {...props}
    >
      <legend className="group-data-[selected=true]:border-green-500 bg-white py-2 px-4 rounded-[6px] text-[15px] font-medium border border-border">
        {label}
      </legend>
      <div className="flex flex-col items-stretch gap-y-4">{children}</div>
    </fieldset>
  );
}
