export type Task = {
  taskId: number | undefined | null,
  name: string,
  status: number | undefined | null,
  description: string,
  start: string | undefined | null,
  end: string | undefined | null,
  progress: TaskProgress
};

export type TaskProgress = TaskProgressCountEntities | undefined | null;

export type TaskProgressCountEntities = {
  type: 1,
  label: string,
  processedEntities: number,
  totalEntities: number
}

export type TaskResultType = {
  result: boolean,
  data: Array<EmptyResult | UrlResultType | EntityListResultType>
}

export type EmptyResult = {
  type: 0
}

export type UrlResultType = {
  type: 1,
  urls: Array<Url>
}

export type EntityListResultType = {
  type: 3,
  entityList: Array<string>
}

export type Url = {
  label: string,
  url: string
}

export type ExportStatus = {
  status: number,
  task: number
}