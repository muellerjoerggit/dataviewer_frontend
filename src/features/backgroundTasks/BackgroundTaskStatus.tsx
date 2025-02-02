import {
  PROGRESS_TYPE_COUNT_ENTITIES,
  TASK_STATUS_ERROR, TASK_STATUS_FINISHED,
  TASK_STATUS_IDLE,
  TASK_STATUS_RUNNING
} from "@/features/backgroundTasks/backgroundTaskConstants.ts";
import {Button} from "@/components/ui/button.tsx";
import {useFetchBackgroundTask} from "@/features/backgroundTasks/useFetchBackgroundTask.ts";
import PlayIcon from "@/components/icons/PlayIcon.tsx";
import PauseIcon from "@/components/icons/PauseIcon.tsx";
import TaskResults from "@/features/backgroundTasks/TaskResults.tsx";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";


export default function BackgroundTaskStatus({taskId}) {
  const {task, taskResult, isIntervalActive, startIntervalCallback, stopIntervalCallback} = useFetchBackgroundTask(taskId);

  function getStatus() {
    switch (task?.status) {
      case TASK_STATUS_IDLE:
        return 'Wartend';
      case TASK_STATUS_RUNNING:
        return 'in Arbeit';
      case TASK_STATUS_ERROR:
        return 'Fehler';
      case TASK_STATUS_FINISHED:
        return 'Beendet';
      default:
        return 'unbekannt';
    }
  }

  function getProgress() {
    if(task?.progress === undefined) {
      return '';
    }

    if(task.progress?.type === PROGRESS_TYPE_COUNT_ENTITIES) {
      return `${task.progress.processedEntities} von ${task.progress.totalEntities} ${task.progress.label} exportiert`;
    }
  }

  function intervalToggle() {
    if (isIntervalActive) {
      stopIntervalCallback();
    } else {
      startIntervalCallback();
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-2" variant="outline" disabled={taskId === undefined}>Export Status</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col h-[60%] w-[30%] max-w-[60%] m-auto !overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Task {task.taskId}</DialogTitle>
        </DialogHeader>
        <Button variant="ghost" size="sm" onClick={intervalToggle}>{isIntervalActive ? <PauseIcon/> : <PlayIcon/>}</Button>
        <dl className="grid grid-cols-2 mt-4 gap-2">
          <dt>Name:</dt>
          <dd>{task.name}</dd>

          <dt>Status:</dt>
          <dd>{getStatus()}</dd>

          <dt>Beschreibung:</dt>
          <dd>{task.description}</dd>

          <dt>Start:</dt>
          <dd>{task.start}</dd>

          <dt>End:</dt>
          <dd>{task.end}</dd>
        </dl>

        <dt>Fortschritt:</dt>
        <dd>{getProgress()}</dd>

        <TaskResults taskResult={taskResult}/>
        <DialogFooter className="mt-auto sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">Schließen</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}