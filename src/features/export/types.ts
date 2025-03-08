
export type PathList = {
  [key: string]: ExportPathData
}

export type ExportPathData = {
  path: ExportPath,
  entityLabel: string,
  entityType: string,
  properties: ExportGroupList,
  references: ReferenceType[],
}

export type ExportGroupList = {
  [groupKey: string]: ExportGroup
}

export type ReferenceType = {
  entityType: string,
  entityLabel: string,
  property: string,
};

export type ExportGroup = PropertyType;

interface ExportGroupBase {
  key: string,
  label: string,
  description: string,
  groupExporterList: GroupExporterListType,
  defaultExporter: string,
}

export interface PropertyType extends ExportGroupBase {
  type: 1,
  properties: {
    property: string,
    cardinality: number,
  }
}

export type GroupExporterListType = {
  [name: string]: GroupExporter
}

export type GroupExporter = {
  name: string,
  label: string,
  description: string,
}

export type ExportPath = {
  targetEntityType: string,
  path: string[],
};

export type ExportEntityType = {
  entityLabel: string,
  entityType: string,
  groups: ExportGroup[],
  references: ReferenceType[],
}

export type ExportConfigList = {
  [path: string]: ExportConfig,
}

export type ExportConfig = {
  path: ExportPath,
  groups: {
    [uniqueKey: string]: ExportGroupConfig
  }
}

export type ExportGroupConfig = {
  type: number,
  groupKey: string,
  label: string,
  groupExporter: string,
}

export type ExportConfigActions = ActionAddProperty | ActionChangeGroupLabel | ActionChangeGroupExporter;

export type ActionAddProperty = {
  type: 1,
  path: ExportPath,
  groupExporter: string,
  propertyData: PropertyType,
}

export type ActionChangeGroupLabel = {
  type: 2,
  path: ExportPath,
  uniqueKey: string,
  label: string,
}

export type ActionChangeGroupExporter = {
  type: 3,
  path: ExportPath,
  uniqueKey: string,
  exporter: string,
}

export type ExportConfigDispatcher = (action: ExportConfigActions) => void;