import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";

export default function EntityMain({entityListComponent}
) {

  return (
    <Tabs defaultValue="entityList">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="entityList">Liste</TabsTrigger>
        <TabsTrigger value="bookmarks">Lesezeichen</TabsTrigger>
        <TabsTrigger value="history">Verlauf</TabsTrigger>
      </TabsList>
      <TabsContent value="entityList" className="ml-2">
        {entityListComponent}
      </TabsContent>
      <TabsContent value="bookmarks">
        {/*{buildBookmarks()}*/}
      </TabsContent>
      <TabsContent value="history">
        {/*{*/}
        {/*  history.map((entityListItem: EntityListItem, index : number) => (*/}
        {/*    <div className="hover:bg-muted/50 hover:cursor-pointer"  entity-key={entityListItem.entityKey} key={index}*/}
        {/*         onClick={e => loadEntity(e.target.getAttribute('entity-key'), false)}>{entityListItem.entityLabel}</div>*/}
        {/*  ))*/}
        {/*}*/}
      </TabsContent>
    </Tabs>
  )
}