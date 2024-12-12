import {cn} from "@/lib/utils.ts";
import {FilterType} from "@/features/filter/filterTypes.ts";
import {useContext} from "react";
import {FilterContext} from "@/apps/DaVi/DaViApp.tsx";
import {ACTION_ADD_LIST_FILTER, ACTION_REMOVE_FILTER, FILTER_DATA_TYPE_LIST} from "@/features/filter/filterConstants.ts";

type props = {
  filterName: string,
  className?: string | undefined
}

export default function ListFilterComponent({
                                              filterName,
                                              className
                                            }: props): JSX.Element {

  const {filterData: filterData, filterDispatcherCallback: filterDispatcher} = useContext(FilterContext);
  const filterDefinition = filterData.filterDefinitions[filterName];
  const currentFilterData: FilterType | undefined = filterData.filter[filterName] ?? undefined;

  let list = filterDefinition.defaultValue === null ? '' : filterDefinition.defaultValue;
  if (currentFilterData !== undefined && currentFilterData.filterDataType === FILTER_DATA_TYPE_LIST) {
    list = currentFilterData.list;
  }

  function handleInput(input: string) {
    if (input === '') {
      filterDispatcher({
        type: ACTION_REMOVE_FILTER,
        filterName: filterName
      });
    } else {
      filterDispatcher({
        type: ACTION_ADD_LIST_FILTER,
        filterName: filterName,
        list: input
      })
    }
  }

  return (
    <textarea
      id={filterName + '_filter'} rows={4}
      className={cn("w-96 rounded-md border border-input", className)}
      value={list}
      disabled={(filterDefinition.mandatory)}
      onChange={e => handleInput(e.target.value)}
    />
  );
}