import {useState} from "react";
import {FilterData} from "@/features/filter/filterTypes.ts";
import {buildFiltersForRequest} from "@/hooks/filterReducer.ts";

export function useFetchSearchExtEntityOverview(filterData: FilterData, selectedClient: string, entityType: string, setEntityList: Function) {
  const [error, setError] = useState<string>('');

  const fetchEntities = () => {
    if (selectedClient === '' || entityType === '') {
      setError('Unvollständige Daten für Suche.');
      return;
    }

    const filters = buildFiltersForRequest(filterData);

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({entity_type: entityType, filters: filters})
    };

    fetch(`/api/entities/search/overview/${selectedClient}`, requestOptions)
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
        setEntityList(data)
      })
      .catch(function (error) {
        setError(`${error}`);
      })
  }

  return {fetchEntities, error};
}