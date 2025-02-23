import {Entity} from "@/features/entity/entityTypes.ts";
import {ExtEntityOverviewMap} from "@/features/extEntityOverview/extEntityOverviewTypes.ts";

export default function fetchEntity(
  entityKey: string,
  setEntity: Function,
  entityMap: Map<string, Entity> | undefined,
  setLoading: (loading: boolean) => void,
  extOverviewMap: ExtEntityOverviewMap
) {
  setLoading(true);
  fetch(`/api/entities/${entityKey}`)
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      try {
        return res.json();
      } catch {
        res.text().then(text => {
          throw new Error(text)
        });
      }
    })
    .then((entityData: Entity) => {
      setEntity(entityData);
      entityMap?.set(entityKey, entityData);
      extOverviewMap?.set(entityKey, {
        entityLabel: entityData.label,
        entityKey: entityData.entityKey,
        extOverview: entityData.extEntityOverview
      });
    })
    .finally(()=> {
      setLoading(false);
    })

}