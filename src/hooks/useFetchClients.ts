import {useEffect, useState} from "react";

export default function useFetchClients() {
  const [clients, setClients] = useState();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setIsPending(true);

    fetch('/api/clients')
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
        setClients(data)
      })
      .catch(function (error) {
        setIsPending(false);
        setError(`${error}`);
      })
  }, []);

  return [clients, isPending, error];
}