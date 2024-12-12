import {EntityOverviewType, Item} from '@/features/property/propertyTypes.ts'
import {LogLevels} from '@/features/logging/logTypes.ts'
import {SqlFilterDefinition} from "@/features/filter/filterTypes.ts";


export interface EntityType {
  type: string,
  label: string,
  description: string,
  filterDefinitions: Array<SqlFilterDefinition>,
  filterGroups: [],
  groupFilterMapping: []
}

export type EntityList = {
  entities: Array<EntityListItem>,
  entityCount: number,
  upperBound: number,
  lowerBound: number,
  page: number
}

export interface EntityListItem {
  entityLabel: string,
  entityKey: string,
  uniqueKey: string | number
}

export interface Entity {
  entityKey: string,
  label: string,
  summary_entity: string,
  entityOverview: EntityOverviewType,
  properties: Array<Item>,
  references: [],
  logsByLevel: LogLevels,
  entityActions: Array<EntityAction>
}

export interface EntityAction {
  component: string,
  entityType: string,
  entityAction: string,
  data: any
}