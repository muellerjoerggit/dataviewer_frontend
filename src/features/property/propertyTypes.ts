import {ItemDocumentation} from '@/features/property/documentationTypes.ts'

export interface Item {
  component: string,
  documentation: ItemDocumentation,
  name: string,
  data: any
}

export interface CommonItem extends Item {
  data: CommonItemData,
}

export type CommonItemData = {
  values: Array<string | number>,
  isNull: boolean,
  criticalError: boolean,
  warningError: boolean,
}

export type ColorItemData = {
  values: Array<string>,
  isNull: boolean,
  criticalError: boolean,
  warningError: boolean,
}

export type ParentItemData = {
  values: Array<string | number>,
  isNull: boolean,
  criticalError: boolean,
  warningError: boolean,
}

export interface EntityReferenceItem extends Item {
  data: EntityReferenceItemData,
}

export interface EntityReferenceItemData {
  entities: Array<EntityReferenceType>,
  isNull: boolean,
  criticalError: boolean,
  warningError: boolean,
}

export interface EntityReferenceType {
  label: string,
  entityOverview: EntityOverviewType,
  entityKey: string,
  url: string
}

export type EntityOverviewType = {
  header: Header,
  data: Row
}

export type Row = {
  [key: string]: string | number;
}

export type Header = {
  [key: string]: string;
}

export interface TableItem extends Item {
  data: TableItemData,
}

export interface TableItemData {
  header: Header,
  tableRows: Array<Row>,
  isNull: boolean,
  criticalError: boolean,
  warningError: boolean,
}

export interface JsonItem extends Item {
  data: JsonItemData,
}

export interface JsonItemData {
  values: Array<string>,
  isNull: boolean,
  criticalError: boolean,
  warningError: boolean,
}

export interface HtmlItem extends Item {
  data: HtmlItemData,
}

export interface HtmlItemData {
  html: Array<HtmlData>,
  isNull: boolean,
  criticalError: boolean,
  warningError: boolean,
}

export interface HtmlData {
  html_sanitized: string,
  html_raw: string
}