import {Badge} from "@/components/ui/badge.tsx";
import {ExtOverviewItemValidation} from "@/features/extEntityOverview/extEntityOverviewTypes.ts";

type Props = {
  item: ExtOverviewItemValidation
}

export default function ValidationItem({item}: Props) {

  return (
    <>
      {item.data.red > 0 ? <Badge className="ml-2 bg-red-700">{item.data.red}</Badge> : undefined}
      {item.data.yellow > 0 ?
        <Badge className="ml-2 bg-yellow-400 text-foreground">{item.data.yellow}</Badge> : undefined}
    </>
  )
}