import {HtmlData, HtmlItemData} from '@/features/property/propertyTypes.ts'
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

type props = {
  propertyData: HtmlItemData,
  lengthOutput?: number
}

export default function HtmlItem({propertyData, lengthOutput = 600}: props): JSX.Element {
  return (
    <>
      {
        (
          propertyData.html.map((htmlData: HtmlData, vindex: number) => (
            <dd key={vindex}>
              {htmlData.html_raw.length > lengthOutput ? htmlData.html_raw.slice(0, lengthOutput) + '...' : htmlData.html_sanitized}
              <br/>
              <Dialog>
                <DialogTrigger className="hover:underline hover:cursor-pointer mt-1">Mehr anzeigen</DialogTrigger>
                <DialogContent className="max-w-4xl md:max-w-xl">
                  <DialogHeader>
                    <DialogTitle>Html</DialogTitle>
                  </DialogHeader>
                  <Tabs defaultValue="formatted">
                    <TabsList>
                      <TabsTrigger value="formatted">formatierter Html</TabsTrigger>
                      <TabsTrigger value="raw">roher Html</TabsTrigger>
                    </TabsList>
                    <TabsContent value="formatted">
                      <ScrollArea className="h-192 lg:h-128 md:h-96 sm:h-64">
                        <div dangerouslySetInnerHTML={{__html: htmlData.html_sanitized}}/>
                      </ScrollArea>
                    </TabsContent>
                    <TabsContent value="raw">
                      <ScrollArea className="h-192 lg:h-128 md:h-96 sm:h-64">
                        <pre className="text-wrap">{htmlData.html_raw}</pre>
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            </dd>
          ))
        )
      }
    </>
  );
}