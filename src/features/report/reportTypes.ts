export type ReportType = {
  tableOfContent: boolean,
  body: SectionElement[],
  header: {
    headline: string,
    description: string,
  }
}

export type ReportElement = InfoTextElement | ResultListElement | TableElement | UnorderedListElement | OrderedListElement | DescriptionListElement | PreformattedElement;

export type SectionElement = {
  type: 'section',
  headline: string,
  anker: string,
  variant: string,
  children: ReportElement[],
};

export type InfoTextElement = {
  type: 'infotext',
  message: string,
};

export type ResultListElement = {
  type: 'resultList',
  items: ReportResultItem[],
};

export type ReportResultItem = {
  itemType: 'result',
  result: number,
  description: string,
  resultTooltip: string,
  termTooltip: string,
  term: string,
};

export type TableElement = {
  type: 'table',
  header: TableHeaderList,
  rows: [],
  emptyResult: string,
  firstColumnSticky: boolean,
};

export type UnorderedListElement = {
  type: 'unorderedList',
  items: string[],
}

export type OrderedListElement = {
  type: 'orderedList',
  items: string[],
}

export type DescriptionListElement = {
  type: 'descriptionList',
  items: DescriptionItem[],
}

export type DescriptionItem = {
  itemType: 'description',
  term: string,
  messages: string[],
}

export type PreformattedElement = {
  type: 'preformatted',
  text: string,
}

export type TableHeaderList = {
  [key: string]: TableHeaderColumn,
};

export type TableHeaderColumn = TableHeaderDefault;

export type TableHeaderDefault = {
  headerType: 'default',
  key: string,
  label: string,
};

export type TableRowType = {
  [key: string]: TableCell,
};

export type TableCell = TableCellScalar | TableCellBadge | TableCellResult | TableCellModal;

export type TableCellScalar = {
  cellType: 'scalar',
  value: string | number,
};

export type TableCellResult = {
  cellType: 'result',
  result: ReportResultItem,
};

export type TableCellBadge = {
  cellType: 'badge',
  badge: ReportBadgeItem,
};

export type TableCellModal = {
  cellType: 'modal',
  modal: ReportModalItem,
};

export type ReportBadgeItem = {
  itemType: 'badge',
  text: string,
  variant: 'default' | 'secondary' | 'destructive' | 'outline',
}

export type ReportModalItem = {
  itemType: 'modal',
  buttonTitle: string,
  modalTitle: string,
  data: Array<InfoTextElement | TableElement>
}



