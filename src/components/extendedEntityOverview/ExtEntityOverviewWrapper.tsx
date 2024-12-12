import {
  EXT_OVERVIEW_ADDITIONAL,
  EXT_OVERVIEW_HTML,
  EXT_OVERVIEW_JSON,
  EXT_OVERVIEW_REFERENCE,
  EXT_OVERVIEW_SCALAR,
  EXT_OVERVIEW_VALIDATION
} from "@/features/extendedEntityOverview/extendedEntityOverviewConstants.ts";
import EntityReferenceItem from "@/components/extendedEntityOverview/EntityReferenceItem.tsx";
import HtmlItem from "@/components/extendedEntityOverview/HtmlItem.tsx";
import JsonItem from "@/components/extendedEntityOverview/JsonItem.tsx";
import ValidationItem from "@/components/extendedEntityOverview/ValidationItem.tsx";
import AdditionalInformationItem from "@/components/extendedEntityOverview/AdditionalInformationItem.tsx";
import ScalarItem from "@/components/extendedEntityOverview/ScalarItem.tsx";


export default function ExtEntityOverviewWrapper({extOverview, loadEntity}) {

  function buildExtOverview() {

    switch (extOverview.type) {
      case EXT_OVERVIEW_REFERENCE:
        return (
          <EntityReferenceItem itemData={extOverview.data} loadEntityCallback={loadEntity}/>
        );
      case EXT_OVERVIEW_HTML:
        return (
          <HtmlItem itemData={extOverview.data}/>
        )
      case EXT_OVERVIEW_JSON:
        return (
          <JsonItem itemData={extOverview.data}/>
        )
      case EXT_OVERVIEW_VALIDATION:
        return (
          <ValidationItem itemData={extOverview.data}/>
        )
      case EXT_OVERVIEW_ADDITIONAL:
        return (
          <AdditionalInformationItem itemData={extOverview.data}/>
        )
      case EXT_OVERVIEW_SCALAR:
      default:
        return (
          <ScalarItem itemData={extOverview.data}/>
        )
    }
  }

  return (
    buildExtOverview()
  )
}