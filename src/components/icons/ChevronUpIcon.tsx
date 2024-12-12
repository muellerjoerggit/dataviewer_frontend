import {cn} from "@/lib/utils.ts";
import {IconProps} from "@/features/iconTypes.ts";

export default function ChevronUpIcon(
  {className}: IconProps
) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
         className={cn("size-6", className)}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5"/>
    </svg>
  )
}