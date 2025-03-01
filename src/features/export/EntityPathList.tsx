import {ExportPath, ExportPathData, PathList} from "@/features/export/types.ts";
import GroupList from "@/features/export/GroupList.tsx";
import ReferenceList from "@/features/export/ReferenceList.tsx";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";

type Props = {
  entityPathList: PathList,
  exportConfigDispatcher: (action: any) => void,
  addExportEntity: (exportPath: ExportPath) => void,
}

export default function EntityPathList({entityPathList, exportConfigDispatcher, addExportEntity}: Props) {

  function buildPropertyList(exportPathData: ExportPathData) {
    return (
      <Accordion type="single" collapsible className="ml-4">
        <AccordionItem value="item-1" className="border-0">
          <AccordionTrigger className="justify-start" chevronStart={true} chevronEnd={false}><h2 className="ml-2">Felder</h2></AccordionTrigger>
          <AccordionContent>
            <GroupList groups={exportPathData.properties} path={exportPathData.path} exportConfigDispatcher={exportConfigDispatcher}/>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }

  function buildReferenceList(exportPathData: ExportPathData) {
    if(exportPathData.references.length === 0) {
      return;
    }

    return (
      <Accordion type="single" collapsible className="ml-4">
        <AccordionItem value="item-1" className="border-0">
          <AccordionTrigger className="justify-start" chevronStart={true} chevronEnd={false}><h2 className="ml-2">Referenzen</h2></AccordionTrigger>
          <AccordionContent>
            <ReferenceList exportPathData={exportPathData} addExportEntity={addExportEntity}/>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }

  return (
    <div>
      {
        Object.keys(entityPathList).map((pathKey: string) => {
          const exportPathData = entityPathList[pathKey];
          return (
            <div key={pathKey}>
              {exportPathData.entityLabel}
              {buildPropertyList(exportPathData)}
              {buildReferenceList(exportPathData)}
            </div>
          )
        })
      }
    </div>
  )
}