import {FilterData} from "@/features/filter/filterTypes.ts";

export const ACTION_ADD_BOOLEAN_FILTER = 1;
export const ACTION_REMOVE_FILTER = 2;
export const ACTION_ADD_ENTITY_ITEM = 3;
export const ACTION_REMOVE_ENTITY_ITEM = 4;
export const ACTION_ADD_TEXT_FILTER = 5;
export const ACTION_ADD_DATE_FILTER = 6;
export const ACTION_ADD_IN_FILTER = 7;
export const ACTION_ADD_LIST_FILTER = 8;
export const ACTION_ADD_OPTION_ITEM = 9;
export const ACTION_REMOVE_OPTION_ITEM = 10;
export const ACTION_ADD_PAGINATION_FILTER = 11;
export const ACTION_SET_OPTION_ITEM = 12;

export const ACTION_SET_FILTER_DEFINITIONS = 30;
export const ACTION_RESET_ALL = 31;
export const ACTION_SET_DEFAULT_MANDATORY_FILTER = 32;
export const ACTION_SET_FILTER_OF_GROUP = 33;
export const ACTION_DELETE_FILTER_OF_GROUP = 34;
export const ACTION_RESET_FILTER = 35;

export const FILTER_DATA_TYPE_TEXT = 1;
export const FILTER_DATA_TYPE_BOOLEAN = 2;
export const FILTER_DATA_TYPE_REFERENCE = 3;
export const FILTER_DATA_TYPE_DATE = 4;
export const FILTER_DATA_TYPE_IN = 5;
export const FILTER_DATA_TYPE_LIST = 6;
export const FILTER_DATA_TYPE_OPTIONS = 7;
export const FILTER_DATA_TYPE_PAGINATION = 8;
export const FILTER_DATA_TYPE_OPTION = 9;

export const FILTER_SELECT = 'SelectFilter';
export const FILTER_IN = 'InFilter';
export const FILTER_LIST = 'ListFilter';
export const FILTER_CHECKBOX = 'CheckboxFilter';
export const FILTER_DATE_TIME = 'DateTimeFilter';
export const FILTER_TEXT = 'CommonTextFilter';
export const FILTER_OPTIONS = 'OptionsFilter';
export const FILTER_OPTION = 'SelectSingleFilter';
export const FILTER_ENTITY_REFERENCE = 'EntityReferenceFilter';

export const NO_FILTER = 'none';

export const WITHOUT_FILTER_GROUP = 'withoutGroup';

export const emptyFilterData: FilterData = {
  filter: {},
  filterDefinitions: {},
  filterGroups: [],
  groupFilterMapping: {},
  groupFilter: {}
}