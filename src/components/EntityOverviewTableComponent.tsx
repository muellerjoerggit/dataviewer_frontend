import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table.tsx";
import {EntityOverviewType} from "@/features/property/propertyTypes.ts";

type props = {
  overviewData?: EntityOverviewType
}

export default function EntityOverviewTableComponent({
                                                       overviewData: overviewData
                                                     }: props) {

  function renderOverviewEntityOverview() {
    if (overviewData === undefined) return;

    let headerKeys: string[] = [];
    if (typeof overviewData === 'object' && "header" in overviewData && typeof overviewData.header === 'object') {
      headerKeys = Object.keys(overviewData.header);
    } else {
      return
    }

    if (headerKeys.length === 0) {
      return
    } else if (typeof overviewData === 'object') {
      return (
        <Table className="w-fit">
          <TableBody>
            {
              headerKeys.map((header: string, index: number) => (
                <TableRow key={index}>
                  <TableCell>{overviewData.header[header]}</TableCell>
                  <TableCell>{overviewData.data[header]}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      )
    }
  }

  return (
    <>
      {renderOverviewEntityOverview()}
    </>
  )
}