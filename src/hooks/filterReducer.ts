import {FilterData, FilterType, OptionItem, SqlFilterDefinition} from "@/features/filter/filterTypes.ts";

import {
    ACTION_ADD_BOOLEAN_FILTER,
    ACTION_ADD_DATE_FILTER,
    ACTION_ADD_ENTITY_ITEM,
    ACTION_ADD_IN_FILTER,
    ACTION_ADD_LIST_FILTER,
    ACTION_ADD_OPTION_ITEM,
    ACTION_ADD_PAGINATION_FILTER,
    ACTION_ADD_TEXT_FILTER,
    ACTION_DELETE_FILTER_OF_GROUP,
    ACTION_REMOVE_ENTITY_ITEM,
    ACTION_REMOVE_FILTER,
    ACTION_REMOVE_OPTION_ITEM,
    ACTION_RESET_ALL,
    ACTION_RESET_FILTER,
    ACTION_SET_DEFAULT_MANDATORY_FILTER,
    ACTION_SET_FILTER_DEFINITIONS,
    ACTION_SET_FILTER_OF_GROUP,
    ACTION_SET_OPTION_ITEM,
    emptyFilterData,
    FILTER_DATA_TYPE_BOOLEAN,
    FILTER_DATA_TYPE_DATE,
    FILTER_DATA_TYPE_IN,
    FILTER_DATA_TYPE_LIST,
    FILTER_DATA_TYPE_OPTION,
    FILTER_DATA_TYPE_OPTIONS,
    FILTER_DATA_TYPE_PAGINATION,
    FILTER_DATA_TYPE_REFERENCE,
    FILTER_DATA_TYPE_TEXT
} from "@/features/filter/filterConstants.ts";

import {EntityList, EntityListItem} from "@/features/entity/entityTypes.ts";
import {getAddOptionAction} from "@/components/filterHandler/SelectFilter.tsx";
import {getAddCheckAction} from "@/components/filterHandler/CheckboxFilter.tsx";

export function changeFilter(state, action): FilterData {
  const filterName = action.filterName;

  let newState = {...state};
  const filterExists = (filterName in state.filter);

  if (!filterExists && ('filterName' in action)) {
    newState.filter[filterName] = {};
  }

  switch (action.type) {
    case ACTION_SET_FILTER_DEFINITIONS:
      newState.filterDefinitions = action.filterDefinitions;
      newState.filterGroups = action.filterGroups;
      newState.groupFilterMapping = action.groupFilterMapping;
      break;
    case ACTION_SET_FILTER_OF_GROUP:
      newState.groupFilter[action.groupKey] = action.groupFilter;
      break;
    case ACTION_DELETE_FILTER_OF_GROUP:
      delete newState.groupFilter[action.groupKey];
      break;
    case ACTION_RESET_ALL:
      return JSON.parse(JSON.stringify(emptyFilterData));
    case ACTION_RESET_FILTER:
      newState.filter = {};
      newState.groupFilter = {};
      break;
    case ACTION_SET_DEFAULT_MANDATORY_FILTER:
      newState = setDefaultMandatoryFilter(newState, action.filterDefinitions);
      break;
    case ACTION_ADD_BOOLEAN_FILTER:
      newState.filter[filterName].filterDataType = FILTER_DATA_TYPE_BOOLEAN;
      newState.filter[filterName].value = action.value;
      break;
    case ACTION_ADD_PAGINATION_FILTER:
      newState.filter[filterName].filterDataType = FILTER_DATA_TYPE_PAGINATION;
      newState.filter[filterName].page = action.page;
      if (action.lowerBound != null) {
        newState.filter[filterName].lowerBound = action.lowerBound;
      } else if (action.upperBound != null) {
        newState.filter[filterName].upperBound = action.upperBound;
      }
      break;
    case ACTION_ADD_TEXT_FILTER:
      newState.filter[filterName].filterDataType = FILTER_DATA_TYPE_TEXT;
      newState.filter[filterName].filterType = action.filterType;
      newState.filter[filterName].value = action.value;
      break;
    case ACTION_ADD_DATE_FILTER:
      newState.filter[filterName].filterDataType = FILTER_DATA_TYPE_DATE;
      newState.filter[filterName].filterType = action.filterType;
      newState.filter[filterName].fromDateTime = action.fromDateTime;
      break;
    case ACTION_ADD_IN_FILTER:
      newState.filter[filterName].filterDataType = FILTER_DATA_TYPE_IN;
      newState.filter[filterName].values = action.values;
      break;
    case ACTION_ADD_LIST_FILTER:
      newState.filter[filterName].filterDataType = FILTER_DATA_TYPE_LIST;
      newState.filter[filterName].list = action.list;
      break;
    case ACTION_ADD_OPTION_ITEM:
      if (filterExists && state.filter[filterName].selectedOptions.find((optionItem: OptionItem) => optionItem.optionId == action.optionItem.optionId)) {
        return state;
      }

      newState.filter[filterName].filterDataType = FILTER_DATA_TYPE_OPTIONS;
      newState.filter[filterName].selectedOptions = filterExists ? [...state.filter[filterName].selectedOptions, action.optionItem] : [action.optionItem];
      break;
    case ACTION_SET_OPTION_ITEM:
      newState.filter[filterName].filterDataType = FILTER_DATA_TYPE_OPTION;
      newState.filter[filterName].selectedOption = action.optionItem;
      break;
    case ACTION_REMOVE_OPTION_ITEM:
      if (!('selectedOptions' in newState.filter[filterName])) {
        return state;
      }

      const currentOptions = newState.filter[filterName].selectedOptions.filter((optionItem: OptionItem) => optionItem.optionId != action.optionId);
      if (currentOptions.length === 0) {
        delete newState.filter[filterName];
      } else {
        newState.filter[filterName].selectedOptions = currentOptions;
      }
      break;
    case ACTION_REMOVE_FILTER:
      if (!(filterName in newState.filter)) {
        return state;
      }

      delete newState.filter[filterName];
      break;
    case ACTION_ADD_ENTITY_ITEM:
      const uniqueKeyAdd = action.entityItem.uniqueKey;
      if (filterExists && state.filter[filterName].entities.find((entityItem: EntityListItem) => entityItem.entityKey == action.entityItem.entityKey)) {
        return state;
      }
      newState.filter[filterName].filterDataType = FILTER_DATA_TYPE_REFERENCE;

      newState.filter[filterName].values = filterExists ? [...state.filter[filterName].values, uniqueKeyAdd] : [uniqueKeyAdd];
      newState.filter[filterName].entities = filterExists ? [...state.filter[filterName].entities, action.entityItem] : [action.entityItem];
      break;
    case ACTION_REMOVE_ENTITY_ITEM:
      if (!('entities' in newState.filter[filterName] && 'values' in newState.filter[action.filterName])) {
        return state;
      }

      const entityKeyRemove = action.entityItem.entityKey;
      const currentEntities = newState.filter[filterName].entities.filter((entityItem: EntityListItem) => entityItem.entityKey != entityKeyRemove);

      const uniqueKeyRemove = action.entityItem.uniqueKey;
      const currentValues = newState.filter[filterName].values.filter((value: string | number) => value != uniqueKeyRemove);

      if(currentEntities.length === 0) {
        delete newState.filter[filterName];
      } else {
        newState.filter[filterName].values = currentValues;
        newState.filter[filterName].entities = currentEntities;
      }
      break;
  }

  return newState;
}

