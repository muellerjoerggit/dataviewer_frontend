import {createContext, ReactNode} from "react";
import {emptyFilterData} from "@/features/filter/filterConstants.ts";
import {FilterData} from "@/features/filter/filterTypes.ts";

type FilterContextType = {
  filterData: FilterData
  filterDispatcherCallback: ((action: any) => void)
};

type props = {
  filterData: FilterData
  filterDispatcher: ((action: any) => void)
  selectedClient: string
  children: Array<ReactNode>
}

export const FilterContext = createContext<FilterContextType>({
  filterData: emptyFilterData,
  filterDispatcherCallback: () => {}
});

export const ClientContext = createContext<string>('');

export default function EntityFilterWrapper({filterData, filterDispatcher, selectedClient, children} : props) {
  return (
    <FilterContext.Provider value={{filterData: filterData, filterDispatcherCallback: filterDispatcher}}>
      <ClientContext.Provider value={selectedClient}>
        {children}
      </ClientContext.Provider>
    </FilterContext.Provider>
  )

}