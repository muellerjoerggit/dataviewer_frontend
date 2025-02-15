import {TableCellScalar} from "@/features/report/reportTypes.ts";

export const ELEMENT_SECTION = 'section';
export const ELEMENT_INFO_TEXT = 'infotext';
export const ELEMENT_RESULT = 'resultList';
export const ELEMENT_TABLE = 'table';
export const ELEMENT_LIST_ORDERED = 'orderedList';
export const ELEMENT_LIST_UNORDERED = 'unorderedList';
export const ELEMENT_LIST_DESCRIPTION = 'descriptionList';
export const ELEMENT_PREFORMATTED = 'preformatted';
export const ELEMENT_CHART_BAR = 'barChart';

export const CELL_TYPE_SCALAR = 'scalar';
export const CELL_TYPE_RESULT = 'result';
export const CELL_TYPE_MODAL = 'modal';
export const CELL_TYPE_BADGE = 'badge';

export const RESULT_UNKNOWN = 1;
export const RESULT_SUCCESS = 2;
export const RESULT_FAILED = 3;

export const emptyScalarTableCell: TableCellScalar = {
  cellType: 'scalar',
  value: '',
}