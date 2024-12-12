import {Item} from "@/features/property/propertyTypes.ts";
import HtmlItem from "@/components/items/HtmlItem.tsx";
import JsonItem from "@/components/items/JsonItem.tsx";
import TableItem from "@/components/items/TableItem.tsx";
import EntityReferenceItem from "@/components/items/EntityReferenceItem.tsx";
import EntityOverviewItem from "@/components/items/EntityOverviewItem.tsx";
import ColorItem from "@/components/items/ColorItem.tsx";
import ParentItem from "@/components/items/ParentItem.tsx";
import CommonItem from "@/components/items/CommonItem.tsx";
import {COLOR_ITEM, COMMON_ITEM, ENTITY_OVERVIEW_ITEM, ENTITY_REFERENCE_ITEM, HTML_ITEM, JSON_ITEM, PARENT_ITEM, TABLE_ITEM} from "@/features/property/propertyConstants.ts";

type props = {
  property: Item
}

export default function ItemWrapper({property}: props) {

  function buildItem() {

    switch (property.component) {
      case HTML_ITEM:
        return (
          <HtmlItem
            propertyData={property.data}
          />
        )
      case JSON_ITEM:
        return (
          <JsonItem
            propertyData={property.data}
          />
        )
      case TABLE_ITEM:
        return (
          <TableItem
            propertyData={property.data}
          />
        )
      case ENTITY_REFERENCE_ITEM:
        return (
          <EntityReferenceItem
            propertyData={property.data}
          />
        )
      case ENTITY_OVERVIEW_ITEM:
        return (
          <EntityOverviewItem
            propertyData={property.data}
          />
        )
      case COLOR_ITEM:
        return (
          <ColorItem
            propertyData={property.data}
          />
        )
      case PARENT_ITEM:
        return (
          <ParentItem
            propertyData={property.data}
          />
        )
      case COMMON_ITEM:
      default:
        return (
          <CommonItem
            propertyData={property.data}
          />
        )
    }
  }

  if (property.data.isNull) {
    return (
      <dd>
        <i>NULL</i>
      </dd>
    )
  } else {
    return buildItem()
  }
}