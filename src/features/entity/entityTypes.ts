import {EntityOverviewType, Item} from '@/features/property/propertyTypes.ts'
import {LogLevels} from '@/features/logging/logTypes.ts'
import {SqlFilterDefinition} from "@/features/filter/filterTypes.ts";
import {EntityAction} from "@/features/entityAction/entityActionTypes.ts";
import {ExtOverviewEntity} from "@/features/extEntityOverview/extEntityOverviewTypes.ts";


export type EntityType = {
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
  lowerBound: number
}

export type EntityListItem = {
  entityLabel: string,
  entityKey: string,
  uniqueKey: string | number
}

export type Entity = {
  entityKey: string,
  label: string,
  entityOverview: EntityOverviewType,
  extEntityOverview: ExtOverviewEntity,
  properties: Array<Item>,
  logsByLevel: LogLevels,
  entityActions: Array<EntityAction>
}

export type EntityLoad = (entityKey: string) => void;

