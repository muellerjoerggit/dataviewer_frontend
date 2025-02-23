import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card.tsx";
import {ExtOverviewItemAdditional} from "@/features/extEntityOverview/extEntityOverviewTypes.ts";

type Props = {
  item: ExtOverviewItemAdditional
}

export default function AdditionalInformationItem({item}: Props) {

  return (
    <HoverCard>
      <HoverCardTrigger>
        {sliceText(item.data.text)}
      </HoverCardTrigger>
      <HoverCardContent className="w-auto">
        {item.data.additional}
      </HoverCardContent>
    </HoverCard>
  )
}

export function sliceText(text: string, length = 50): string {
  return text.length > length ? text.slice(0, length) + '...' : text;
}