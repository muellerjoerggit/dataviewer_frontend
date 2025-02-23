import {useMemo, useReducer, useState} from "react";
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

import {Entity} from "@/features/entity/entityTypes.ts";
import {emptyFilterData} from "@/features/filter/filterConstants.ts";
import {emptyEntity} from "@/features/entity/entityConstants.ts";
import EntityFilterWrapper from "@/components/EntityFilterWrapper.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import EntityActions from "@/features/entityAction/EntityActions.tsx";
import {
  ExtEntityOverviewMap,
  ExtOverviewList
} from "@/features/extEntityOverview/extEntityOverviewTypes.ts";
import {changeBookmarks, isBookmarkedInternal} from "@/features/bookmark/bookmarksReducer.ts";
import {EntityTypesBookmarks} from "@/features/bookmark/EntityTypesBookmarks.tsx";
import {TOGGLE_BOOKMARK} from "@/features/bookmark/overviewBookmarksConstants.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {LogItem} from "@/features/logging/logTypes.ts";
import CommonLogItemComponent from "@/features/logging/components/CommonLogItem.tsx";

export default function DaViApp() {
  const [currentEntityType, setCurrentEntityTypeState] = useState<string>('');
  const [selectedClient, setSelectedClient] = useState('');
  const [entityOverviewList, setEntityOverviewListState] = useState<ExtOverviewList | undefined>(undefined);
  const [filterData, filterDispatcher] = useReducer(changeFilter, JSON.parse(JSON.stringify(emptyFilterData)));
  const [openEntityModal, setOpenEntityModal] = useState(false);
  const {fetchEntities: searchEntities} = useFetchSearchExtEntityOverview(filterData, selectedClient, currentEntityType, setExtOverviewList);
  const [entity, setEntityState] = useState<Entity>(emptyEntity);
  const extOverviewMap: ExtEntityOverviewMap = useMemo((): ExtEntityOverviewMap => {return new Map}, []);
  const {getEntityCallback: getEntity, loading: loading} = useGetEntity(setEntity, extOverviewMap);
  const [bookmarksList, bookmarksDispatcher] = useReducer(changeBookmarks, {});

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
    // changePaginationHook(entityOverviewList, filterDispatcher, searchEntities, nextPage);
  }

  function setExtOverviewList(data: ExtOverviewList) {
    setEntityOverviewListState(data);
    Object.keys(data.entities).map((entityKey: string ) => {
      extOverviewMap.set(entityKey, data.entities[entityKey]);
    })
  }

  function toggleBookmark(entityKey: string) {
    bookmarksDispatcher({
      type: TOGGLE_BOOKMARK,
      entityKey: entityKey,
    });
  }

  function isBookmarked(entityKey: string) {
    return isBookmarkedInternal(entityKey, bookmarksList);
  }

  function entityTableComponent() {
    return (
      <EntityTable
        entityOverviewData={entityOverviewList}
        changePagination={changePagination}
        loadEntity={showEntity}
        toggleBookmark={toggleBookmark}
        isBookmarkCallback={isBookmarked}
      />
    );
  }

  function bookmarksComponent() {
    return (
      <EntityTypesBookmarks
        extOverviewData={extOverviewMap}
        bookmarksList={bookmarksList}
        loadEntity={showEntity}
        toggleBookmark={toggleBookmark}
        isBookmarkCallback={isBookmarked}
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

  function renderLogItems() {
    const logLevels: string[] = Object.keys(entity.logsByLevel);
    return (
      <div className="ml-4 mt-4">
        { logLevels.map((logLevel: string) => (
          entity.logsByLevel[logLevel].map((log: LogItem, index: number) => (
            buildLogItem(log, index)
          ))
        ))
        }
      </div>
    )
  }

  function buildLogItem(log: LogItem, index: number) {
    switch (log.component) {
      case 'CommonLogItem':
      default:
        return (
          <CommonLogItemComponent
            key={index}
            logData={log.data}>
          </CommonLogItemComponent>
        )
    }
  }

  return (
    <main className="grid grid-cols-1 h-full w-full mt-4 mr-4">
      <div>
        <ClientChooser
          handleChange={setClient}
          selectedClient={selectedClient}
        />

        <EntityFilterWrapper filterData={filterData} filterDispatcher={filterDispatcher} selectedClient={selectedClient}>
          <EntityTypeChooser
            currentEntityType={currentEntityType}
            setEntityType={setCurrentEntityType}
          />

          <FilterModal
            searchEntities={searchEntities}
          />
        </EntityFilterWrapper>

        <Button className="ml-4" type="button" onClick={searchEntities}>Suchen</Button>

        <EntityModal
          openModal={openEntityModal}
          entity={entity}
          isBookmarkCallback={isBookmarked}
          toggleBookmark={toggleBookmark}
          setOpenModal={setOpenEntityModal}
          showEntityCallback={showEntity}
          reloadEntityCallback={reloadEntity}
        >
          <Tabs defaultValue="fields">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Überblick</TabsTrigger>
              <TabsTrigger value="fields">Datenfelder</TabsTrigger>
              <TabsTrigger value="logs">Logs
                <Badge className="ml-2 bg-red-700">{entity.logsByLevel.critical.length + entity.logsByLevel.error.length}</Badge>
                <Badge className="ml-2 bg-yellow-400 text-foreground">{entity.logsByLevel.warning.length + entity.logsByLevel.notice.length}</Badge>
                <Badge className="ml-2" variant="outline">{entity.logsByLevel.info.length + entity.logsByLevel.debug.length}</Badge>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <EntityActions entity={entity} loading={loading}/>
            </TabsContent>
            <TabsContent value="fields">
              <ItemList
                entity={entity}
                loading={loading}
              />
            </TabsContent>
            <TabsContent value="logs">
              <div className="ml-4">
                {renderLogItems()}
              </div>
            </TabsContent>
          </Tabs>
        </EntityModal>

      </div>
      <div className="mt-4 mr-4">
        <EntityMain entityListComponent={entityTableComponent()} bookmarksComponent={bookmarksComponent()}/>
      </div>
    </main>
  )
}
