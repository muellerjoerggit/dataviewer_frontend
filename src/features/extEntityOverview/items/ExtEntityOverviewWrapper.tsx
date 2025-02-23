import {
  EXT_OVERVIEW_ADDITIONAL,
  EXT_OVERVIEW_HTML,
  EXT_OVERVIEW_JSON,
  EXT_OVERVIEW_REFERENCE,
  EXT_OVERVIEW_SCALAR,
  EXT_OVERVIEW_VALIDATION
} from "@/features/extEntityOverview/extEntityOverviewConstants.ts";
import EntityReferenceItem from "@/features/extEntityOverview/items/EntityReferenceItem.tsx";
import HtmlItem from "@/features/extEntityOverview/items/HtmlItem.tsx";
import JsonItem from "@/features/extEntityOverview/items/JsonItem.tsx";
import ValidationItem from "@/features/extEntityOverview/items/ValidationItem.tsx";
import AdditionalInformationItem from "@/features/extEntityOverview/items/AdditionalInformationItem.tsx";
import ScalarItem from "@/features/extEntityOverview/items/ScalarItem.tsx";
import {ExtEntityOverviewItem} from "@/features/extEntityOverview/extEntityOverviewTypes.ts";
import {EntityLoad} from "@/features/entity/entityTypes.ts";

type Props = {
  extOverviewItems: ExtEntityOverviewItem,
  loadEntity: EntityLoad
}

export default function ExtEntityOverviewWrapper({extOverviewItems, loadEntity}: Props) {

  function buildExtOverview() {

    switch (extOverviewItems.type) {
      case EXT_OVERVIEW_REFERENCE:
        return (
          <EntityReferenceItem item={extOverviewItems} loadEntity={loadEntity}/>
        );
      case EXT_OVERVIEW_HTML:
        return (
          <HtmlItem item={extOverviewItems}/>
        )
      case EXT_OVERVIEW_JSON:
        return (
          <JsonItem item={extOverviewItems}/>
        )
      case EXT_OVERVIEW_VALIDATION:
        return (
          <ValidationItem item={extOverviewItems}/>
        )
      case EXT_OVERVIEW_ADDITIONAL:
        return (
          <AdditionalInformationItem item={extOverviewItems}/>
        )
      case EXT_OVERVIEW_SCALAR:
      default:
        return (
          <ScalarItem item={extOverviewItems}/>
        )
    }
  }

  return (
    buildExtOverview()
  )
}