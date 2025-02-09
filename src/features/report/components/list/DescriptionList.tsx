import {DescriptionItem, DescriptionListElement} from "@/features/report/reportTypes.ts";

type Props = {
  element: DescriptionListElement,
}

export default function DescriptionList({element}: Props) {
  return (
    <dl>
      {element.items.map((item: DescriptionItem, indexDt: number) => (
        <>
          <dt key={indexDt}>{item.term}</dt>
          {item.messages.map((message: string, indexDd: number) => (
            <dd key={indexDd}>{message}</dd>
          ))}
        </>
      ))}
    </dl>
  );
}