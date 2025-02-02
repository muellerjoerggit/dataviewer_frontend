import {buildFiltersForRequest} from "@/hooks/filterReducer.ts";
import {START_EXPORT_URL} from "@/features/api.ts";
import {emptyTask} from "@/features/backgroundTasks/backgroundTaskConstants.ts";

export default function fetchExport(filterData, selectedClient, currentEntityType, exportConfig, setTaskId): void {
  const filters = buildFiltersForRequest(filterData);

  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      filters: filters,
      client: selectedClient,
      entityType: currentEntityType,
      export: exportConfig,
    })
  };

  fetch(START_EXPORT_URL, requestOptions)
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
      setTaskId(data?.taskId);
    })
    .catch(function () {
      setTaskId(emptyTask);
    })
}