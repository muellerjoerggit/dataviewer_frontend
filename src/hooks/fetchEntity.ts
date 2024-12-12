import {Entity} from "@/features/entity/entityTypes.ts";

export default function fetchEntity(entityKey: string, setEntity: Function, entityMap: Map<string, Entity> | undefined, setLoading: (loading: boolean) => void) {
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
    .then((entityData) => {
      setEntity(entityData);
      if (entityMap != undefined) {
        entityMap.set(entityKey, entityData);
      }
    })
    .finally(()=> {
      setLoading(false);
    })

}