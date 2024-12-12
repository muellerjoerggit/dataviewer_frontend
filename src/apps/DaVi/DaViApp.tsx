import {createContext, useReducer, useState} from "react";
import {changeFilter, changePaginationHook} from "@/hooks/filterReducer.ts";
import {useFetchSearchExtEntityOverview} from "@/hooks/useFetchSearchExtEntityOverview.ts";
import useGetEntity from "@/hooks/useGetEntity.ts";

import {Button} from "@/components/ui/button.tsx";
import EntityMain from "@/components/EntityMain.tsx";
import EntityTable from "@/components/EntityTable.tsx";
import ClientChooser from "@/components/ClientsChooser.tsx";
import EntityTypeChooser from "@/components/EntityTypeChooser.tsx";
import FilterModal from "@/components/filter/FilterModal.tsx";
import EntityModal from "@/components/EntityModal.tsx";
import ItemList from "@/components/items/ItemList.tsx";

import {Entity, EntityList} from "@/features/entity/entityTypes.ts";
import {FilterData} from "@/features/filter/filterTypes.ts";
import {emptyFilterData} from "@/features/filter/filterConstants.ts";
import {emptyEntity} from "@/features/entity/entityConstants.ts";

type FilterContextType = {
  filterData: FilterData
  filterDispatcherCallback: ((action: any) => void)
};

type EntityContextType = {
  showEntityCallback: ((entityKey: string, reload?: boolean) => void),
  reloadEntityCallback: (() => void)
}

export const ClientContext = createContext<string>('');
export const FilterContext = createContext<FilterContextType>({
  filterData: emptyFilterData,
  filterDispatcherCallback: () => {}
});
export const EntityContext = createContext<EntityContextType>({
  showEntityCallback: () => {},
  reloadEntityCallback: () => {}
})

export default function DaViApp() {
  const [currentEntityType, setCurrentEntityTypeState] = useState<string>('');
  const [selectedClient, setSelectedClient] = useState('');
  const [entityOverviewList, setEntityOverviewList] = useState<EntityList | undefined>(undefined);
  const [filterData, filterDispatcher] = useReducer(changeFilter, JSON.parse(JSON.stringify(emptyFilterData)));
  const [openEntityModal, setOpenEntityModal] = useState(false);
  const {fetchEntities: searchEntities} = useFetchSearchExtEntityOverview(filterData, selectedClient, currentEntityType, setEntityOverviewList);
  const [entity, setEntityState] = useState<Entity>(emptyEntity);
  const {getEntityCallback: getEntity, loading: loading} = useGetEntity(setEntity);
  const [bookmarks, setBookmarksState] = useState<Array<string>>([]);

  function setEntity(entity: Entity) {
    setEntityState(entity);
  }

  function setClient(client: string) {
    setSelectedClient(client);
  }

  function setCurrentEntityType(entityType: string) {
    setCurrentEntityTypeState(entityType);
  }

  function changePagination(nextPage: boolean = true) {
    changePaginationHook(entityOverviewList, filterDispatcher, searchEntities, nextPage);
  }

  function entityTableComponent() {
    return (
      <EntityTable
        entityOverviewData={entityOverviewList}
        changePagination={changePagination}
        loadEntity={showEntity}
      />
    );
  }

  function showEntity(entityKey: string, reload: boolean = false) {
    setOpenEntityModal(true);
    getEntity(entityKey, reload);
  }

  function reloadEntity() {
    const entityKey = entity?.entityKey;
    if (entityKey == null) {
      return;
    }
    showEntity(entityKey, true);
  }

  function setBookmarks(bookmarks: Array<string>) {
    setBookmarksState(bookmarks);
  }

  return (
    <ClientContext.Provider value={selectedClient}>
      <main className="grid grid-cols-1 h-full w-full mt-4 mr-4">
        <div>
          <ClientChooser
            handleChange={setClient}
          />

          <FilterContext.Provider value={{filterData: filterData, filterDispatcherCallback: filterDispatcher}}>
            <EntityTypeChooser
              currentEntityType={currentEntityType}
              setEntityType={setCurrentEntityType}
            />

            <FilterModal
              searchEntities={searchEntities}
            />
          </FilterContext.Provider>

          <Button className="ml-4" type="button" onClick={searchEntities}>Suchen</Button>

          <EntityContext.Provider value={{showEntityCallback: showEntity, reloadEntityCallback: reloadEntity}} >
            <EntityModal openModal={openEntityModal} setOpenModal={setOpenEntityModal}>
              <ItemList
                entity={entity}
                loading={loading}
                bookmarks={bookmarks}
                setBookmarksCallback={setBookmarks}
              />
            </EntityModal>
          </EntityContext.Provider>
        </div>
        <div className="mt-4 mr-4">
          <EntityMain
            entityListComponent={entityTableComponent()}
          />
        </div>
      </main>
    </ClientContext.Provider>
  )
}
