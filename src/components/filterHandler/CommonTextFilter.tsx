import {useContext} from "react";
import {cn} from "@/lib/utils.ts";

import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"

import {FilterType} from "@/features/filter/filterTypes.ts";
import {FilterContext} from "@/apps/DaVi/DaViApp.tsx";
import {ACTION_ADD_TEXT_FILTER, ACTION_REMOVE_FILTER, FILTER_DATA_TYPE_TEXT} from "@/features/filter/filterConstants.ts";

type props = {
  filterName: string,
  className?: string | undefined
}

export default function CommonTextFilterComponent({filterName, className}: props): JSX.Element {

  const {filterData: filterData, filterDispatcherCallback: filterDispatcher} = useContext(FilterContext);
  const filterDefinition = filterData.filterDefinitions[filterName];
  const currentFilterData: FilterType | undefined = filterData.filter[filterName] ?? undefined;

  let value: string = defaultValue();
  let filterType: string = 'contains';

  if (currentFilterData !== undefined && currentFilterData.filterDataType === FILTER_DATA_TYPE_TEXT) {
    value = currentFilterData.value;
    filterType = currentFilterData.filterType;
  }

  function removeFilter(): void {
    filterDispatcher({
      type: ACTION_REMOVE_FILTER,
      filterName: filterName
    })
  }

  function handleInput(input: string) {
    if ((input == null || input === '') && filterType !== 'empty_string') {
      removeFilter();
    }

    filterDispatcher({
      type: ACTION_ADD_TEXT_FILTER,
      filterName: filterName,
      value: input,
      filterType: filterType
    })
  }

  function changeSelect(filterTypeInput: string) {
    if ((value == null || value === '') && filterTypeInput !== 'empty_string') {
      removeFilter();
    }

    filterDispatcher({
      type: ACTION_ADD_TEXT_FILTER,
      filterName: filterName,
      value: value,
      filterType: filterTypeInput
    })
  }

  function defaultValue() {
    if (filterDefinition.defaultValue === null) {
      return '';
    } else {
      return filterDefinition.defaultValue;
    }
  }

  return (
    <>
      <Select
        value={filterType}
        key={filterName + '_filter_type'}
        disabled={(filterDefinition.mandatory)}
        onValueChange={changeSelect}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtertyp auswählen"/>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="contains">Enthält</SelectItem>
          <SelectItem value="equal">Gleich</SelectItem>
          <SelectItem value="contain_one_of_words">Enthält eines der Wörter</SelectItem>
          <SelectItem value="empty_string">leere Zeichenkette</SelectItem>
          <SelectItem value="contains_html">Enthält (für HTML)</SelectItem>
        </SelectContent>
      </Select>

      <Input
        id={filterName + '_filter'} type="text"
        className={cn("w-96 mt-2", className)}
        value={value}
        disabled={(filterDefinition.mandatory)}
        onChange={e => handleInput(e.currentTarget.value)}
      />
    </>
  );
}