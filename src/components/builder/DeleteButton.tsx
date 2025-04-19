import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { Button } from "../ui/Button";

export const DeleteButton = ({ onConfirm }: { onConfirm: VoidFunction }) => {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);
  const toggle = () => setOpen((p) => !p);

  return (
    <>
      <Button
        onClick={toggle}
        type="button"
        className="bg-neutral-300 flex-1 font-medium"
      >
        Delete
      </Button>

      <Dialog
        open={open}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full border border-border max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="font-medium text-red-500">
                Delete Element Block?
              </DialogTitle>
              <p className="mt-2 text-sm">
                Are you sure you want to delete this element block? This action
                cannot be undone.
              </p>
              <div className="mt-4 flex justify-end items-center gap-2.5">
                <Button
                  className="bg-neutral-100 hover:bg-neutral-400"
                  onClick={close}
                >
                  No, Cancel
                </Button>

                <Button className="bg-red-500 text-white" onClick={onConfirm}>
                  Yes, Delete
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
