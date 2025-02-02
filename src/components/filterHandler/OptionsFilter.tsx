import {useContext, useState} from "react";

import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Command, CommandGroup, CommandItem, CommandList} from "@/components/ui/command"
import {Button} from "@/components/ui/button.tsx";
import {Badge} from "@/components/ui/badge"

import {FilterType, OptionItem} from "@/features/filter/filterTypes.ts";
import {FilterContext} from "@/components/EntityFilterWrapper.tsx";
import {
  ACTION_ADD_OPTION_ITEM,
  ACTION_REMOVE_FILTER,
  ACTION_REMOVE_OPTION_ITEM,
  FILTER_DATA_TYPE_OPTIONS
} from "@/features/filter/filterConstants.ts";

type props = {
  filterName: string,
}

export default function OptionsFilterComponent({filterName}: props): JSX.Element {

  const [openPopover, setOpenPopover] = useState(false)
  const [searchInput, setSearchInput] = useState<string>('');
  const {filterData: filterData, filterDispatcherCallback: filterDispatcher} = useContext(FilterContext);
  const filterDefinition = filterData.filterDefinitions[filterName];
  const currentFilterData: FilterType | undefined = filterData.filter[filterName] ?? undefined;

  let possibleOptions: Array<OptionItem> = [];
  if (filterDefinition.component === 'OptionsFilter') {
    possibleOptions = filterDefinition.additional.possibleValues;
  }

  const filteredOptions: Array<OptionItem> = possibleOptions.filter((option: OptionItem) => {
    return option.label.toLowerCase().includes(searchInput.toLowerCase())
      || option.optionId.toString().toLowerCase().includes(searchInput.toLowerCase())
      || option.description.toLowerCase().includes(searchInput.toLowerCase());
  })

  let selectedOptions: Array<OptionItem> = [];
  if (currentFilterData !== undefined && currentFilterData.filterDataType === FILTER_DATA_TYPE_OPTIONS) {
    selectedOptions = currentFilterData.selectedOptions;
  }

  function setOption(inputOption: string): void {
    let currentOption = possibleOptions.find((option: OptionItem) => option.optionId == inputOption);
    if (!currentOption) {
      currentOption = {optionId: inputOption, label: inputOption, description: ''};
    }

    filterDispatcher({
      type: ACTION_ADD_OPTION_ITEM,
      filterName: filterName,
      optionItem: currentOption
    })

    setOpenPopover(false);
  }

  function deleteOption(optionId: string) {
    filterDispatcher({
      type: ACTION_REMOVE_OPTION_ITEM,
      filterName: filterName,
      optionId: optionId
    })
  }

  function deleteAll() {
    filterDispatcher({
      type: ACTION_REMOVE_FILTER,
      filterName: filterName
    })
  }

  return (
    <>
      <div className="w-[480] justify-between">
        {selectedOptions.map((option: OptionItem) => (
          <Badge
            key={option.optionId}
            variant="outline"
            className="ml-2 hover:text-primary-foreground hover:bg-primary/80"
            onClick={() => deleteOption(option.optionId.toString())}>{option.label}</Badge>
        ))}
      </div>
      <Popover open={openPopover} onOpenChange={setOpenPopover}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openPopover}
            className="w-[380px] justify-between mt-2"
          >
            Optionen suchen
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[600px] p-0">
          <Command>
            <div className="flex items-center border-b px-3">
              <input
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                onChange={e => setSearchInput(e.target.value)}/>
              <Button variant="ghost" onClick={() => setOption(searchInput)}>
                übernehmen
              </Button>
            </div>
            <CommandList className="max-h-[400px]">
              <CommandGroup>
                {filteredOptions.map((option: OptionItem) => (
                  <CommandItem
                    key={option.optionId}
                    value={option.optionId.toString()}
                    onSelect={(currentValue) => {
                      setOption(currentValue)
                    }}
                  >
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button variant="ghost" onClick={() => deleteAll()}>
        X
      </Button>
    </>
  );
}