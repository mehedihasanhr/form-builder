import { useDroppable } from "@dnd-kit/core";
import React from "react";

export default function DroppableArea({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: "dropable",
  });

  return <div ref={setNodeRef}>{children}</div>;
}
