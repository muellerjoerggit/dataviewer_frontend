import {OrderedListElement} from "@/features/report/reportTypes.ts";

type Props = {
  element: OrderedListElement,
}

export default function OrderedList({element}: Props) {
  return (
    <ol>
      {element.items.map((item: string, index: number) => (
        <li key={index}>{item}</li>
      ))}
    </ol>
  );
}


