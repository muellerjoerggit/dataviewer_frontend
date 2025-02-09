import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {ReportResultItem} from "@/features/report/reportTypes.ts";
import ResultUnknownIcon from "@/components/icons/ResultUnknownIcon.tsx";
import ResultSuccessIcon from "@/components/icons/ResultSuccessIcon.tsx";
import {RESULT_FAILED, RESULT_SUCCESS, RESULT_UNKNOWN} from "@/features/report/reportConstants.ts";
import ResultFailedIcon from "@/components/icons/ResultFailedIcon.tsx";

type Props = {
  item: ReportResultItem
}

export default function ResultItem({item}: Props) {

  function resultIcon(icon: number) {
    switch (icon) {
      case RESULT_UNKNOWN:
        return (
          <ResultUnknownIcon />
        )
      case RESULT_SUCCESS:
        return (
          <ResultSuccessIcon />
        )
      case RESULT_FAILED:
        return (
          <ResultFailedIcon />
        )
    }
  }

  return (
    <dl className="grid grid-cols-2 gap-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <dt>{item.term}</dt>
          </TooltipTrigger>
          <TooltipContent>
            <p>{item.termTooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <>
              <dd>{resultIcon(item.result)}</dd>
              {item.description === '' ? '' : <dd>{item.description}</dd>}
            </>
          </TooltipTrigger>
          <TooltipContent>
            <p>{item.resultTooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </dl>
  )
}