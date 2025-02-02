import {TaskResultType} from "@/features/backgroundTasks/backgroundTaskTypes.ts";
import {TASK_RESULT_ENTITY_LIST, TASK_RESULT_URL} from "@/features/backgroundTasks/backgroundTaskConstants.ts";
import UrlResult from "@/features/backgroundTasks/UrlResult.tsx";
import {cn} from "@/lib/utils.ts";
import EntityListResult from "@/features/backgroundTasks/EntityListResult.tsx";

type Props = {
    taskResult?: TaskResultType,
    entityListCallback?: Function,
    className?: string
}

export default function TaskResults({
    taskResult: taskResult,
    entityListCallback: loadEntityList,
    className: className
}: Props) {

    function buildResult() {
        if(taskResult === undefined || !taskResult.result) return;

        return (
          taskResult.data.map((result) => {
            switch (result.type) {
              case TASK_RESULT_URL:
                return (
                  <UrlResult urlResult={result} />
                )
              case TASK_RESULT_ENTITY_LIST:
                return (
                  <EntityListResult entityList={result} entityListCallback={loadEntityList} />
                )
            }
          })
        )
    }

    return (
        <div className={cn("", className)}>
            {buildResult()}
        </div>
    )
}