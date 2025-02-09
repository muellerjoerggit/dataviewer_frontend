import {TableElement} from "@/features/report/reportTypes.ts";

type Props = {
  table: TableElement
}

export default function TableHeader({table}: Props) {

  return (
    Object.keys(table.header).map((column: string, index) => (
        <th className={'px-6 py-3 bg-white' + (table.firstColumnSticky && index === 0 ? ' sticky left-0' : '')}
            key={column}>{table.header[column].label}</th>
      )
    )
  );
}