import {emptyLogLevels} from '@/features/logging/logConstants.ts';
import {Entity, EntityList, EntityType} from './entityTypes.ts';

export const NULL_ENTITY = 'NullEntity';

export const emptyEntity: Entity = {
  entityKey: '',
  label: '',
  entityOverview: {
    header: {},
    data: {}
  },
  extOverview: {
    header: {},
    data: {}
  },
  properties: [],
  logsByLevel: emptyLogLevels,
  entityActions: []
}

export const emptyEntityType: EntityType = {
  type: '',
  label: '',
  description: '',
  filterDefinitions: [],
  filterGroups: [],
  groupFilterMapping: []
}

export const emptyEntityList: EntityList = {
  entities: [],
  entityCount: 0,
  upperBound: 0,
  lowerBound: 0
}