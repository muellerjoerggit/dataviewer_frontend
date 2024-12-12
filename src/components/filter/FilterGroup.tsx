import {useContext} from "react";

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import FilterWrapper from "@/components/filter/FilterWrapper.tsx";

import {FilterContext} from "@/apps/DaVi/DaViApp.tsx";
import {ACTION_REMOVE_FILTER, FilterGroupType} from "@/features/filter/filterTypes.ts";
import {
  ACTION_DELETE_FILTER_OF_GROUP,
  ACTION_SET_FILTER_OF_GROUP,
  NO_FILTER
} from "@/features/filter/filterConstants.ts";

type props = {
  filterGroup: FilterGroupType
}

export default function FilterGroup({filterGroup}: props) {
  const {filterData: filterData, filterDispatcherCallback: filterDispatcher} = useContext(FilterContext);
  const groupFilterMappings = filterData.groupFilterMapping[filterGroup.groupKey] ?? [];
  const selectedOption = filterData.groupFilter[filterGroup.groupKey] ?? 'none';

  function buildOptionsList() {
    return (
      <>
        {
          groupFilterMappings.map((filterKey: string) => {
            const filterDefinition = filterData.filterDefinitions[filterKey];
            return <SelectItem value={filterKey} key={filterKey}>{filterDefinition.title}</SelectItem>
          })
        }
      </>
    )
  }

  function handleOptionChanged(value: string) {
    filterDispatcher({
      type: ACTION_REMOVE_FILTER,
      filterName: selectedOption
    });

    if (value != NO_FILTER) {
      filterDispatcher({
        type: ACTION_SET_FILTER_OF_GROUP,
        groupKey: filterGroup.groupKey,
        groupFilter: value,
      });
    } else {
      filterDispatcher({
        type: ACTION_DELETE_FILTER_OF_GROUP,
        groupKey: filterGroup.groupKey,
      });
    }
  }

  return (
    <>
      <div>{filterGroup.title}</div>
      <div>
        <Select onValueChange={handleOptionChanged} value={selectedOption}>
          <SelectTrigger className="w-[360px]">
            <SelectValue placeholder="Filter auswählen"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={NO_FILTER}>kein Filter</SelectItem>
            {buildOptionsList()}
          </SelectContent>
        </Select>
        <FilterWrapper filterKey={selectedOption}/>
      </div>
    </>
  )
}