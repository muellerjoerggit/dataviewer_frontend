import {Item} from "@/features/property/propertyTypes.ts";
import {Entity} from "@/features/entity/entityTypes.ts";
import {useMemo, useState} from "react";
import ThrobbedIcon from "@/components/icons/ThrobbedIcon.tsx";
import ItemWrapper from "@/components/items/ItemWrapper.tsx";
import ItemErrorBadges from "@/components/ItemErrorBadges.tsx";
import ItemFilterSwitches from "@/components/ItemFilterSwitches.tsx";

type ItemListProps = {
  entity: Entity,
  loading: boolean
}

export default function ItemList({
  entity,
  loading
}: ItemListProps) {

  const [hideDeprecated, setHideDeprecatedState] = useState<boolean>(true);
  const [hideNullItems, setHideNullItemsState] = useState<boolean>(false);
  const [searchPropertyInput, setSearchPropertyInput] = useState<string>('');

  const properties: Array<Item> = useMemo(() => entity.properties.filter(
    (property: Item)=> {
      if (hideDeprecated && property.documentation.deprecated) {
        return false;
      }

      if (hideNullItems && property.data.isNull) {
        return false;
      }

      return !(searchPropertyInput.length > 0
        && !(
          property.documentation.label.toLowerCase().includes(searchPropertyInput.toLowerCase())
          || property.documentation.description.toLowerCase().includes(searchPropertyInput.toLowerCase())
          || property.name.toLowerCase().includes(searchPropertyInput.toLowerCase())
        ));
    }
    ), [entity, hideDeprecated, hideNullItems, searchPropertyInput])

  function renderItems() {
    if (loading) {
      return (
        <ThrobbedIcon/>
      )
    }

    return (
      <div className="ml-4">
        {properties.map((property: Item, index: number) => (
          <div className="hover:bg-muted/50" key={index}>
            <div>
              <dl className="grid grid-cols-[30%_70%]">
                <dt>
                  {property.documentation.label}
                  <ItemErrorBadges criticalError={property.data.criticalError} warningError={property.data.warningError}/>
                </dt>
                <div>
                  <ItemWrapper property={property}/>
                </div>
              </dl>
            </div>
          </div>
        ))}
      </div>
    )
  }

  function setHideDeprecated(checked: boolean) {
    setHideDeprecatedState(checked);
  }

  function setHideNullItems(checked: boolean) {
    setHideNullItemsState(checked);
  }

  return (
    <>
      <div className="flex">
        <input
          className="basis-7/12 ml-4 mr-4 outline-gray-300 pl-3 outline outline-1 h-11 w-full rounded-md bg-transparent text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          onChange={e => setSearchPropertyInput(e.target.value)}
        />
        <div>
          <ItemFilterSwitches hideDeprecated={hideDeprecated} setHideDeprecated={setHideDeprecated} hideNullItems={hideNullItems} setHideNullItems={setHideNullItems} />
        </div>
      </div>
      <hr className="mt-3 mb-3"/>
      <div className="ml-4">
        {renderItems()}
      </div>
    </>
  )

}