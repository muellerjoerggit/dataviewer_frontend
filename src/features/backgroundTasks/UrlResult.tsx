import {Url, UrlResultType} from "@/features/backgroundTasks/backgroundTaskTypes.ts";
import {cn} from "@/lib/utils.ts";

type Props = {
    urlResult: UrlResultType,
    className?: string
}

export default function UrlResult({
    urlResult: urlResult,
    className: className
}: Props) {

    return (
        <div className={cn("", className)}>
            <p>Dateien können heruntergeladen werden:</p>
            <ul className="ml-4">
                {
                    urlResult.urls.map((url: Url, index: number) => {
                        return <li key={index}><a href={url.url} target="_blank">{url.label}</a></li>
                    })
                }
            </ul>
        </div>
    )
}