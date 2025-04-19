import { useBuilderToolsStore } from "@/shared/store/builder-tools.store";
import { FormElement } from "./FormElement";

import { SortableContext } from "@dnd-kit/sortable";
import { SortableModule } from "./SortableMoudle";

export const FormElementPanel = () => {
  const { tools } = useBuilderToolsStore();

  return (
    <div>
      <div className="flex flex-col gap-y-4 sticky top-28 scroll-mt-20">
        <h4> Custom Field </h4>

        <SortableContext id="tools" items={Array.from(tools.values())}>
          <div className="flex flex-col gap-y-4">
            {Array.from(tools.values()).map((el) => (
              <SortableModule
                key={el.id}
                id={el.id}
                data={{ data: el, type: "tool" }}
              >
                <FormElement el={el} />
              </SortableModule>
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
};
