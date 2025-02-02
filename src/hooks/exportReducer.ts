import {pathToString} from "@/apps/Export/ExportApp.tsx";
import {ADD_PROPERTY, CHANGE_PROPERTY_LABEL} from "@/features/export/constants.ts";

export function changeExportConfiguration(state: any, action: any): any {

  let newState = {...state};

  const path = pathToString(action.path);

  if(!newState[path]) {
    newState[path] = {
      path: action.path,
      properties: {},
    }
  }

  switch (action.type) {
    case ADD_PROPERTY:
      const propertyKey = action.propertyData.key;

      let count = 1;
      if(state[path]) {
        count = Object.keys(state[path].properties).reduce((total, key) => {
          return state[path].properties[key]?.propertyKey === propertyKey ? ++total : total;
        }, 0);
        count++;
      }

      const uniqueKey = `${propertyKey}_${count}`;
      const label = count > 1 ? `${action.propertyData.label} ${count}` : action.propertyData.label;

      newState[path].properties[uniqueKey] = {};
      newState[path].properties[uniqueKey].propertyKey = propertyKey;
      newState[path].properties[uniqueKey].count = count;
      newState[path].properties[uniqueKey].label = label;
      break;
    case CHANGE_PROPERTY_LABEL:
      if(!newState[path].properties[action.uniqueKey]) {
        return newState;
      }

      newState[path].properties[action.uniqueKey].label = action.label;
      break;
  }

  return newState;
}
