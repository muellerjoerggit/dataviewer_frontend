import {useEffect, useState} from "react";
import {EntityListItem} from "@/features/entity/entityTypes.ts";
import {SEARCH_ENTITY_URL} from "@/features/api.ts";

export default function useFetchSearchEntity(searchString: string, selectedClient: string, entityType: string) {
  const [entityListItems, setEntityListItems] = useState<Array<EntityListItem>>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {

    let url = SEARCH_ENTITY_URL + `/${selectedClient}/${entityType}`;
    if (searchString !== '') {
      url = `${url}/${searchString}`;
    }

    fetch(url)
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
        setEntityListItems(data)
      })
      .catch(function (error) {
        setError(`${error}`);
      })
  }, [searchString]);

  return {entityListItems, error};
}