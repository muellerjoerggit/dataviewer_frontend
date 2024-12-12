import {Row, TableItemData} from '@/features/property/propertyTypes.ts'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"

type props = {
  propertyData: TableItemData
}

export default function TableItemComponent({propertyData}: props): JSX.Element {

  function buildTable() {
    if (propertyData.tableRows.length === 0) {
      return <></>
    }

    const headerKeys: string[] = Object.keys(propertyData.header);

    return (
      <Table className="w-fit">
        <TableHeader>
          <TableRow>
            {
              headerKeys.map((header: string, index: number) => (
                <TableHead key={index}>{propertyData.header[header]}</TableHead>
              ))
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            propertyData.tableRows.map((row: Row, rowIndex: number) => (
              <TableRow key={rowIndex}>
                {
                  headerKeys.map((header: string, columIndex: number) => (
                    <TableCell key={columIndex}>{row[header]}</TableCell>
                  ))
                }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    )
  }

  return buildTable();
}