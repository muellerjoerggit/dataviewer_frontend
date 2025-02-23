import { cn } from '@/lib/utils'
import { CommonLogItemData } from '@/features/logging/logTypes.ts'
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Badge} from "@/components/ui/badge.tsx";

export default function CommonLogItemComponent({logData, className}: {logData: CommonLogItemData, className?: string | undefined}) : JSX.Element {

    function buildLevelBadge(level: string) {
        switch (level) {
            case 'info':
            case 'debug':
                return ( <Badge className="ml-2" variant="outline">{level}</Badge> )
            case 'warning':
            case 'notice':
                return ( <Badge className="ml-2 bg-yellow-400 text-foreground">{level}</Badge> )
            case 'error':
            case 'critical':
                return ( <Badge className="ml-2 bg-red-700">{level}</Badge> )
        }
    }

    function buildLogData(rawLogs: Array<string>) {
        if(rawLogs.length === 0 ) {
            return
        }

        return (
            <>
                <dt>Logdaten</dt>
                <dd>
                    <Dialog>
                        <DialogTrigger className="hover:underline hover:cursor-pointer mt-1">Logdaten anzeigen</DialogTrigger>
                        <DialogContent className="max-w-4xl md:max-w-xl">
                            <DialogHeader>
                                <DialogTitle>Logdaten</DialogTitle>
                            </DialogHeader>
                            <ScrollArea className="h-192 lg:h-128 md:h-96 sm:h-64">
                                {
                                    rawLogs.map((rawLog: string, rLindex: number) => (
                                        <pre key={rLindex} className="text-wrap">{ rawLog }</pre>
                                    ))
                                }
                            </ScrollArea>
                        </DialogContent>
                    </Dialog>
                </dd>
            </>
        )
    }

    function buildMessage(message: string) {
        if(message.length === 0) {
            return
        }

        return (
            <>
                <dt>Nachricht</dt>
                <dd>{message}</dd>
            </>
        )
    }

    function buildLogs(logItemData: CommonLogItemData) {
        return (
            <>
                <dt>Titel</dt>
                <dd>{logItemData.title}</dd>
                {buildMessage(logItemData.message)}
                {buildLogData(logItemData.rawLogs)}
                <dt>Uhrzeit</dt>
                <dd>{logItemData.dateTime}</dd>
                <dt>Log-Level</dt>
                <dd>{buildLevelBadge(logItemData.level)}</dd>
            </>
        )
    }

    return (
        <div className="mt-4">
            <dl className={cn("grid grid-cols-[30%_70%]", className)}>
                {buildLogs(logData)}
            </dl>
        </div>
    );
}