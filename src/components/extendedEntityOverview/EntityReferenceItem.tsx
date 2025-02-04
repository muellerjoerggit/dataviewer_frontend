import {sliceText} from "@/components/extendedEntityOverview/ScalarItem.tsx";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card.tsx";
import EntityOverviewTableComponent from "@/components/EntityOverviewTableComponent.tsx";
import {EntityOverviewType} from "@/features/property/propertyTypes.ts";

type props = {
  itemData: {
    entityKey: string,
    label: string,
    entityOverview: EntityOverviewType
  },
  loadEntityCallback: Function
}

export default function EntityReferenceItem({
                                              itemData: itemData,
                                              loadEntityCallback: loadEntity
                                            }: props) {

  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild>
          <div
            className="hover:underline hover:cursor-pointer"
            onClick={() => loadEntity(itemData.entityKey)}
          >
            {sliceText(itemData.label)}
          </div>
        </HoverCardTrigger>
        <HoverCardContent>
          <EntityOverviewTableComponent overviewData={itemData.entityOverview}/>
        </HoverCardContent>
      </HoverCard>

    </>
  )
}