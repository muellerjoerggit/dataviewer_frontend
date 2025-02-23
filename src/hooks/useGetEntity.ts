import {useMemo, useState} from "react";
import {Entity} from "@/features/entity/entityTypes.ts";
import fetchEntity from "@/hooks/fetchEntity.ts";
import {ExtEntityOverviewMap} from "@/features/extEntityOverview/extEntityOverviewTypes.ts";

export default function useGetEntity(setEntityCallback: (entity: Entity) => void, extOverviewMap: ExtEntityOverviewMap) {
  const entityMap: Map<string, Entity> = useMemo(() => (new Map), []);
  const [loading, setLoadingState] = useState(false);

  function setLoading(loading: boolean) {
    setLoadingState(loading);
  }

  function getEntity(entityKey: string, reload: boolean = false) {
    let entity = entityMap.get(entityKey);
    if (entity !== undefined && !reload) {
      setEntityCallback(entity);
    } else {
      fetchEntity(entityKey, setEntityCallback, entityMap, setLoading, extOverviewMap);
    }
  }

  return {getEntityCallback: getEntity, loading: loading};
}