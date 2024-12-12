import {Separator} from "@/components/ui/separator.tsx";
import PaginationButton from "@/components/PaginationButton.tsx";
import EntityOverviewTable from "@/components/EntityOverviewTable.tsx";

export default function EntityTable({entityOverviewData, changePagination, loadEntity}) {

  if (entityOverviewData === undefined || entityOverviewData.entities.length === 0) return;

  return (
    <>
      <PaginationButton
        entityOverviewList={entityOverviewData}
        changePagination={changePagination}
      />

      <Separator className="mt-2 mb-2"/>

      <EntityOverviewTable entityOverviewData={entityOverviewData} loadEntity={loadEntity}/>
    </>
  )
}