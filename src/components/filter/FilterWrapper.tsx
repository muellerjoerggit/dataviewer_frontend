import EntityReferenceFilter from "@/components/filterHandler/EntityReferenceFilter.tsx";
import SelectFilter from "@/components/filterHandler/SelectFilter.tsx";
import InFilter from "@/components/filterHandler/InFilter.tsx";
import ListFilter from "@/components/filterHandler/ListFilter.tsx";
import CheckboxFilter from "@/components/filterHandler/CheckboxFilter.tsx";
import DateTimeFilter from "@/components/filterHandler/DateTimeFilter.tsx";
import CommonTextFilter from "@/components/filterHandler/CommonTextFilter.tsx";
import OptionsFilter from "@/components/filterHandler/OptionsFilter.tsx";
import SelectSingleFilter from "@/components/filterHandler/SelectSingleFilter.tsx";

import {useContext} from "react";
import {FilterContext} from "@/components/EntityFilterWrapper.tsx";
import {
  FILTER_CHECKBOX,
  FILTER_DATE_TIME,
  FILTER_ENTITY_REFERENCE,
  FILTER_IN,
  FILTER_LIST,
  FILTER_OPTION,
  FILTER_OPTIONS,
  FILTER_SELECT,
  FILTER_TEXT,
  NO_FILTER
} from "@/features/filter/filterConstants.ts";

export default function FilterWrapper({filterKey}) {
  const {filterData: filterData} = useContext(FilterContext);
  const filterDefinition = filterData.filterDefinitions[filterKey];

  console.log(filterData, filterKey);

  function buildFilter() {
    if (filterKey === NO_FILTER || filterDefinition === undefined) return;


    switch (filterDefinition.component) {
      case FILTER_ENTITY_REFERENCE:
        return (
          <EntityReferenceFilter
            filterName={filterKey}
          />
        )
      case FILTER_SELECT:
        return (
          <SelectFilter
            key={filterKey}
            filterName={filterKey}
          />
        )
      case FILTER_OPTION:
        return (
          <SelectSingleFilter
            key={filterKey}
            filterName={filterKey}
          />
        )
      case FILTER_IN:
        return (
          <InFilter
            key={filterKey}
            filterName={filterKey}
          />
        )
      case FILTER_LIST:
        return (
          <ListFilter
            key={filterKey}
            filterName={filterKey}
          />
        )
      case FILTER_CHECKBOX:
        return (
          <CheckboxFilter
            key={filterKey}
            filterName={filterKey}
          />
        )
      case FILTER_DATE_TIME:
        return (
          <DateTimeFilter
            key={filterKey}
            filterName={filterKey}
          />
        )
      case FILTER_TEXT:
        return (
          <CommonTextFilter
            key={filterKey}
            filterName={filterKey}
          />
        )
      case FILTER_OPTIONS:
        return (
          <OptionsFilter
            key={filterKey}
            filterName={filterKey}
          />
        )
      default:
        return;
    }
  }

  return (
    <div className="mt-4">
      {buildFilter()}
    </div>

  )
}