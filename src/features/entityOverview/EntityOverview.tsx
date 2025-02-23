import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table.tsx";
import {EntityOverviewType} from "@/features/property/propertyTypes.ts";

type props = {
  entityOverview: EntityOverviewType
}

export default function EntityOverview({entityOverview}: props) {
  return (
    <Table className="w-fit">
      <TableBody>
        {
          Object.keys(entityOverview.header).map((header: string, index: number) => (
            <TableRow key={index}>
              <TableCell>{entityOverview.header[header]}</TableCell>
              <TableCell>{entityOverview.data[header]}</TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}