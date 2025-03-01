import ExportGroupConfigWrapper from "@/features/export/ExportGroupConfigWrapper.tsx";


export default function ExportConfig({exportConfigList, entityPathList, exportConfigDispatcher}) {

  if(exportConfigList === undefined) {
    return;
  }

  return (
    <div>
      {
        Object.keys(exportConfigList).map((pathKey: string) => {
          const exportConfig = exportConfigList[pathKey];
          const exportPathData = entityPathList[pathKey];
          return (
            <div key={'export' + pathKey} className="ml-4">
              <h2>{exportPathData.entityLabel}</h2>
              {
                Object.keys(exportConfig.groups).map((key: string) => {
                  return (
                    <ExportGroupConfigWrapper
                      exportGroupConfig={exportConfig.groups[key]}
                      uniqueKey={key}
                      pathExportData={entityPathList[pathKey]}
                      path={exportConfig.path}
                      exportConfigDispatcher={exportConfigDispatcher}
                    />
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}