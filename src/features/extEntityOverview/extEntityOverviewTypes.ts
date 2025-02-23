import {EntityOverviewType} from "@/features/property/propertyTypes.ts";

export type ExtOverviewList = {
  entities: ExtOverviewRows,
  entityCount: number,
  upperBound: number,
  lowerBound: number
}

export type ExtOverviewRows = {
  [entityKey: string]: ExtOverviewRow
}

export type ExtOverviewRow = {
  extOverview: ExtOverviewEntity,
  entityKey: string,
  entityLabel: string,
}

export type ExtOverviewEntity = {
  header: {
    [headerKey: string]: string
  },
  data: {
    [propertyKey: string]: ExtEntityOverviewItem;
  }
}

export type ExtEntityOverviewItem = ExtOverviewItemAdditional | ExtOverviewItemScalar | ExtOverviewItemReference | ExtOverviewItemJson | ExtOverviewItemHtml | ExtOverviewItemValidation;

export type ExtOverviewItemScalar = {
  type: 1,
  data: {
    text: string,
  },
}

export type ExtOverviewItemReference = {
  type: 2,
  data: {
    entityKey: string,
    label: string,
    entityOverview: EntityOverviewType,
  },
}

export type ExtOverviewItemHtml = {
  type: 3,
  data: {
    rawHtml: string,
    sanitizedHtml: string,
    text: string,
  },
}

export type ExtOverviewItemJson = {
  type: 4,
  data: {
    json: string,
  }
}

export type ExtOverviewItemValidation = {
  type: 5,
  data: {
    red: number,
    yellow: number,
  }
}

export type ExtOverviewItemAdditional = {
  type: 6,
  data: {
    text: string,
    additional: string,
  }
}

export type ExtEntityOverviewMap = Map<string, ExtOverviewRow>;