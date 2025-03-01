import {pathToString} from "@/apps/Export/ExportApp.tsx";
import {
  ADD_PROPERTY,
  CHANGE_GROUP_EXPORTER,
  CHANGE_GROUP_LABEL,
  GROUP_TYPE_PROPERTY
} from "@/features/export/constants.ts";

export function changeExportConfiguration(state: any, action: any): any {

  let newState = {...state};

  const path = pathToString(action.path);

  if(!newState[path]) {
    newState[path] = {
      path: action.path,
      groups: {},
    }
  }

  switch (action.type) {
    case ADD_PROPERTY:
      const groupKey = action.propertyData.key;

      let count = 1;
      if(state[path]) {
        count = Object.keys(state[path].groups).reduce((total, key) => {
          return state[path].groups[key]?.groupKey === groupKey ? ++total : total;
        }, 0);
        count++;
      }

      const uniqueKey = `${groupKey}_${count}`;
      const label = count > 1 ? `${action.propertyData.label} ${count}` : action.propertyData.label;

      newState[path].groups[uniqueKey] = {};
      newState[path].groups[uniqueKey].type = GROUP_TYPE_PROPERTY;
      newState[path].groups[uniqueKey].groupKey = groupKey;
      newState[path].groups[uniqueKey].property = action.propertyData.properties.property;
      newState[path].groups[uniqueKey].count = count;
      newState[path].groups[uniqueKey].label = label;
      newState[path].groups[uniqueKey].groupExporter = action.groupExporter;
      break;
    case CHANGE_GROUP_LABEL:
      if(!newState[path].groups[action.uniqueKey]) {
        return newState;
      }

      newState[path].groups[action.uniqueKey].label = action.label;
      break;
    case CHANGE_GROUP_EXPORTER:
      if(!newState[path].groups[action.uniqueKey]) {
        return newState;
      }

      newState[path].groups[action.uniqueKey].groupExporter = action.exporter;
      break;
  }

  return newState;
}
