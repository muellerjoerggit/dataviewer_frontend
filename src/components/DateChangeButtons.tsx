import {Button} from "@/components/ui/button.tsx";
import MinusCircleIcon from "@/components/icons/MinusCircleIcon.tsx";
import PlusCircleIcon from "@/components/icons/PlusCircleIcon.tsx";

type DateChangeProps = {
  dateChangeCallback: Function,
  interval: number,
  value: number
}

export default function DateChangeButtons({
                                            dateChangeCallback: dateChangingCallback,
                                            interval: dateInterval,
                                            value: dateChangeValue
                                          }: DateChangeProps
) {
  return (
    <div className="ml-3">
      <Button className="p-1" onClick={() => dateChangingCallback(dateInterval, -dateChangeValue)} variant="outline">
        <MinusCircleIcon/>
      </Button>
      <Button className="p-1" onClick={() => dateChangingCallback(dateInterval, dateChangeValue)} variant="outline">
        <PlusCircleIcon/>
      </Button>
    </div>
  )
}