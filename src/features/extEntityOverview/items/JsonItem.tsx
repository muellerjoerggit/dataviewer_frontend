import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {beautifyJson} from "@/components/items/JsonItem.tsx";
import {sliceText} from "@/features/extEntityOverview/items/ScalarItem.tsx";
import {ExtOverviewItemJson} from "@/features/extEntityOverview/extEntityOverviewTypes.ts";

type Props = {
  item: ExtOverviewItemJson
}

export default function JsonItem({item}: Props) {

  return (
    <Dialog>
      <DialogTrigger
        className="hover:underline hover:cursor-pointer mt-1">{sliceText(item.data.json, 15)}</DialogTrigger>
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
              <pre className="text-wrap">{beautifyJson(item.data.json)}</pre>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="raw">
            <ScrollArea className="h-192 lg:h-128 md:h-96 sm:h-64">
              <pre className="text-wrap">{item.data.json}</pre>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}