import {cn} from "@/lib/utils.ts";
import {IconProps} from "@/features/iconTypes.ts";

export default function MinusCircleIcon(
  {className}: IconProps
) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
         className={cn("size-6", className)}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
    </svg>
  )
}