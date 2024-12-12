import {EntityReferenceType, EntityReferenceItemData} from '@/features/property/propertyTypes.ts'
import {HoverCard, HoverCardContent, HoverCardTrigger,} from "@/components/ui/hover-card"
import EntityOverview from "@/components/EntityOverview.tsx";
import EntityReference from "@/components/EntityReference.tsx";

type props = {
  propertyData: EntityReferenceItemData
}

export default function EntityReferenceItemComponent({propertyData}: props): JSX.Element {

  return (
    <>
      {
        propertyData.entities.map((entityReference: EntityReferenceType) => (
          <dd key={entityReference.entityKey}>
            <HoverCard>
              <HoverCardTrigger asChild>
                <EntityReference entityReference={entityReference} />
              </HoverCardTrigger>
              <HoverCardContent className="w-96">
                <EntityOverview entityOverview={entityReference.entityOverview} />
              </HoverCardContent>
            </HoverCard>
          </dd>
        ))
      }
    </>
  );
}