// @ts-nocheck
import {Entity} from "@/features/entity/entityTypes.ts";
import {useState} from "react";
import {Item} from "@/features/property/propertyTypes.ts";
import ParameterListComponent from "@/components/parameter/ParameterList.tsx";
import HtmlItem from "@/components/items/HtmlItem.tsx";
import JsonItemComponent from "@/components/items/JsonItem.tsx";
import TableItemComponent from "@/components/items/TableItem.tsx";
import EntityReferenceItemComponent from "@/components/items/EntityReferenceItem.tsx";
import ColorItemComponent from "@/components/items/ColorItem.tsx";
import ParentItemComponent from "@/components/items/ParentItem.tsx";
import CommonItemComponent from "@/components/items/CommonItem.tsx";

type ItemListProps = {
  entity: Entity
  entityCallback: Function
}

export default function ItemTable({entity, entityCallback}: ItemListProps) {

  const [hideDeprecated, setHideDeprecated] = useState<boolean>(true);
  const [hideNullItems, setHideNullItems] = useState<boolean>(false);

  function renderItems() {
    return (
      entity.properties.map((property: Item, index: number) => (
        filterItem(property, index)
      ))
    )
  }

  function filterItem(property: Item, index: number) {
    if (hideDeprecated && property.documentation.deprecated) {
      return
    }

    if (hideNullItems && property.data.isNull) {
      return
    }

    return (
      <td className="px-6 py-1" key={index}>
        {buildItem(property)}
        <ParameterListComponent parameters={entity.parameters} property={property.name}/>
      </td>
    )

  }

  function buildItem(property: Item) {

    switch (property.component) {
      case 'HtmlItem':
        return (
          <HtmlItem
            propertyData={property.data}
            documentation={property.documentation}
            lengthOutput={50}
          >
          </HtmlItem>
        )
      case 'JsonItem':
        return (
          <JsonItemComponent
            propertyData={property.data}
            documentation={property.documentation}
            lengthOutput={50}
          >
          </JsonItemComponent>
        )
      case 'TableItem':
        return (
          <TableItemComponent
            propertyData={property.data}
          >
          </TableItemComponent>
        )
      case 'EntityReferenceItem':
        return (
          <EntityReferenceItemComponent
            propertyData={property.data}
            documentation={property.documentation}
            entityCallback={entityCallback}
          >
          </EntityReferenceItemComponent>
        )
      case 'ColorItem':
        return (
          <ColorItemComponent
            propertyData={property.data}
            documentation={property.documentation}
          >
          </ColorItemComponent>
        )
      case 'ParentItem':
        return (
          <ParentItemComponent
            propertyData={property.data}
            documentation={property.documentation}
          />
        )
      case 'CommonItem':
      default:
        return (
          <CommonItemComponent
            propertyData={property.data}
            documentation={property.documentation}
            tableData={true}
          >
          </CommonItemComponent>
        )
    }

  }

  return (
    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-200">
      {renderItems()}
    </tr>
  )

}