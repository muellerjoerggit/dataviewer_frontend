import {EntityReferenceType} from "@/features/property/propertyTypes.ts";
import {useContext} from "react";
import {EntityContext} from "@/apps/DaVi/DaViApp.tsx";
import EyeIcon from "@/components/icons/EyeIcon.tsx";

type props = {
  entityReference: EntityReferenceType,
  showEyeIcon?: Boolean
}

export default function EntityReference({entityReference, showEyeIcon = false}: props) {

  const {showEntityCallback: showEntity} = useContext(EntityContext);
  const label = showEyeIcon ? <EyeIcon /> : entityReference.label;

  if (entityReference.entityKey !== '') {
    return (
      <div
        className="hover:underline hover:cursor-pointer"
        onClick={() => showEntity(entityReference.entityKey)}
      >{label}</div>
    )
  } else {
    return (
      <div>{label}</div>
    )
  }
}