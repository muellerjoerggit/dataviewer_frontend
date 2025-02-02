
export type ExportPathData = {
  path: ExportPath,
  entityLabel: string,
  entityType: string,
  properties: PropertyType[],
  references: ReferenceType[],
}

export type PathList = {
  [key: string]: ExportPathData
}

export type ReferenceType = {
  entityType: string,
  entityLabel: string,
  property: string,
};

export type PropertyType = {
  key: string,
  label: string,
  description: string,
  cardinality: number
}

export type ExportPath = {
  targetEntityType: string,
  path: string[],
};

export type ExportEntityType = {
  entityLabel: string,
  entityType: string,
  properties: PropertyType[],
  references: ReferenceType[],
}

export type ExportConfigActions = ACTION_ADD_PROPERTY | ACTION_CHANGE_PROPERTY_LABEL;

export type ACTION_ADD_PROPERTY = {
  type: 1,
  path: ExportPath,
  propertyData: PropertyType,
}

export type ACTION_CHANGE_PROPERTY_LABEL = {
  type: 2,
  path: ExportPath,
  uniqueKey: string,
  label: string,
}

export type ExportConfigDispatcher = (action: ExportConfigActions) => void;