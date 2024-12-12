import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {EntityType} from "@/features/entity/entityTypes.ts";
import {emptyEntityType} from "@/features/entity/entityConstants.ts";
import ChevronUpDownIcon from "@/components/icons/ChevronUpDownIcon.tsx";
import {Command, CommandGroup, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {useContext, useState} from "react";
import {useFetchEntityTypes} from "@/hooks/useFetchEntityTypes.ts";
import {ACTION_SET_FILTER_DEFINITIONS} from "@/features/filter/filterTypes.ts";
import {FilterContext} from "@/apps/DaVi/DaViApp.tsx";

type props = {
  currentEntityType: string,
  setEntityType: Function
};

export default function EntityTypeChooser({currentEntityType, setEntityType}: props) {

  const [open, setOpen] = useState(false);
  const [searchString, setSearchString] = useState('');
  const {entityTypes: entityTypesArray, getEntityType: findEntityType} = useFetchEntityTypes();
  const [entityTypeHover, setEntityTypeHover] = useState<EntityType>(emptyEntityType);
  const {filterDispatcherCallback: filterDispatcher} = useContext(FilterContext);

  let filteredEntityTypesArray = entityTypesArray;
  if (searchString !== '') {
    filteredEntityTypesArray = entityTypesArray.filter((entityType) => {
      if (
        entityType.type.toLowerCase().includes(searchString.toLowerCase()) ||
        entityType.label.toLowerCase().includes(searchString.toLowerCase()) ||
        entityType.description.toLowerCase().includes(searchString.toLowerCase())
      ) {
        return true
      }
    })
  }

  function loadHoverEntityType(entityType: string): void {
    const entityTypeObj: EntityType | undefined = findEntityType(entityType);
    if (entityTypeObj !== undefined) {
      setEntityTypeHover(entityTypeObj);
    }
  }

  function setNewEntityType(entityType: undefined | string) {
    if (entityType === undefined) {
      return;
    }
    const entityTypeObj: EntityType | undefined = findEntityType(entityType);
    if (entityTypeObj === undefined) {
      return;
    }
    setEntityType(entityType);
    if (filterDispatcher != undefined) {
      filterDispatcher({
        type: ACTION_SET_FILTER_DEFINITIONS,
        filterDefinitions: entityTypeObj.filterDefinitions,
        filterGroups: entityTypeObj.filterGroups,
        groupFilterMapping: entityTypeObj.groupFilterMapping,
      });
    }
    setOpen(false);
    setSearchString('');
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[380px] justify-between ml-4"
        >
          {currentEntityType
            ? entityTypesArray.find((entityType: EntityType) => entityType.type === currentEntityType)?.label
            : "Typ auswählen"}
          <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[600px] p-0">
        <Command>
          <div className="flex items-center border-b px-3">
            <input
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              onChange={e => setSearchString(e.target.value)}/>
          </div>
          <div className="grid grid-cols-2">
            <CommandList>
              <CommandGroup>
                {filteredEntityTypesArray.map((entityType: EntityType) => (
                  <CommandItem
                    key={entityType.type}
                    value={entityType.type}
                    onSelect={(currentValue) => {
                      setNewEntityType(currentValue === currentEntityType ? undefined : currentValue)
                    }}
                    onMouseOver={() => loadHoverEntityType(entityType.type)}
                  >
                    {entityType.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandList className="max-h-[400px]">
              <div className="">
                <p className="text-sm ml-2 mt-3">{entityTypeHover.description}</p>
              </div>
            </CommandList>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
}