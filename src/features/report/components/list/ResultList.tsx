import {ResultListElement} from "@/features/report/reportTypes.ts";
import ResultItem from "@/features/report/components/item/ResultItem.tsx";

type Props = {
  element: ResultListElement
}

export default function ResultList({element}: Props) {
  return (
    <dl className="grid grid-cols-[30%_70%]">
      {
        element.items.map((item) => <ResultItem item={item} />)
      }
    </dl>
  );
}