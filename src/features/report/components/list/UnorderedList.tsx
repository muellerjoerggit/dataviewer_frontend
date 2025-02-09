import {UnorderedListElement} from "@/features/report/reportTypes.ts";

type Props = {
  element: UnorderedListElement,
}

export default function UnorderedList({element}: Props) {
  return (
    <ul>
      {element.items.map((item: string, index: number) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}