import {InfoTextElement} from "@/features/report/reportTypes.ts";

type Props = {
  element: InfoTextElement
}

export default function InfoText({element}: Props) {
  return (
    <p>{element.message}</p>
  )
}