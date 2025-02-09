import {PreformattedElement} from "@/features/report/reportTypes.ts";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";

type Props = {
  element: PreformattedElement,
}

export function PreformattedText({element}: Props) {
  return (
    <ScrollArea className="py-3" type="always">
      <pre>{element.text}</pre>
      <ScrollBar orientation="horizontal"/>
      <ScrollBar orientation="vertical"/>
    </ScrollArea>
  );
}