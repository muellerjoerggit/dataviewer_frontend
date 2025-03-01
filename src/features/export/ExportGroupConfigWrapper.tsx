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
import {CHANGE_GROUP_LABEL, GROUP_TYPE_PROPERTY} from "@/features/export/constants.ts";
import {
  ActionChangeGroupLabel,
  ExportConfigDispatcher,
  ExportGroupConfig, ExportPath,
  ExportPathData
} from "@/features/export/types.ts";
import GroupExporterList from "@/features/export/GroupExporterList.tsx";

type Props = {
  exportGroupConfig: ExportGroupConfig,
  uniqueKey: string,
  pathExportData: ExportPathData,
  path: ExportPath,
  exportConfigDispatcher: ExportConfigDispatcher,
}

export default function ExportGroupConfigWrapper({exportGroupConfig, uniqueKey, pathExportData, path, exportConfigDispatcher}: Props): JSX.Element {

  function changeLabel(label: string) {
    const action: ActionChangeGroupLabel = {
      type: CHANGE_GROUP_LABEL,
      path: path,
      uniqueKey: uniqueKey,
      label: label,
    }

    exportConfigDispatcher(action);
  }

  function build() {
    switch (exportGroupConfig.type) {
      case GROUP_TYPE_PROPERTY:
        const groupKey = exportGroupConfig.groupKey;
        const propertyData= pathExportData.properties[groupKey];
        return (
          <Property className="ml-4" key={uniqueKey} property={propertyData} label={exportGroupConfig.label}>
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
                  <Input id="label" value={exportGroupConfig.label} onChange={e => changeLabel(e.target.value)}/>
                </div>
                <GroupExporterList
                  groupExporterList={propertyData.groupExporterList}
                  currentExporter={exportGroupConfig.groupExporter}
                  exportConfigDispatcher={exportConfigDispatcher}
                  path={path}
                  uniqueKey={uniqueKey}
                />
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
        )
      default: return <></>
    }
  }

  return build();
}