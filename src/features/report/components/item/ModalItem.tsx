import {
  Dialog, DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {ReportModalItem} from "@/features/report/reportTypes.ts";
import {ReportElementWrapper} from "@/features/report/components/ReportElementWrapper.tsx";

type Props = {
  item: ReportModalItem,
}

export default function ModalItem({item}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-2" variant="outline">{item.buttonTitle}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl ml-24 mr-24">
        <DialogHeader>
          <DialogTitle>{item.modalTitle}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-192 lg:h-128 md:h-96 sm:h-64">
          <ReportElementWrapper elements={item.data} />
        </ScrollArea>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Schließen
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}