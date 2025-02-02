import {ReferenceType} from "@/features/export/types.ts";
import {ReactNode} from "react";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import InfoIcon from "@/components/icons/InfoIcon.tsx";

export default function Reference({reference, children}: { reference: ReferenceType, children: ReactNode | ReactNode[] }) {
  return (
    <div className="flex items-center gap-1">
      <span>{reference.entityLabel}</span>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon"><InfoIcon/></Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col h-[40%] w-[30%] max-w-[50%] m-auto !overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Referenz</DialogTitle>
          </DialogHeader>
          <dl className="grid grid-cols-2">
            <dt>referenzierte Entität</dt>
            <dd>{reference.entityLabel}</dd>

            <dt>Feld der Referenz</dt>
            <dd>{reference.property}</dd>
          </dl>
          <DialogFooter className="mt-auto sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Schließen
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {children}
    </div>
  )
}