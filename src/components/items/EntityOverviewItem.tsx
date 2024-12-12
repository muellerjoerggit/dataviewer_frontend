import {EntityReferenceType, EntityReferenceItemData} from '@/features/property/propertyTypes.ts'
import {Table, TableBody, TableCell, TableHeader, TableRow} from "@/components/ui/table.tsx";
import EntityReference from "@/components/EntityReference.tsx";

type props = {
    propertyData: EntityReferenceItemData
}

export default function EntityOverviewItemComponent({propertyData}: props): JSX.Element {

  function buildHeader() {
    if (propertyData.entities.length === 0) {
      return;
    }

    const header = propertyData.entities[0].entityOverview.header;

    return (
      Object.keys(header).map((property: string) => (
        <TableCell key={property}>
          {header[property]}
        </TableCell>
      ))
    );

  }

  function buildRows(entityReference: EntityReferenceType) {
    return (
      Object.keys(entityReference.entityOverview.header).map((property: string) => (
        <TableCell key={property}>
          {entityReference.entityOverview.data[property]}
        </TableCell>
      ))
    )
  }

  return (
    <dd>
      <Table>
        <TableHeader>
          <TableRow>
            {buildHeader()}
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            propertyData.entities.map((entityReference: EntityReferenceType, index: number) => (
              <TableRow key={index}>
                <TableCell key={entityReference.entityKey}>
                  <EntityReference entityReference={entityReference} showEyeIcon={true}/>
                </TableCell>
                {buildRows(entityReference)}
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </dd>
  );
}