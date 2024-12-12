import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Command, CommandInput, CommandList} from "@/components/ui/command.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {ReactNode} from "react";

type Props = {
  allAvailableItems: any,
  setSelectedItemCallback: (selectedItems: SelectedItems) => void,
  selectedItems: SelectedItems,
  open: boolean,
  setOpenCallback: (open: boolean) => void
  children: Array<ReactNode>,
  idKey?: string,
  labelKey?: string,
  placeholderSearch?: string,
  placeholderSelect?: string
}

type SelectedItems = Array<string>;
type Item = {
  [key: string]: string,
}

export default function ComboBox({
  allAvailableItems,
  setSelectedItemCallback,
  selectedItems,
  open,
  setOpenCallback,
  children,
  idKey = 'id',
  labelKey = 'label',
  placeholderSearch = 'Item suchen...',
  placeholderSelect = 'Item auswählen'
}: Props) {

  function buildSelected() {
    if (selectedItems.length === 0) {
      return placeholderSelect;
    }

    return (
      <div className="pr-12">
        {
          selectedItems.map((value: string) => {
            return (
              <Badge onClick={() => {
                setSelectedItemCallback(selectedItems.filter((selectedValue: string) => (selectedValue != value)))
              }}>
                {allAvailableItems.find((item: Item) => item[idKey] === value)?.[labelKey] ?? "unknown"}
              </Badge>
            )
          })
        }
      </div>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpenCallback}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-[15rem] justify-between"
        >
          {buildSelected()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholderSearch}/>
          <CommandList>
            {children}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}