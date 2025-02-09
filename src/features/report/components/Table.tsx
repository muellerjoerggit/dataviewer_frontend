import {TableElement, TableRowType} from "@/features/report/reportTypes.ts";
import TableHeader from "@/features/report/components/TableHeader.tsx";
import TableRow from "@/features/report/components/TableRow.tsx";

type Props = {
  element: TableElement
}

export default function Table({element}: Props) {

  function buildTable() {
    if (element.rows.length === 0 || Object.keys(element.header).length === 0) {
      return <p>{element.emptyResult}</p>
    }

    return (
      <div className="relative overflow-x-auto pb-4">
        <table className="w-fit text-sm text-left rtl:text-right">
          <thead className="text-xs text-gray-900 uppercase">
          <tr>
            <TableHeader table={element} />
          </tr>
          </thead>
          <tbody>
            {buildTableBody()}
          </tbody>
        </table>
      </div>
    )
  }

  function buildTableBody() {
    return (
      element.rows.map((row: TableRowType, index) => (
          <tr
            className={'bg-white dark:bg-gray-800 hover:bg-gray-200' + (element.firstColumnSticky && index === 0 ? ' sticky left-0' : '')}
            key={index}>
            <TableRow headerList={element.header} row={row} firstColumnSticky={element.firstColumnSticky} />
          </tr>
        )
      )
    );
  }

  return buildTable();
}