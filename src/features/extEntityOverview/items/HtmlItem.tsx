import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {sliceText} from "@/features/extEntityOverview/items/ScalarItem.tsx";
import {ExtOverviewItemHtml} from "@/features/extEntityOverview/extEntityOverviewTypes.ts";

type Props = {
  item: ExtOverviewItemHtml
}

export default function HtmlItem({item}: Props) {

  return (
    <Dialog>
      <DialogTrigger className="hover:underline hover:cursor-pointer mt-1">{sliceText(item.data.text)}</DialogTrigger>
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
              <div dangerouslySetInnerHTML={{__html: item.data.sanitizedHtml}}/>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="raw">
            <ScrollArea className="h-192 lg:h-128 md:h-96 sm:h-64">
              <pre className="text-wrap">{item.data.rawHtml}</pre>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Schließen
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}