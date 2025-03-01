import ClientChooser from "@/components/ClientsChooser.tsx";
import EntityFilterWrapper from "@/components/EntityFilterWrapper.tsx";
import EntityTypeChooser from "@/components/EntityTypeChooser.tsx";
import FilterModal from "@/components/filter/FilterModal.tsx";
import {useReducer, useState} from "react";
import {changeFilter} from "@/hooks/filterReducer.ts";
import {emptyFilterData} from "@/features/filter/filterConstants.ts";
import useFetchExportEntityTypes from "@/hooks/useFetchExportEntityTypes.ts";
import {changeExportConfiguration} from "@/features/export/exportReducer.ts";
import {Button} from "@/components/ui/button.tsx";
import {
  ExportEntityType,
  ExportPath,
  ExportPathData,
  PathList
} from "@/features/export/types.ts";
import EntityPathList from "@/features/export/EntityPathList.tsx";
import fetchExport from "@/hooks/fetchExport.ts";
import ExportConfig from "@/features/export/ExportConfig.tsx";
import BackgroundTaskStatus from "@/features/backgroundTasks/BackgroundTaskStatus.tsx";

const START_PATH = '::start::';

export default function ExportApp() {
  const [currentEntityType, setCurrentEntityTypeState] = useState<string>('');
  const [selectedClient, setSelectedClient] = useState('');
  const [taskId, setTaskId] = useState(undefined);
  const [entityPathList, setEntityPathList] = useState<PathList>({});
  const [filterData, filterDispatcher] = useReducer(changeFilter, JSON.parse(JSON.stringify(emptyFilterData)));
  const [exportConfigList, exportConfigDispatcher] = useReducer(changeExportConfiguration, {});
  const {addExportEntity} = useFetchExportEntityTypes(addEntityPath);

  function setClient(client: string) {
    setSelectedClient(client);
  }

  function setCurrentEntityType(entityType: string) {
    setCurrentEntityTypeState(entityType);
    setEntityPathList({});
    addExportEntity({
      targetEntityType: entityType,
      path: []
    });
  }

  function addEntityPath(exportPath: ExportPath, exportType: ExportEntityType) {
    const pathString = pathToString(exportPath);
    const pathData: ExportPathData = {... exportType, path: exportPath};
    setEntityPathList({...entityPathList, [pathString]: pathData});
  }

  function startExport(): void {
    fetchExport(filterData, selectedClient, currentEntityType, exportConfigList, setTaskId);
  }

  return (
    <main className="grid grid-cols-1 h-full w-full mt-4 mr-4">
      <div className="flex flex-row items-center gap-4">
        <ClientChooser handleChange={setClient} selectedClient={selectedClient} />

        <EntityFilterWrapper filterData={filterData} filterDispatcher={filterDispatcher} selectedClient={selectedClient}>
          <EntityTypeChooser currentEntityType={currentEntityType} setEntityType={setCurrentEntityType} />
          <FilterModal/>
        </EntityFilterWrapper>

        <Button variant="outline" onClick={() => startExport()} disabled={currentEntityType === ''}>Start Export</Button>

        <BackgroundTaskStatus taskId={taskId} />

      </div>
      <div className="grid grid-cols-2 mt-8 gap-4">
        <EntityPathList entityPathList={entityPathList} exportConfigDispatcher={exportConfigDispatcher} addExportEntity={addExportEntity} />
        <ExportConfig exportConfigList={exportConfigList} entityPathList={entityPathList} exportConfigDispatcher={exportConfigDispatcher} />
      </div>
    </main>
  )
}

export function pathToString(exportPath: ExportPath) {
  let pathString = START_PATH;
  if(exportPath.path.length > 0) {
    pathString = exportPath.path.join('::');
  }

  return pathString;
}
