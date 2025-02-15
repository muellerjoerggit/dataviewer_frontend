import {
  ELEMENT_LIST_DESCRIPTION,
  ELEMENT_INFO_TEXT,
  ELEMENT_LIST_ORDERED, ELEMENT_PREFORMATTED,
  ELEMENT_RESULT,
  ELEMENT_TABLE, ELEMENT_LIST_UNORDERED, ELEMENT_CHART_BAR
} from "@/features/report/reportConstants.ts";
import InfoText from "@/features/report/components/InfoText.tsx";
import Table from "@/features/report/components/Table.tsx";
import {ReportElement} from "@/features/report/reportTypes.ts";
import ResultList from "@/features/report/components/list/ResultList.tsx";
import {PreformattedText} from "@/features/report/components/element/PreformattedText.tsx";
import DescriptionList from "@/features/report/components/list/DescriptionList.tsx";
import UnorderedList from "@/features/report/components/list/UnorderedList.tsx";
import OrderedList from "@/features/report/components/list/OrderedList.tsx";
import {ReportBarChart} from "@/features/report/components/chart/ReportBarChart.tsx";

type Props = {
  elements: ReportElement[];
}

export function ReportElementWrapper({elements}: Props): JSX.Element {

  function buildReportBodyElement(element: ReportElement, index: number) {
    switch (element.type) {
      // case 'element':
      //   return (
      //     <dl className="grid grid-cols-[30%_70%]">
      //       <dt>{element.term}</dt>
      //       <div>
      //         { element.messages.map((message: string, index: number) => <dd>{message}</dd>) }
      //       </div>
      //     </dl>
      //   )
      case ELEMENT_INFO_TEXT:
        return <InfoText key={index} element={element} />
      case ELEMENT_RESULT:
        return <ResultList key={index} element={element} />
      case ELEMENT_TABLE:
        return <Table key={index} element={element} />
      case ELEMENT_LIST_ORDERED:
        return <OrderedList key={index} element={element} />
      case ELEMENT_LIST_UNORDERED:
        return <UnorderedList key={index} element={element} />
      case ELEMENT_LIST_DESCRIPTION:
        return <DescriptionList key={index} element={element} />
      case ELEMENT_PREFORMATTED:
        return <PreformattedText key={index} element={element} />
      case ELEMENT_CHART_BAR:
        return <ReportBarChart key={index} element={element} />
      default:
        return <></>;
    }
  }

  return (
    <div className="ml-6">
      {
        elements.map((element: ReportElement, index: number) => {
          return (
            <div className="mt-2">
              {buildReportBodyElement(element, index)}
            </div>
          )}
      )}
    </div>
  )
}