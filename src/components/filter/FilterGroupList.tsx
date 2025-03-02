import FilterGroup from "@/components/filter/FilterGroup.tsx";
import {useContext} from "react";
import {FilterContext} from "@/components/EntityFilterWrapper.tsx";
import {WITHOUT_FILTER_GROUP} from "@/features/filter/filterConstants.ts";
import FilterWrapper from "@/components/filter/FilterWrapper.tsx";

export default function FilterGroupList() {
  const {filterData: filterData} = useContext(FilterContext);

  console.log(filterData);

  return (
    <div className="grid grid-cols-[20%_80%] gap-y-4 mt-4">
      {
        filterData.filterGroups.map((filterGroup) => {
          if (filterGroup.groupKey === WITHOUT_FILTER_GROUP && filterData.groupFilterMapping[WITHOUT_FILTER_GROUP]) {
            return (
              filterData.groupFilterMapping[WITHOUT_FILTER_GROUP].map((key: string) => {
                return (
                  <>
                    <div>{filterData.filterDefinitions[key].title}</div>
                    <FilterWrapper key={key} filterKey={key} />
                  </>
                )
              })
            )
          } else if (filterGroup.groupKey !== WITHOUT_FILTER_GROUP) {
             return <FilterGroup filterGroup={filterGroup} key={filterGroup.groupKey}/>
          }
        })
      }
    </div>
  )
}