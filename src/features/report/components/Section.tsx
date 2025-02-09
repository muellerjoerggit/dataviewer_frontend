import {SectionElement} from "@/features/report/reportTypes.ts";
import {createElement} from "react";

type Props = {
  element: SectionElement
}

export const sectionVariants = {
  sectionLevel2: {
    css: 'mb-4 text-lg font-semibold leading-none tracking-tight',
    level: 2
  },
  sectionLevel3: {
    css: 'mb-4 ml-2 text-md font-semibold leading-none tracking-tight',
    level: 3
  },
}

export default function Section({element}: Props) {
  return createElement(
    `h${sectionVariants[element.variant].level}`,
    {className: sectionVariants[element.variant].css, id: element.anker},
    element.headline
  )
}