function setDefaultMandatoryFilter(filterDataState, filterDefinitions) {
  {
    filterDefinitions.map((filterDefinition: SqlFilterDefinition) => {
      filterDataState = setFilter(filterDataState, filterDefinition);
    })
  }

  return filterDataState;
}

function setFilter(filterDataState, filterDefinition) {
  switch (filterDefinition.component) {
    case 'EntityReferenceFilter':
      break;
    case 'SelectFilter':
      if (filterDefinition.default_value == null) {
        return filterDataState;
      } else if (!Array.isArray(filterDefinition.default_value)) {
        filterDataState = changeFilter(filterDataState, getAddOptionAction(filterDefinition.possible_values, filterDefinition.default_value, filterDefinition.name))
      } else if (Array.isArray(filterDefinition.default_value)) {
        filterDefinition.default_value.map((value: any) => {
          if (Number.isInteger(value)) {
            value = value.toString(value);
          }
          filterDataState = changeFilter(filterDataState, getAddOptionAction(filterDefinition.possible_values, value, filterDefinition.name))
        });
      }
      break;
    case 'InFilter':
      break;
    case 'ListFilter':
      break;
    case 'CheckboxFilter':
      const checked = !!(filterDefinition.default_value || filterDefinition.mandatory);
      if (checked) {
        filterDataState = changeFilter(filterDataState, getAddCheckAction(filterDefinition.name, checked))
      }
      break;
    case 'DateTimeFilter':
      break;
    case 'UserFilter':
      break;
    case 'CommonTextFilter':
      break;
    case 'OptionsFilter':
      break;
  }

  return filterDataState;
}

export function buildFiltersForRequest(filterData: FilterData) {
  return Object.keys(filterData.filter).map((filterName: string) => {
    return {filterKey: filterName, filterValues: convertFilterData(filterData.filter[filterName])};
  })
}

function convertFilterData(data: FilterType) {
  switch (data.filterDataType) {
    case FILTER_DATA_TYPE_TEXT:
      return {
        filterType: data.filterType,
        value: data.value
      };
    case FILTER_DATA_TYPE_BOOLEAN:
      return data.value;
    case FILTER_DATA_TYPE_REFERENCE:
      return data.entities.map((entityItem: EntityListItem) => entityItem.uniqueKey);
    case FILTER_DATA_TYPE_DATE:
      return {
        filterType: data.filterType,
        fromDateTime: data.fromDateTime
      }
    case FILTER_DATA_TYPE_IN:
      return data.values;
    case FILTER_DATA_TYPE_LIST:
      return data.list;
    case FILTER_DATA_TYPE_OPTIONS:
      return data.selectedOptions.map((option: OptionItem) => option.optionId);
    case FILTER_DATA_TYPE_PAGINATION:
      return {
        upperBound: data.upperBound,
        lowerBound: data.lowerBound,
        page: data.page
      }
    case FILTER_DATA_TYPE_OPTION:
      return data.selectedOption;
  }
}

export function changePaginationHook(entityOverviewList: EntityList | undefined, filterDispatcher: Function, searchEntities: Function, nextPage: boolean = true) {
  if (entityOverviewList === undefined) {
    return;
  }

  let page = 1;
  let boundKey = '';
  let boundValue = 0;
  if (nextPage && entityOverviewList.upperBound > 0) {
    boundKey = 'upperBound';
    boundValue = entityOverviewList.upperBound;
    page = entityOverviewList.page + 1;
  } else if (!nextPage && entityOverviewList.lowerBound > 0) {
    boundKey = 'lowerBound';
    boundValue = entityOverviewList.lowerBound;
    page = entityOverviewList.page - 1;
  } else {
    filterDispatcher({
      type: ACTION_REMOVE_FILTER,
      filterName: 'pagination_filter'
    });
    return;
  }

  const action = {
    type: ACTION_ADD_PAGINATION_FILTER,
    filterName: 'pagination_filter',
    page: page
  };

  action[boundKey] = boundValue;

  filterDispatcher(action);

  searchEntities();
}