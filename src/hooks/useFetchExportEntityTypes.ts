import {useMemo, useState} from "react";
import {ExportEntityType, ExportPath} from "@/features/export/types.ts";

type EntityPathCallback = (exportPath: ExportPath, exportPathData: ExportEntityType) => void;

export default function useFetchExportEntityTypes(setEntityPathCallback: EntityPathCallback) {
  const exportExportEntityTypesMap = useMemo((): Map<string, ExportEntityType> => new Map, []);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string>('');

  function addExportEntity(exportPath: ExportPath) {
    const entityType = exportPath.targetEntityType;
    if(exportExportEntityTypesMap.has(entityType)) {
      setEntityPathCallback(exportPath, <ExportEntityType>exportExportEntityTypesMap.get(entityType));
    }

    setIsPending(true);

    fetch(`/api/export/entityType/${entityType}`)
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        try {
          return res.json();
        } catch {
          res.text().then(text => {
            throw new Error(text);
          });
        }
      })
      .then((data: ExportEntityType) => {
        setIsPending(false);
        exportExportEntityTypesMap.set(entityType, data);
        setEntityPathCallback(exportPath, data);
      })
      .catch(function (error) {
        setIsPending(false);
        setError(`${error}`);
      })
  }

  return {addExportEntity: addExportEntity, isPending, error};
}