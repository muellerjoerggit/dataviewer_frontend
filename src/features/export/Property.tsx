import {PropertyType} from "@/features/export/types.ts";
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
import {CARDINALITY_SINGLE} from "@/features/export/constants.ts";
import {cn} from "@/lib/utils.ts";


export default function Property({property, label, className, children}: {property: PropertyType, label?: string, className: string, children?: ReactNode[] | ReactNode}) {
  return (
    <div className={cn("flex items-center gap-1",className)}>
      <span>{label ? label : property.label}</span>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon"><InfoIcon/></Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col h-[60%] w-[30%] max-w-[60%] m-auto !overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Feld</DialogTitle>
          </DialogHeader>
          <dl className="grid grid-cols-2">
            <dt>Feldname</dt>
            <dd>{property.label}</dd>

            <dt>interne Bezeichnung</dt>
            <dd>{property.properties.property}</dd>

            <dt>Kardinalität</dt>
            <dd>{property.properties.cardinality === CARDINALITY_SINGLE ? 'einzelner Wert' : 'mehrere Werte'}</dd>
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