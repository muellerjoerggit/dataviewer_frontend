import {
  ActionAddProperty,
  ExportConfigDispatcher,
  ExportGroup,
  ExportPath,
} from "@/features/export/types.ts";
import Property from "@/features/export/Property.tsx";
import {Button} from "@/components/ui/button.tsx";
import PlusCircleIcon from "@/components/icons/PlusCircleIcon.tsx";
import {ADD_PROPERTY, GROUP_TYPE_PROPERTY} from "@/features/export/constants.ts";

type Props = {
  group: ExportGroup,
  exportConfigDispatcher: ExportConfigDispatcher,
  path: ExportPath,
}

export function GroupWrapper({group, exportConfigDispatcher, path}: Props) {

  function addGroupToConfig() {
    switch (group.type) {
      case GROUP_TYPE_PROPERTY:
        const action: ActionAddProperty = {
          type: ADD_PROPERTY,
          propertyData: group,
          path: path,
          groupExporter: group.defaultExporter,
        }
        exportConfigDispatcher(action);
    }
  }

  function buildGroup() {
    switch (group.type) {
      case GROUP_TYPE_PROPERTY:
        return (
          <Property key={group.key} property={group}>
            <Button variant="ghost" size="icon" onClick={() => addGroupToConfig()}><PlusCircleIcon/></Button>
          </Property>
        )
    }
  }


  return buildGroup();
}