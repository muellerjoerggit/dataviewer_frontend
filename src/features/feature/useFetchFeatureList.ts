import {useEffect, useState} from "react";
import {FEATURE_LIST_GET_URL} from "@/features/api.ts";

export default function useFetchFeature() {
  const [features, setFeatures] = useState();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setIsPending(true);

    fetch(FEATURE_LIST_GET_URL)
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
        setIsPending(false);
        setFeatures(data)
      })
      .catch(function (error) {
        setIsPending(false);
        setError(`${error}`);
      })
  }, []);

  return {features, isPending, error};
}