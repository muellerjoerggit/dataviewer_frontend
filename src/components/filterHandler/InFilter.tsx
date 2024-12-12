import {cn} from "@/lib/utils.ts";
import {Input} from "@/components/ui/input";

import {FilterType} from "@/features/filter/filterTypes.ts";
import {ACTION_ADD_IN_FILTER, ACTION_REMOVE_FILTER, FILTER_DATA_TYPE_IN} from "@/features/filter/filterConstants.ts";
import {useContext} from "react";
import {FilterContext} from "@/apps/DaVi/DaViApp.tsx";

type props = {
  filterName: string,
  className?: string | undefined
}

export default function InFilterComponent({
                                            filterName,
                                            className
                                          }: props): JSX.Element {

  const {filterData: filterData, filterDispatcherCallback: filterDispatcher} = useContext(FilterContext);
  const filterDefinition = filterData.filterDefinitions[filterName];
  const currentFilterData: FilterType | undefined = filterData.filter[filterName] ?? undefined;

  let values = filterDefinition.defaultValue === null ? '' : filterDefinition.defaultValue;
  if (currentFilterData !== undefined && currentFilterData.filterDataType === FILTER_DATA_TYPE_IN) {
    values = currentFilterData.values.join();
  }

  function handleInput(input: string) {
    if (input === '') {
      filterDispatcher({
        type: ACTION_REMOVE_FILTER,
        filterName: filterName
      });
    } else {
      filterDispatcher({
        type: ACTION_ADD_IN_FILTER,
        filterName: filterName,
        values: input.split(',')
      })
    }
  }

  return (
    <Input
      id={filterName + '_filter'} type="text"
      className={cn("w-96", className)}
      value={values}
      disabled={(filterDefinition.mandatory)}
      onChange={e => {
        handleInput(e.currentTarget.value)
      }}
    />
  );
}