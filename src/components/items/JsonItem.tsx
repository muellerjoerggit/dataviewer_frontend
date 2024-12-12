import {JsonItemData} from '@/features/property/propertyTypes.ts'
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

type props = {
  propertyData: JsonItemData,
  lengthOutput?: number
}

export default function JsonItemComponent({propertyData, lengthOutput = 600}: props ): JSX.Element {
  return (
    <>
      {
        propertyData.values.map((value: string, index: number) => (
          <dd key={index}>
            {value.length > lengthOutput ? value.slice(0, lengthOutput) + '...' : value}
            <br/>
            <Dialog>
              <DialogTrigger className="hover:underline hover:cursor-pointer mt-1">Mehr anzeigen</DialogTrigger>
              <DialogContent className="max-w-4xl md:max-w-xl">
                <DialogHeader>
                  <DialogTitle>JSON</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="formatted">
                  <TabsList>
                    <TabsTrigger value="formatted">formatierter JSON</TabsTrigger>
                    <TabsTrigger value="raw">roher JSON</TabsTrigger>
                  </TabsList>
                  <TabsContent value="formatted">
                    <ScrollArea className="h-192 lg:h-128 md:h-96 sm:h-64">
                      <pre className="text-wrap">{beautifyJson(value)}</pre>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="raw">
                    <ScrollArea className="h-192 lg:h-128 md:h-96 sm:h-64">
                      <pre className="text-wrap">{value}</pre>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </dd>
        ))
      }
    </>
  );
}

export function beautifyJson(value: string) {
  try {
    return JSON.stringify(JSON.parse(value), null, "\t");
  } catch (error) {
    return value;
  }
}