import {
  ExportConfigDispatcher, ExportGroupList, ExportPath
} from "@/features/export/types.ts";
import {GroupWrapper} from "@/features/export/GroupWrapper.tsx";

type Props = {
  groups: ExportGroupList,
  exportConfigDispatcher: ExportConfigDispatcher,
  path: ExportPath,
}

export default function GroupList({groups, exportConfigDispatcher, path}: Props) {

  return (
    <div className="ml-4">
      {
        Object.keys(groups).map((groupKey: string) => (
          <GroupWrapper key={groupKey} group={groups[groupKey]} path={path} exportConfigDispatcher={exportConfigDispatcher} />
        ))
      }
    </div>
  )
}
