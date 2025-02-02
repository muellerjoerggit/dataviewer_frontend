import {Button} from "@/components/ui/button.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";

import {useContext, useState} from "react";
import FilterGroupList from "@/components/filter/FilterGroupList.tsx";
import {FilterContext} from "@/components/EntityFilterWrapper.tsx";
import {ACTION_RESET_FILTER} from "@/features/filter/filterConstants.ts";

type props = {
  searchEntities?: Function,
}

export default function FilterModal({searchEntities}: props) {
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const {filterData: filterData, filterDispatcherCallback: filterDispatcher} = useContext(FilterContext);

  const readonly: boolean = Object.keys(filterData.filterDefinitions).length === 0;

  function buildButton() {
    if(searchEntities) {
      return (
        <Button type="button" onClick={() => {
          setFilterDialogOpen(false);
          searchEntities();
        }}>
          Suchen
        </Button>
      )
    }
  }

  function buildFilterGroups() {
    if (readonly === undefined || readonly) return;

    return (
      <div className="mt-5">
        <FilterGroupList />
      </div>
    );
  }

  return (
    <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
      <DialogTrigger asChild>
        <Button disabled={readonly} className="ml-2 relative" variant="outline">
          <span>Filter</span>
          <Badge className="absolute -top-2 -right-3">{Object.keys(filterData.filter).length}</Badge>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col h-[75%] w-[60%] max-w-[60%] m-auto !overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Filter</DialogTitle>
        </DialogHeader>
        {buildFilterGroups()}
        <DialogFooter className="mt-auto sm:justify-start">
          {buildButton()}
          <Button type="button" variant="secondary" onClick={() => {
            filterDispatcher({type: ACTION_RESET_FILTER})
          }}>
            Zurücksetzen
          </Button>
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