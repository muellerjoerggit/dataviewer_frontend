import {EntityListResultType} from "@/features/backgroundTasks/backgroundTaskTypes.ts";
import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";

type Props = {
    entityList: EntityListResultType,
    entityListCallback?: Function,
    className?: string
}

export default function EntityListResult({
     entityList: entityList,
     entityListCallback: loadEntityList,
     className: className
}: Props) {

    if(loadEntityList === undefined) {
        return (
            <div className={cn("", className)}>
                <p>Liste laden hier nicht möglich</p>
            </div>
        )
    }

    function loadEntityListInternal() {
        if(loadEntityList === undefined) {return}
        loadEntityList(entityList.entityList);
    }

    return (
        <div className={cn("", className)}>
            <Button variant="outline" className="mt-2 ml-2" onClick={loadEntityListInternal}>Liste laden</Button>
        </div>
    )
}