import {useContext} from "react";

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

import {OptionItem} from "@/features/filter/filterTypes.ts";
import {FilterContext} from "@/apps/DaVi/DaViApp.tsx";
import {ACTION_SET_OPTION_ITEM, FILTER_DATA_TYPE_OPTION,} from "@/features/filter/filterConstants.ts";


type props = {
  filterName: string
}

export default function SelectSingleFilter({
                                             filterName
                                           }: props): JSX.Element {

  const {filterData: filterData, filterDispatcherCallback: filterDispatcher} = useContext(FilterContext);
  const filterDefinition = filterData.filterDefinitions[filterName];
  let possibleOptions: Array<OptionItem> = [];
  if (filterDefinition.component === 'SelectSingleFilter') {
    possibleOptions = filterDefinition.additional.possibleValues ?? [];
  }

  function handleOptionChanged(inputOption: string) {
    filterDispatcher(getSetOptionAction(possibleOptions, inputOption, filterName));
  }

  function getSelectedOption() {
    const filter = filterData?.filter[filterName];

    if (filter === undefined || filter.filterDataType != FILTER_DATA_TYPE_OPTION) {
      return '';
    }

    return filter.selectedOption?.optionId.toString();
  }

  return (
    <Select onValueChange={handleOptionChanged} value={getSelectedOption()}>
      <SelectTrigger className="w-[360px]">
        <SelectValue placeholder="Eine Option auswählen"/>
      </SelectTrigger>
      <SelectContent>
        {possibleOptions.map((option: OptionItem) => (
          <SelectItem key={option.optionId} value={option.optionId.toString()}>{option.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function getSetOptionAction(possibleOptions: Array<OptionItem>, inputOption: string, filterName: string) {
  let currentOption = possibleOptions.find((option: OptionItem) => option.optionId == inputOption);
  if (!currentOption) {
    currentOption = {optionId: inputOption, label: inputOption, description: ''};
  }

  return {
    type: ACTION_SET_OPTION_ITEM,
    filterName: filterName,
    optionItem: currentOption
  };
}