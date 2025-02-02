import Property from "@/features/export/Property.tsx";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import PencilSquareIcon from "@/components/icons/PencilSquareIcon.tsx";
import {Input} from "@/components/ui/input.tsx";
import {ExportPath} from "@/features/export/types.ts";
import {CHANGE_PROPERTY_LABEL} from "@/features/export/constants.ts";


export default function ExportConfig({exportConfig, entityPathList, exportConfigDispatcher}) {

  function changeLabel(path: ExportPath, uniqueKey: string, label: string) {
    const action = {
      type: CHANGE_PROPERTY_LABEL,
      path: path,
      uniqueKey: uniqueKey,
      label: label,
    }

    exportConfigDispatcher(action);
  }

  return (
    <div>
      {
        Object.keys(exportConfig).map((pathKey: string) => {
          const exportData = exportConfig[pathKey];
          const exportPathData = entityPathList[pathKey];
          return (
            <div key={'export' + pathKey} className="ml-4">
              <h2>{exportPathData.entityLabel}</h2>
              {
                Object.keys(exportData.properties).map((key: string) => {
                  const propertyKey = exportData.properties[key].propertyKey;
                  const propertyData= entityPathList[pathKey].properties[propertyKey];
                  return (
                    <>
                      <Property key={key} property={propertyData} label={exportData.properties[key].label}>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon"><PencilSquareIcon/></Button>
                          </DialogTrigger>
                          <DialogContent className="flex flex-col h-[60%] w-[30%] max-w-[60%] m-auto !overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Feld</DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-2">
                              <label htmlFor="label">Spaltenname</label>
                              <Input id="label" value={exportData.properties[key].label} onChange={e => changeLabel(exportData.path, key, e.target.value)}/>
                            </div>
                            <DialogFooter className="mt-auto sm:justify-start">
                              <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                  Schließen
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </Property>
                    </>
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