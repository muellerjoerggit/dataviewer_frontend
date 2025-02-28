import EntityOverviewTable from "@/features/entityOverview/EntityOverviewTable.tsx";
import {useMemo} from "react";

// type Props = {
//   entityTypeList: EntityTypesBookmarkList,
// }

export function EntityTypesBookmarks({extOverviewData, bookmarksList, loadEntity, toggleBookmark, isBookmarkCallback}) {
  const extOverviewBookmarks = useMemo(() => {
    let data = {};
    Object.keys(bookmarksList).map((entityType: string) => {
      data[entityType] = {};

      Object.keys(bookmarksList[entityType]).map((entityKey: string) => {
        if(extOverviewData.has(entityKey)) {
          data[entityType][entityKey] = extOverviewData.get(entityKey);
        }
      })

      if(Object.keys(data[entityType]).length === 0) {
        delete data[entityType];
      }
    })
    return data;
  }, [bookmarksList]);

  return (
    Object.keys(extOverviewBookmarks).map((entityType: string) => {
      if(Object.keys(extOverviewBookmarks[entityType]).length === 0) {
        return;
      }

      const firstKey = Object.keys(extOverviewBookmarks[entityType])[0];
      const header = extOverviewBookmarks[entityType][firstKey].extOverview.header;

      return (
        <>
          <h2>{entityType}</h2>
          <EntityOverviewTable
            header={header}
            entityOverviewRows={extOverviewBookmarks[entityType]}
            loadEntity={loadEntity}
            toggleBookmark={toggleBookmark}
            isBookmarkCallback={isBookmarkCallback}
          />
        </>
        )
    })
  );
}