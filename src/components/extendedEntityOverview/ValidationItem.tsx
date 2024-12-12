import {Badge} from "@/components/ui/badge.tsx";

type props = {
  itemData: {
    red: number,
    yellow: number
  }
}

export default function ValidationItem({
                                         itemData: itemData,
                                       }: props) {

  return (
    <>
      {itemData.red > 0 ? <Badge className="ml-2 bg-red-700">{itemData.red}</Badge> : undefined}
      {itemData.yellow > 0 ?
        <Badge className="ml-2 bg-yellow-400 text-foreground">{itemData.yellow}</Badge> : undefined}
    </>
  )
}