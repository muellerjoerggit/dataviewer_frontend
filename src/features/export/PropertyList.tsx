import Property from "@/features/export/Property.tsx";
import {Button} from "@/components/ui/button.tsx";
import PlusCircleIcon from "@/components/icons/PlusCircleIcon.tsx";
import {
  ACTION_ADD_PROPERTY,
  ExportConfigDispatcher,
  ExportPath,
  ExportPathData,
  PropertyType
} from "@/features/export/types.ts";
import {ADD_PROPERTY} from "@/features/export/constants.ts";

type Props = {
  exportPathData: ExportPathData,
  exportConfigDispatcher: ExportConfigDispatcher,
}

export default function PropertyList({exportPathData, exportConfigDispatcher}: Props) {

  function addPropertyToConfig(path: ExportPath, property: PropertyType) {
    const action: ACTION_ADD_PROPERTY = {
      type: ADD_PROPERTY,
      propertyData: property,
      path: path,
    }

    exportConfigDispatcher(action);
  }

  return (
    <div className="ml-4">
      {
        Object.keys(exportPathData.properties).map((propertyKey: string) => (
          <Property key={propertyKey} property={exportPathData.properties[propertyKey]}>
            <Button variant="ghost" size="icon" onClick={() => addPropertyToConfig(exportPathData.path, exportPathData.properties[propertyKey])}><PlusCircleIcon/></Button>
          </Property>
        ))
      }
    </div>
  )
}
