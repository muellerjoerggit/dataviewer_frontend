import {EntityListItem} from "@/features/entity/entityTypes.ts";

export const ACTION_ADD_BOOLEAN_FILTER = 1;
export const ACTION_REMOVE_FILTER = 2;
export const ACTION_ADD_IN_FILTER = 7;
export const ACTION_ADD_LIST_FILTER = 8;

export const ACTION_SET_FILTER_DEFINITIONS = 30;

export const FILTER_DATA_TYPE_REFERENCE = 3;


// #############################################################
// ######################### Filter Data #######################
// #############################################################

export type FilterData = {
  filter: {
    [key: string]: FilterType
  },
  filterDefinitions: {
    [key: string]: SqlFilterDefinition
  },
  filterGroups: Array<FilterGroupType>,
  groupFilterMapping: {
    [key: string]: Array<string>
  },
  groupFilter: {
    [key: string]: string
  },
}

export type FilterType =
  FilterText
  | FilterBoolean
  | FilterEntityReferences
  | FilterDate
  | FilterIn
  | FilterList
  | FilterOptions
  | FilterPagination
  | FilterOption;

export type FilterText = {
  filterDataType: 1, // FILTER_DATA_TYPE_TEXT
  filterType: string,
  value: string
};

export type FilterBoolean = {
  filterDataType: 2, // FILTER_DATA_TYPE_BOOLEAN
  value: boolean
};

export type FilterEntityReferences = {
  filterDataType: 3, // FILTER_DATA_TYPE_REFERENCE
  values: Array<string | number>,
  entities: Array<EntityListItem>
};

export type FilterDate = {
  filterDataType: 4, // FILTER_DATA_TYPE_DATE
  filterType: string,
  fromDateTime: Date
};

export type FilterIn = {
  filterDataType: 5, // FILTER_DATA_TYPE_IN
  values: Array<string | number>
};

export type FilterList = {
  filterDataType: 6, // FILTER_DATA_TYPE_LIST
  list: string
};

export type FilterOptions = {
  filterDataType: 7, // FILTER_DATA_TYPE_OPTIONS
  selectedOptions: Array<OptionItem>
};

export type OptionItem = {
  optionId: number | string,
  label: string,
  description: string
}

export type FilterPagination = {
  filterDataType: 8, // FILTER_DATA_TYPE_PAGINATION
  upperBound: number,
  lowerBound: number,
  page: number
};

export type FilterOption = {
  filterDataType: 9, // FILTER_DATA_TYPE_OPTION
  selectedOption: OptionItem
};


// #############################################################
// ######################### Filter Definition #################
// #############################################################

export type FilterGroupType = {
  groupKey: string,
  title: string,
  description: string
}

export type SqlFilterDefinition = SqlFilterDefinitionReference | SqlFilterDefinitionOptions | SqlFilterDefinitionBase;

export type SqlFilterDefinitionBase = {
  component: 'InFilter' | 'ListFilter' | 'CheckboxFilter' | 'DateTimeFilter' | 'CommonTextFilter',
  filterKey: string,
  title: string,
  description: string,
  mandatory: boolean,
  defaultValue: any,
  additional: []
}

export type SqlFilterDefinitionReference = {
  component: 'EntityReferenceFilter',
  filterKey: string,
  title: string,
  description: string,
  mandatory: boolean,
  defaultValue: any,
  additional: {
    uniqueProperty: string,
    entityType: string,
    entityTypeLabel: string
  }
}

export type SqlFilterDefinitionOptions = {
  component: 'SelectFilter' | 'OptionsFilter' | 'SelectSingleFilter',
  filterKey: string,
  title: string,
  description: string,
  mandatory: boolean,
  defaultValue: any,
  additional: {
    possibleValues: Array<OptionItem>
  }
}

export const emptyFilterData = {
  filter: {},
  filterDefinitions: []
}