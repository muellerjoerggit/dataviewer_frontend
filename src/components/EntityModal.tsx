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
import {createContext, ReactNode} from "react";
import Bookmark from "@/components/Bookmark.tsx";
import ReloadIcon from "@/components/icons/ReloadIcon.tsx";
import {Entity} from "@/features/entity/entityTypes.ts";

type EntityContextType = {
  showEntityCallback: ((entityKey: string, reload?: boolean) => void),
  reloadEntityCallback: (() => void)
}

type Props = {
  entity: Entity,
  isBookmarkCallback: ((entityKey: string) => boolean),
  toggleBookmark: ((entityKey: string) => void),
  openModal: boolean,
  setOpenModal: (open: boolean) => void,
  showEntityCallback: ((entityKey: string, reload?: boolean) => void),
  reloadEntityCallback: (() => void),
  children: ReactNode | ReactNode[],
}

export const EntityContext = createContext<EntityContextType>({
  showEntityCallback: () => {},
  reloadEntityCallback: () => {}
})

export default function EntityModal({entity, isBookmarkCallback, toggleBookmark, openModal, setOpenModal, showEntityCallback, reloadEntityCallback, children}: Props) {

  return (
    <EntityContext.Provider value={{showEntityCallback: showEntityCallback, reloadEntityCallback: reloadEntityCallback}}>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogTrigger asChild>
          <Button className="ml-2" variant="outline">Entität anzeigen</Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col max-w-[90%] h-[95%] m-auto !overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Entität: {entity.label}</DialogTitle>
          </DialogHeader>
          {children}
          <DialogFooter className="mt-auto sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">Schließen</Button>
            </DialogClose>
            <Bookmark entityKey={entity.entityKey} isBookmarkCallback={isBookmarkCallback} toggleBookmark={toggleBookmark} />
            <Button variant="secondary" onClick={() => reloadEntityCallback()}><ReloadIcon/><span className="ml-2">Neu Laden</span></Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </EntityContext.Provider>
  )
}