import {Separator} from "@/components/ui/separator.tsx";
import PaginationButton from "@/components/PaginationButton.tsx";
import EntityOverviewTable from "@/features/entityOverview/EntityOverviewTable.tsx";

export default function EntityTable({entityOverviewData, changePagination, loadEntity, toggleBookmark, isBookmarkCallback}) {

  if (entityOverviewData === undefined || entityOverviewData.entities.length === 0) return;

  const firstKey = Object.keys(entityOverviewData.entities)[0];
  const header = entityOverviewData.entities[firstKey].extOverview.header;

  return (
    <>
      <PaginationButton
        entityOverviewList={entityOverviewData}
        changePagination={changePagination}
      />

      <Separator className="mt-2 mb-2"/>

      <EntityOverviewTable
        header={header}
        entityOverviewRows={entityOverviewData.entities}
        loadEntity={loadEntity}
        toggleBookmark={toggleBookmark}
        isBookmarkCallback={isBookmarkCallback}
      />
    </>
  )
}