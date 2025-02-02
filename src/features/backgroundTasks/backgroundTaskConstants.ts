import {Task, TaskResultType} from "@/features/backgroundTasks/backgroundTaskTypes.ts";

export const TASK_TYPE_EXPORT = 1;

export const TASK_STATUS_IDLE = 1;
export const TASK_STATUS_RUNNING = 2;
export const TASK_STATUS_ERROR = 3;
export const TASK_STATUS_FINISHED = 4;

export const ERROR_TASK_ID = -1;

export const TASK_RESULT_URL = 1;
export const TASK_RESULT_FILE = 2;
export const TASK_RESULT_ENTITY_LIST = 3;

export const PROGRESS_TYPE_COUNT_ENTITIES = 1;


export const emptyTask: Task = {
  taskId: undefined,
  name: '',
  status: undefined,
  description: '',
  start: undefined,
  end: undefined,
  progress: undefined
};

export const errorTask: Task = {
  taskId: -1,
  name: 'Fehler',
  status: TASK_STATUS_ERROR,
  description: 'Fehler beim Ausführen des Export',
  start: undefined,
  end: undefined,
  progress: undefined
};

export const emptyTaskResult: TaskResultType = {
  result: false,
  data:  [{
    type: 0
  }]
}