import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card.tsx";

type props = {
  itemData: {
    text: string,
    additional: string
  }
}

export default function AdditionalInformationItem({itemData: itemData}: props) {

  return (
    <HoverCard>
      <HoverCardTrigger>
        {sliceText(itemData.text)}
      </HoverCardTrigger>
      <HoverCardContent className="w-auto">
        {itemData.additional}
      </HoverCardContent>
    </HoverCard>
  )

}

export function sliceText(text: string, length = 50): string {
  return text.length > length ? text.slice(0, length) + '...' : text;
}