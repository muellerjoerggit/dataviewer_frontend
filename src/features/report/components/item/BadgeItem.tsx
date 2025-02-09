import {Badge} from "@/components/ui/badge.tsx";
import {ReportBadgeItem} from "@/features/report/reportTypes.ts";

type Props = {
  item: ReportBadgeItem
}

export function BadgeItem({item}: Props) {
  return (
    <Badge variant={item.variant}>{item.text}</Badge>
  );
}