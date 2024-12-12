import {useContext, useEffect, useState} from "react";
import useFetchSearchEntity from "@/hooks/useFetchSearchEntity.ts";

import {Button} from "@/components/ui/button.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Command, CommandGroup, CommandItem, CommandList} from "@/components/ui/command";
import {Badge} from "@/components/ui/badge";

import {Entity, EntityListItem} from "@/features/entity/entityTypes.ts";
import {
  ACTION_ADD_ENTITY_ITEM,
  ACTION_REMOVE_ENTITY_ITEM,
  ACTION_REMOVE_FILTER, FILTER_ENTITY_REFERENCE
} from "@/features/filter/filterConstants.ts";
import {ClientContext, FilterContext} from "@/apps/DaVi/DaViApp.tsx";
import {FILTER_DATA_TYPE_REFERENCE, FilterType} from "@/features/filter/filterTypes.ts";
import useGetEntity from "@/hooks/useGetEntity.ts";
import XMarkIcon from "@/components/icons/XMarkIcon.tsx";
import {emptyEntity} from "@/features/entity/entityConstants.ts";
import EntityOverview from "@/components/EntityOverview.tsx";

type props = {
  filterName: string
}

export default function EntityReferenceFilterComponent({filterName}: props): JSX.Element {

  const selectedClient = useContext(ClientContext);
  const {filterData: filterData, filterDispatcherCallback: filterDispatcher} = useContext(FilterContext);
  const filterDefinition = filterData.filterDefinitions[filterName];
  const currentFilterData: FilterType | undefined = filterData.filter[filterName] ?? undefined;
  const [entity, setEntityState] = useState<Entity>(emptyEntity);
  const {getEntityCallback: getEntity} = useGetEntity(setEntity);
  const [entityKey, setEntityKey] = useState<string | undefined>(undefined);
  const [openPopover, setOpenPopover] = useState(false);
  const [searchString, setSearchString] = useState<string>('');

  let entityTypeLabel = 'unknown';
  let entityType = 'NullEntity';
  let uniqueProperty = 'id';
  if (filterDefinition.component === FILTER_ENTITY_REFERENCE) {
    entityTypeLabel = filterDefinition.additional.entityTypeLabel;
    entityType = filterDefinition.additional.entityType;
    uniqueProperty = filterDefinition.additional.uniqueProperty;
  }

  const {entityListItems} = useFetchSearchEntity(searchString, selectedClient, entityType);

  useEffect(() => {
    if(entityKey === undefined) {
      return;
    }

    const handler = setTimeout(() => {
      getEntity(entityKey);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [entityKey]);

  let currentEntities: Array<EntityListItem> = [];
  if (currentFilterData != undefined && (currentFilterData.filterDataType === FILTER_DATA_TYPE_REFERENCE)) {
    currentEntities = currentFilterData.entities ?? [];
  }

  function setEntity(entity: Entity) {
    setEntityState(entity);
  }

  function getEntityItemFromEntityKey(entityKey: string): EntityListItem {
    let entityItem = entityListItems.find((entityItem: EntityListItem) => entityItem.entityKey == entityKey);
    if (!entityItem) {
      entityItem = {
        uniqueKey: entityKey,
        entityKey: selectedClient + '::' + entityType + '::' + uniqueProperty + '::' + entityKey,
        entityLabel: entityKey
      };
    }
    return entityItem;
  }

  function addEntityItem(entityKey: string): void {
    const currentEntityItem = getEntityItemFromEntityKey(entityKey);
    filterDispatcher(addAddEntityAction(filterName, currentEntityItem))
    setOpenPopover(false);
  }

  function removeEntityItem(entityKey: string) {
    const currentEntityItem = getEntityItemFromEntityKey(entityKey);
    filterDispatcher({
      type: ACTION_REMOVE_ENTITY_ITEM,
      filterName: filterName,
      entityItem: currentEntityItem
    })
  }

  function removeAll() {
    filterDispatcher({
      type: ACTION_REMOVE_FILTER,
      filterName: filterName
    })
  }

  function buildSelected() {
    if (currentEntities.length === 0) {
      return `${entityTypeLabel} suchen`;
    }

    return (
      <div className="flex flex-wrap gap-1 items-center whitespace-nowrap">
        {
          currentEntities.map((entityItem: EntityListItem) => (
              <Badge onClick={() => removeEntityItem(entityItem.entityKey)}>
                {entityItem.entityLabel}
              </Badge>
            )
          )
        }
      </div>
    )
  }

  return (
    <>
      <Popover open={openPopover} onOpenChange={setOpenPopover} modal={true}>
        <PopoverTrigger asChild>
          <div
            aria-expanded={openPopover}
            className="min-w-[35rem] min-h-10 h-auto w-auto justify-between px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            <div className="flex justify-between items-center w-full">
              {buildSelected()}
              <Button variant="ghost" className="h-6" onClick={() => removeAll()}><XMarkIcon className="size-5" />
              </Button>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[600px] p-0">
          <Command>
            <div className="flex items-center border-b px-3">
              <input
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                onChange={e => setSearchString(e.target.value)}/>
              <Button variant="ghost" onClick={() => addEntityItem(searchString)}>
                hinzufügen
              </Button>
            </div>
            <div className="grid grid-cols-2">
              <CommandList className="max-h-[400px]">
                <CommandGroup>
                  {
                      entityListItems.map((entityItem: EntityListItem) => (
                        <CommandItem
                          key={entityItem.entityKey}
                          value={entityItem.entityKey}
                          onSelect={(currentValue) => {
                            addEntityItem(currentValue)
                          }}
                          onMouseOver={() => setEntityKey(entityItem.entityKey)}
                        >
                          {entityItem.entityLabel}
                        </CommandItem>
                    ))
                  }
                </CommandGroup>
              </CommandList>
              <CommandList className="max-h-[400px]">
                <div>
                  <EntityOverview entityOverview={entity.entityOverview} />
                </div>
              </CommandList>
            </div>
          </Command>
          <div className="flex my-2 ml-2 gap-2">
            <Button variant="outline" onClick={() => removeAll()}>Zurücksetzen</Button>
            <Button variant="outline" onClick={() => setOpenPopover(false)}>Schließen</Button>
          </div>
        </PopoverContent>
      </Popover>

    </>
  );
}

export function addAddEntityAction(filterName: string, currentEntityItem: EntityListItem) {
  return {
    type: ACTION_ADD_ENTITY_ITEM,
    filterName: filterName,
    entityItem: currentEntityItem
  }
}