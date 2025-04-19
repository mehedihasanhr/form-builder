import React from "react";
import { match } from "ts-pattern";

export default function RenderElement({ el }: { el: Tool }) {
  return match(el)
    .with({ type: "text" }, ({ config }) => <input type="text" {...config} />)
    .with({ type: "number" }, ({ config }) => (
      <input type="number" {...config} />
    ))
    .otherwise(() => null);
}
