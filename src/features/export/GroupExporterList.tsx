import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Label} from "@/components/ui/label.tsx";
import {
  ActionChangeGroupExporter,
  ExportConfigDispatcher, ExportPath,
  GroupExporterListType
} from "@/features/export/types.ts";
import {CHANGE_GROUP_EXPORTER} from "@/features/export/constants.ts";

type Props = {
  groupExporterList: GroupExporterListType,
  currentExporter: string,
  exportConfigDispatcher: ExportConfigDispatcher,
  path: ExportPath,
  uniqueKey: string,
}

export default function GroupExporterList({groupExporterList, currentExporter, exportConfigDispatcher, path, uniqueKey}: Props) {

  function changeExporter(exporter: string) {
    const action: ActionChangeGroupExporter = {
      type: CHANGE_GROUP_EXPORTER,
      path: path,
      uniqueKey: uniqueKey,
      exporter: exporter,
    }

    exportConfigDispatcher(action);
  }

  return (
    <RadioGroup value={currentExporter} onValueChange={(value) => changeExporter(value)}>
      {
        Object.keys(groupExporterList).map((key: string) => {
          const exporter = groupExporterList[key];
          return (
            <div key={key} className="flex items-center space-x-2">
              <RadioGroupItem value={exporter.name} id={exporter.name}/>
              <Label htmlFor={exporter.name}>{exporter.label}</Label>
            </div>
          )
        })
      }
    </RadioGroup>
  );
}