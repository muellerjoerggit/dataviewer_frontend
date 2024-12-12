import {Button} from "@/components/ui/button.tsx";

export default function PaginationButton({entityOverviewList, changePagination}) {

  function hasLowerUpperBound(): boolean {
    if (entityOverviewList === undefined) {
      return false;
    }

    if (entityOverviewList.entityCount < 50) {
      return false;
    }

    return entityOverviewList.upperBound > 0 && entityOverviewList.lowerBound > 0;
  }

  function paginationButton() {
    if (entityOverviewList === undefined) {
      return;
    }

    if (entityOverviewList.entityCount <= 50) {
      return;
    }

    if (entityOverviewList.entityCount > 50 && !hasLowerUpperBound()) {
      return (
        <p>Paginierung steht nicht zur Verfügung</p>
      );
    }

    return (
      <>
        <Button variant="outline" disabled={entityOverviewList.page <= 1}
                onClick={() => changePagination(false)}> &lt; </Button>
        <Button variant="outline" className="ml-2"
                disabled={entityOverviewList.page * 50 >= entityOverviewList.entityCount}
                onClick={() => changePagination()}>  &gt; </Button>
      </>

    );
  }

  return (
    <div className="flex min-h-12">
      <p>insgesamt: {entityOverviewList.entityCount === -1 ? 'unbekannt' : entityOverviewList.entityCount}</p>
      <div className="ml-8">{paginationButton()}</div>
    </div>
  )
}