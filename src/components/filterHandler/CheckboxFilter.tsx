import {Checkbox} from "@/components/ui/checkbox"

import {ACTION_ADD_BOOLEAN_FILTER, FilterType} from "@/features/filter/filterTypes.ts";
import {useContext} from "react";
import {FilterContext} from "@/apps/DaVi/DaViApp.tsx";
import {FILTER_DATA_TYPE_BOOLEAN} from "@/features/filter/filterConstants.ts";

type props = {
  filterName: string
}

export default function CheckboxFilterComponent({filterName,}: props): JSX.Element {

  const {filterData: filterData, filterDispatcherCallback: filterDispatcher} = useContext(FilterContext);
  const filterDefinition = filterData.filterDefinitions[filterName];
  const currentFilterData: FilterType | undefined = filterData.filter[filterName] ?? undefined;

  let checked = !!(filterDefinition.defaultValue || filterDefinition.mandatory);
  if (currentFilterData !== undefined && currentFilterData.filterDataType === FILTER_DATA_TYPE_BOOLEAN) {
    checked = currentFilterData.value;
  }

  function setChecked(value: boolean) {
    filterDispatcher(getAddCheckAction(filterName, value))
  }

  return (

    <div className="items-top flex space-x-2">
      <Checkbox
        id={'checkbox_' + filterName}
        checked={checked}
        disabled={(filterDefinition.mandatory)}
        onCheckedChange={setChecked}
      />
    </div>
  );
}

export function getAddCheckAction(filterName: string, value: Boolean) {
  return {
    type: ACTION_ADD_BOOLEAN_FILTER,
    filterName: filterName,
    value: value
  };
}