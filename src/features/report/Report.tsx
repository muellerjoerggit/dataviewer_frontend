// @ts-nocheck
import {Report, ReportBodySection, ReportBodySubSection, ReportElement} from "@/types/report-interfaces.ts";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

export default function ReportComponent(
    {
        report,
        key,
        className
    }: {
        report: Report
        key: number
        className?: string | undefined
    }) : JSX.Element {

    function resultIcon(icon: number) {
        switch (icon) {
            case 1:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-6 text-yellow-400">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"/>
                    </svg>
                );
            case 2:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-6 text-lime-700">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                );
            case 3:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-6 text-red-700">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                );
        }
    }

    function buildHeader(header, firstColumnSticky) {
        return (
            Object.keys(header).map((column: string, index) => (
                <th className={'px-6 py-3 bg-white' + (firstColumnSticky && index === 0 ? ' sticky left-0' : '')}  key={index}>{header[column]}</th>
                )
            )
        );
    }

    function buildTableBody(element) {
        const table = element.table;
        const header = element.header;
        return (
            table.map((row, index) => (
                    <tr className={'bg-white dark:bg-gray-800 hover:bg-gray-200' + (element.firstColumnSticky && index === 0 ? ' sticky left-0' : '') + (element.noWrap ? ' text-nowrap' : '')} key={index}>
                        {buildTableRow(row, element, header)}
                    </tr>
                )
            )
        );
    }

    function buildTableRow(row, element, header) {
        return (
            Object.keys(header).map((column: string, index) => {
                    if(element.modalColumns.length > 0 && element.modalColumns.includes(column)) {
                        return (
                            <td className="px-6 py-1" key={index}>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="ml-2" variant="outline">{element.titleModalButton}</Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-4xl ml-24 mr-24">
                                        <DialogHeader>
                                            <DialogTitle>{element.modalTitle}</DialogTitle>
                                        </DialogHeader>
                                            <ScrollArea className="h-192 lg:h-128 md:h-96 sm:h-64">
                                                <pre>{row[column]}</pre>
                                            </ScrollArea>
                                        <DialogFooter className="sm:justify-start">
                                            <DialogClose asChild>
                                                <Button type="button" variant="secondary">
                                                    Schließen
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </td>
                        );
                    }

                if(element.iconColumns.length > 0 && element.iconColumns.includes(column)) {
                    return (
                        <td className="px-6 py-1" key={index}>
                            {buildReportBodyElements(row[column])}
                        </td>
                    );
                }

                    return (<td className={'px-6 py-1 text-nowrap bg-white' + (element.firstColumnSticky && index === 0 ? ' sticky left-0' : '') + (element.noWrap ? ' text-nowrap' : '')} key={index}>{row[column]}</td>);
                }
            )
        );
    }

    function buildTable(element) {
        if(element.table.length === 0) {
            return <p>{element.emptyResult}</p>
        }

        return (
            <div className="relative overflow-x-auto pb-4">
                <table className="w-fit text-sm text-left rtl:text-right">
                    <thead className="text-xs text-gray-900 uppercase">
                    <tr>
                        {buildHeader(element.header, element.firstColumnSticky)}
                    </tr>
                    </thead>
                    <tbody>
                        {buildTableBody(element)}
                    </tbody>
                </table>
            </div>
        )
    }

    function buildReportBodyElements(element: ReportElement) {
        switch (element.type) {
            case 'section':
                return (
                    <h2 id={element.anker} className="mb-4 text-lg font-semibold leading-none tracking-tight">{element.headline}</h2>
                )
            case 'subsection':
                return (
                    <h4 id={element.anker} className="mb-4 ml-2 text-md font-semibold leading-none tracking-tight">{element.headline}</h4>
                )
            case 'element':
                return (
                    <dl className="grid grid-cols-[30%_70%]">
                        <dt>{element.term}</dt>
                        <div>
                            {
                                element.messages.map((message: string, index: number) => {
                                    return (<dd>{message}</dd>);
                                })
                            }
                        </div>
                    </dl>
                )
            case 'infotext':
                return (
                    <p>{element.message}</p>
                )
            case 'result':
                return (
                    <dl className="grid grid-cols-[30%_70%]">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <dt>{element.term}</dt>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{element.termTooltip}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div>
                                        <dd>{resultIcon(element.result)}</dd>
                                        <dd>{element.description}</dd>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{element.resultTooltip}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </dl>
                )
            case 'table':
                return buildTable(element);
            default:
                return;
        }
    }

    function buildReport() {
        return (
            <div className="ml-2 mt-2">
                {report.body.map((section: ReportBodySubSection | ReportBodySection, index: number) => (
                    <>
                        <div className="mt-6">
                            {buildReportBodyElements(section)}
                        </div>
                        <div className="mt-6">
                            {buildReportSections(section)}
                        </div>
                    </>
                 )
            )}
            </div>
        )
    }

    function buildReportSections(section: ReportBodySubSection | ReportBodySection) {
        return (
            <div className="ml-6">
                {section.children.map((element: ReportElement, index: number) => (
                        <div className="mt-2">
                            {buildReportBodyElements(element)}
                        </div>
                    )
                )}
            </div>
        )
    }

    function buildTableOfContent() {
        if(!report.tableOfContent) return;

        return (
            <div className="ml-2 mt-4">
                <h3 className="mb-4 text-lg font-semibold leading-none tracking-tight">Inhaltverzeichnis</h3>
                <ul className="ml-6">
                    {report.body.map((section: ReportBodySubSection | ReportBodySection, index: number) => (
                        <li className={section.type === 'section' ? 'list-disc' : '' } key={index}><a className={section.type === 'section' ? '' : 'ml-4' } href={'#' + section.anker}>{section.headline}</a></li>
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