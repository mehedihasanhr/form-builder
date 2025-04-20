import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Calendar } from "./Calender";
import { format } from "date-fns";

export const DatePicker = () => {
  return (
    <Popover className="relative">
      <PopoverButton className="h-9 rounded-[4px] border border-border placeholder:text-sm placeholder:text-[rgba(99,99,102,1)] py-2 px-3 w-full text-left">
        {format(new Date(), "dd/mm/yyyy")}
      </PopoverButton>
      <PopoverPanel anchor="bottom" className="flex flex-col">
        <Calendar />
      </PopoverPanel>
    </Popover>
  );
};
