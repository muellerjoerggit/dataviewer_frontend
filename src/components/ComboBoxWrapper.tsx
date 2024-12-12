import ComboBox from "@/components/ComboBox.tsx";
import {useState} from "react";
import {CommandEmpty, CommandGroup, CommandItem} from "@/components/ui/command.tsx";

export default function ComboBoxWrapper({placeholderNoItem = 'Kein Item gefunden'}) {
  const [selected, setSelected] = useState<Array<string>>([]);
  const [open, setOpen] = useState(false);

  const frameworks = [
    {
      id: "next.js",
      label: "Next.js",
    },
    {
      id: "sveltekit",
      label: "SvelteKit",
    },
    {
      id: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      id: "remix",
      label: "Remix",
    },
    {
      id: "astro",
      label: "Astro",
    },
  ];



  return (
    <ComboBox
      allAvailableItems={frameworks}
      setSelectedItemCallback={setSelected}
      selectedItems={selected}
      open={open}
      setOpenCallback={setOpen}
    >
      <CommandEmpty>{placeholderNoItem}</CommandEmpty>
      <CommandGroup>
        {frameworks.map((framework) => (
          <CommandItem
            key={framework.id}
            value={framework.id}
            onSelect={(currentValue) => {
              setSelected([...selected, currentValue])
              setOpen(false)
            }}
          >
            {framework.label}
          </CommandItem>
        ))}
      </CommandGroup>
    </ComboBox>
  )
}