// @ts-nocheck
import useFetchClients from "@/hooks/useFetchClients.ts";
import {cn} from "@/lib/utils.ts";
import {useEffect} from "react";

type props = {
  handleChange: Function
  selectedClient: string
  className?: string
}

export default function ClientChooser({handleChange, selectedClient, className}: props) {

  const [clients, isPending, error] = useFetchClients();

  useEffect(() => {
    if (selectedClient === '' && clients !== undefined) {
      handleChange(Object.keys(clients)[0]);
    }
  }, [selectedClient, clients])

  function build() {
    if (clients === undefined || Object.keys(clients).length === 0 || isPending)
      return (
        <select
          value={selectedClient}
          onChange={e => {
            handleChange(e.target.value)
          }}
          className={cn('', className)}
        >
        </select>
      )
        ;

    return (
      <select
        value={selectedClient}
        onChange={e => {
          handleChange(e.target.value)
        }}
        className={cn('border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', className)}
      >
        {
          Object.keys(clients).map((client: string, index: number) => (
            <option key={index} value={client}>{clients[client]}</option>
          ))
        }
      </select>
    );
  }

  return (
    build()
  );
}