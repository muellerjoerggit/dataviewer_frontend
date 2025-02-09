import {TableCell, TableHeaderList, TableRowType} from "@/features/report/reportTypes.ts";
import {
  CELL_TYPE_BADGE, CELL_TYPE_MODAL,
  CELL_TYPE_RESULT,
  CELL_TYPE_SCALAR,
  emptyScalarTableCell
} from "@/features/report/reportConstants.ts";
import ModalItem from "@/features/report/components/item/ModalItem.tsx";
import ResultItem from "@/features/report/components/item/ResultItem.tsx";
import {BadgeItem} from "@/features/report/components/item/BadgeItem.tsx";

type Props = {
  headerList: TableHeaderList,
  row: TableRowType,
  firstColumnSticky: boolean,
}

export default function TableRow({headerList, row, firstColumnSticky}: Props) {

  function buildCell(cell: TableCell) {
    switch (cell.cellType) {
      case CELL_TYPE_SCALAR:
        return <span>{cell.value}</span>
      case CELL_TYPE_RESULT:
        return <ResultItem item={cell.result} />
      case CELL_TYPE_MODAL:
        return <ModalItem item={cell.modal} />
      case CELL_TYPE_BADGE:
        return <BadgeItem item={cell.badge} />
    }
  }

  return (
    Object.keys(headerList).map((columnKey: string, index: number) => {
      const cell: TableCell = row[columnKey] ?? emptyScalarTableCell;

      return (
        <td className={'px-6 py-1 text-nowrap bg-white' + (firstColumnSticky && index === 0 ? ' sticky left-0' : '')} key={columnKey}>
          {buildCell(cell)}
        </td>
      );
    })
  )
}