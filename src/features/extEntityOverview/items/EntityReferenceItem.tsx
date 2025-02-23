import {sliceText} from "@/features/extEntityOverview/items/ScalarItem.tsx";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card.tsx";
import EntityOverviewTableComponent from "@/features/entityOverview/EntityOverviewTableComponent.tsx";
import {EntityLoad} from "@/features/entity/entityTypes.ts";
import {ExtOverviewItemReference} from "@/features/extEntityOverview/extEntityOverviewTypes.ts";

type Props = {
  item: ExtOverviewItemReference,
  loadEntity: EntityLoad
}

export default function EntityReferenceItem({item, loadEntity}: Props) {

  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild>
          <div
            className="hover:underline hover:cursor-pointer"
            onClick={() => loadEntity(item.data.entityKey)}
          >
            {sliceText(item.data.label)}
          </div>
        </HoverCardTrigger>
        <HoverCardContent>
          <EntityOverviewTableComponent overviewData={item.data.entityOverview}/>
        </HoverCardContent>
      </HoverCard>

    </>
  )
}