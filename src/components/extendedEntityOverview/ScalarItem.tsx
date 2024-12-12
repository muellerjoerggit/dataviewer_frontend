import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card.tsx";

type props = {
  itemData: {
    text: string
  }
}

export default function ScalarItem({
                                     itemData: itemData
                                   }: props) {

  if (itemData.text.length <= 50) {
    return <p>{itemData.text}</p>
  }

  return (
    <HoverCard>
      <HoverCardTrigger>
        {sliceText(itemData.text)}
      </HoverCardTrigger>
      <HoverCardContent className="w-auto">
        {itemData.text}
      </HoverCardContent>
    </HoverCard>
  )

}

export function sliceText(text: string, length = 50): string {
  return text.length > length ? text.slice(0, length) + '...' : text;
}