import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";


export default function EntityModal({
  children: children,
  openModal: openModal,
  setOpenModal: setOpenModal
}) {

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button className="ml-2" variant="outline">Entität anzeigen</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col max-w-[90%] h-[95%] m-auto !overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Entität</DialogTitle>
        </DialogHeader>
        {children}
        <DialogFooter className="mt-auto sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Schließen
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}