import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card.tsx";
import {ExtOverviewItemScalar} from "@/features/extEntityOverview/extEntityOverviewTypes.ts";

type Props = {
  item: ExtOverviewItemScalar
}

export default function ScalarItem({item}: Props) {

  if (item.data.text.length <= 50) {
    return <p>{item.data.text}</p>
  }

  return (
    <HoverCard>
      <HoverCardTrigger>
        {sliceText(item.data.text)}
      </HoverCardTrigger>
      <HoverCardContent className="w-auto">
        {item.data.text}
      </HoverCardContent>
    </HoverCard>
  )

}

export function sliceText(text: string, length = 50): string {
  return text.length > length ? text.slice(0, length) + '...' : text;
}