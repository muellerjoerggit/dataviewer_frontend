import {cn} from "@/lib/utils.ts";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Button} from "@/components/ui/button"
import {EntityAction} from "@/features/entityAction/entityActionTypes.ts";

type Props = {
  action: EntityAction,
  className?: string | undefined,
}

export default function UrlAction({action, className}: Props): JSX.Element {

  function renderButton() {
    return (
      <Button asChild variant="outline" className={cn(className)}>
        <a href={action.data.url} target='_blank'>{action.data.title}</a>
      </Button>
    )
  }

  function render() {
    if (action.data.description === '') {
      return renderButton()
    } else {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {renderButton()}
            </TooltipTrigger>
            <TooltipContent>
              <p>{action.data.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
  }

  return render();
}