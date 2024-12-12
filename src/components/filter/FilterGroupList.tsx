import FilterGroup from "@/components/filter/FilterGroup.tsx";
import {useContext} from "react";
import {FilterContext} from "@/apps/DaVi/DaViApp.tsx";
import {WITHOUT_FILTER_GROUP} from "@/features/filter/filterConstants.ts";
import FilterWrapper from "@/components/filter/FilterWrapper.tsx";

export default function FilterGroupList() {
  const {filterData: filterData} = useContext(FilterContext);

  return (
    <div className="grid grid-cols-[20%_80%] gap-y-4 mt-4">
      {
        filterData.filterGroups.map((filterGroup) => {
          if (filterGroup.groupKey === WITHOUT_FILTER_GROUP && filterData.groupFilterMapping[WITHOUT_FILTER_GROUP]) {
            return (
              <div key={filterGroup.groupKey}>
                {
                  filterData.groupFilterMapping[WITHOUT_FILTER_GROUP].map((key: string) => {
                    return (<FilterWrapper key={key} filterKey={key} />)
                  })
                }
              </div>
            )
          } else if (filterGroup.groupKey !== WITHOUT_FILTER_GROUP) {
             return <FilterGroup filterGroup={filterGroup} key={filterGroup.groupKey}/>
          }
        })
      }
    </div>
  )
}