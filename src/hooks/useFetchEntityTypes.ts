import {useEffect, useState} from "react";
import {EntityType} from "@/features/entity/entityTypes.ts";

export function useFetchEntityTypes() {
  const [entityTypes, setEntityTypes] = useState<Array<EntityType>>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch('/api/entityTypes')
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
      .then((data) => {
        data.sort(sortEntityTypes);

        setEntityTypes(data)
      })
      .catch(function (error) {
        setError(`${error}`);
      })
  }, []);

  function sortEntityTypes(entityType1: EntityType, entityType2: EntityType) {
    if (entityType1.label.toLowerCase() < entityType2.label.toLowerCase()) {
      return -1;
    }
    if (entityType1.label.toLowerCase() > entityType2.label.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  function getEntityType(entityType: string): EntityType | undefined {
    return entityTypes.find((entityTypeItem: EntityType) => entityTypeItem.type === entityType);
  }

  return {entityTypes, getEntityType, error};
}