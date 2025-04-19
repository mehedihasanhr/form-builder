import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortableModule = ({
  id,
  children,
  data,
}: {
  id: string;
  children: React.ReactNode;
  data: any;
}) => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id, data });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      className="group"
      {...(isDragging ? { "data-dragging": "true" } : {})}
      {...listeners}
      {...attributes}
      style={style}
    >
      {children}
    </div>
  );
};
