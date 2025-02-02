import {ReferenceType} from "@/features/export/types.ts";
import Reference from "@/features/export/Reference.tsx";
import {Button} from "@/components/ui/button.tsx";
import PlusCircleIcon from "@/components/icons/PlusCircleIcon.tsx";


export default function ReferenceList({exportPathData, addExportEntity}) {

  return (
    Object.keys(exportPathData.references).map((referenceKey: string) => {
      const referenceData: ReferenceType = exportPathData.references[referenceKey];
      const newExportPath = {targetEntityType: referenceData.entityType, path: [... exportPathData.path.path, referenceData.property]};

      return (
        <div className="ml-4">
          <Reference key={referenceKey} reference={referenceData}>
            <Button variant="ghost" size="icon" onClick={() => addExportEntity(newExportPath)}><PlusCircleIcon/></Button>
          </Reference>
        </div>
      )
    })
  )
}