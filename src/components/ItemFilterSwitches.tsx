import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import GearIcon from "@/components/icons/GearIcon.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {Label} from "@/components/ui/label.tsx";

type props = {
  hideDeprecated: boolean | undefined,
  setHideDeprecated: (checked: boolean) => void,
  hideNullItems: boolean | undefined,
  setHideNullItems: (checked: boolean) => void
}

export default function ItemFilterSwitches({hideDeprecated, setHideDeprecated, hideNullItems, setHideNullItems}: props) {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost"><GearIcon/></Button>
      </PopoverTrigger>
      <PopoverContent className="ml-auto">
        <div className="mt-4">
          <Switch id="hide-deprecated"
                  checked={hideDeprecated}
                  onCheckedChange={setHideDeprecated}
          />
          <Label className="ml-2" htmlFor="hide-deprecated">deprecated Felder ausblenden</Label>
        </div>
        <div className="mt-4">
          <Switch id="hide-null"
                  checked={hideNullItems}
                  onCheckedChange={setHideNullItems}
          />
          <Label className="ml-2" htmlFor="hide-null">NULL ausblenden</Label>
        </div>
      </PopoverContent>
    </Popover>
  )
}