import {ReportType, SectionElement} from "@/features/report/reportTypes.ts";
import Section from "@/features/report/components/Section.tsx";
import {ReportElementWrapper} from "@/features/report/components/ReportElementWrapper.tsx";
import {ELEMENT_SECTION} from "@/features/report/reportConstants.ts";

type Props = {
  report: ReportType
  key: number
}

export default function Report({report, key}: Props ): JSX.Element {

  function buildReport() {
    return (
      <div className="ml-2 mt-2">
        {report.body.map((section: SectionElement, index: number) => {
          if(section?.type === undefined || section.type !== ELEMENT_SECTION) {
            return;
          }

          return (
            <>
              <div className="mt-6">
                <Section key={index} element={section} />
              </div>
              <div className="mt-6">
                {buildReportSections(section)}
              </div>
            </>
          )}
        )}
      </div>
    )
  }

  function buildReportSections(section: SectionElement) {
    return (
      <div className="ml-6">
        <ReportElementWrapper elements={section.children}/>
      </div>
    )
  }

  function buildTableOfContent() {
    if (!report.tableOfContent) return;

    return (
      <div className="ml-2 mt-4">
        <h3 className="mb-4 text-lg font-semibold leading-none tracking-tight">Inhaltverzeichnis</h3>
        <ul className="ml-6">
          {report.body.map((section: SectionElement, index: number) => (
            <li className={section.type === 'section' ? 'list-disc' : ''} key={index}><a
              className={section.type === 'section' ? '' : 'ml-4'} href={'#' + section.anker}>{section.headline}</a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="mt-4" key={key}>
      <h2 className="mb-4 text-xl font-semibold leading-none tracking-tight">{report.header.headline}</h2>
      <p className="ml-2">{report.header.description}</p>
      {buildTableOfContent()}
      {buildReport()}
    </div>
  )

}