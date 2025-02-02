import {useEffect, useRef, useState} from "react";
import {Task, TaskResultType} from "@/features/backgroundTasks/backgroundTaskTypes.ts";
import {
  emptyTask, emptyTaskResult, ERROR_TASK_ID,
  errorTask,
  TASK_STATUS_ERROR,
  TASK_STATUS_FINISHED,
} from "@/features/backgroundTasks/backgroundTaskConstants.ts";
import {BACKGROUND_TASK_GET_URL, BACKGROUND_TASK_RESULT_GET_URL} from "@/features/api.ts";

type ReturnValue = {
  task: Task,
  taskResult: any,
  isIntervalActive: boolean,
  startIntervalCallback: () => void,
  stopIntervalCallback: () => void,
}

export function useFetchBackgroundTask(taskId: number | undefined): ReturnValue {
  const [task, setTask] = useState<Task>(emptyTask);
  const [taskResult, setTaskResult] = useState<TaskResultType>(emptyTaskResult);
  const [isIntervalActive, setIsIntervalActive] = useState(false);
  const intervalId = useRef<ReturnType<typeof setInterval> | undefined>();
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (taskId === undefined) {
      abortControllerRef.current?.abort();
      setTask(emptyTask);
      return;
    } else if (taskId === ERROR_TASK_ID) {
      abortControllerRef.current?.abort();
      setTask(errorTask);
      return;
    }
    fetchTask();
  }, [taskId]);

  function startInterval() {
    if (!intervalId.current) {
      setIsIntervalActive(true);
      fetchTask();
      intervalId.current = setInterval(fetchTask, 30000);
    }
  }

  function stopInterval() {
    abortControllerRef.current?.abort();
    if (intervalId.current === undefined) return;

    setIsIntervalActive(false);
    clearInterval(intervalId.current);

    intervalId.current = undefined;
  }

  function fetchTask() {
    if (taskId === undefined) return;
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    fetch(`${BACKGROUND_TASK_GET_URL}/${taskId}`, {signal: abortControllerRef.current?.signal})
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        try {
          return res.json();
        } catch {
          res.text().then(text => {
            throw new Error(text)
          });
        }
      })
      .then((data: Task) => {
        setTaskData(data);
      })
      .catch(() => {
        stopInterval();
      })
  }

  function fetchTaskResult() {
    if (task === undefined || task.status !== TASK_STATUS_FINISHED) {
      setTaskResult(emptyTaskResult);
      return;
    }

    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    fetch(`${BACKGROUND_TASK_RESULT_GET_URL}/${taskId}`, {signal: abortControllerRef.current?.signal})
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        try {
          return res.json();
        } catch {
          res.text().then(text => {
            throw new Error(text)
          });
        }
      })
      .then((data) => {
        console.log(data);
        setTaskResult(data)
      })
      .catch(() => {})
  }

  function setTaskData(taskData: Task) {
    if (intervalId && (taskData.status === TASK_STATUS_FINISHED || taskData.status === TASK_STATUS_ERROR)) {
      stopInterval();
    }

    if(taskData.status === TASK_STATUS_FINISHED) {
      fetchTaskResult();
    }

    setTask(taskData);
  }

  return {
    task: task,
    taskResult: taskResult,
    isIntervalActive: isIntervalActive,
    startIntervalCallback: startInterval,
    stopIntervalCallback: stopInterval,
  };
}