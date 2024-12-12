// @ts-nocheck
import {CommonItemData} from '@/features/property/propertyTypes.ts'
import {ItemDocumentation} from '@/features/property/documentationTypes.ts'
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import * as React from "react";

type props = {
  propertyData: CommonItemData
}

export default function ParentItemComponent({propertyData}: props ): JSX.Element {

  function buildValues() {
    if (propertyData.isNull) {
      return (
        <dd><i>NULL</i></dd>
      )
    } else {
      return (
        propertyData.values.map((value: string | number, vindex: number) => (
          <dd key={vindex}>
            {value}
          </dd>
        ))
      )
    }
  }

  function buildParentValues() {
    if (propertyData.parent.isNull) {
      return (
        <dd><i>NULL</i></dd>
      )
    } else {
      return (
        propertyData.parent.values.map((value: string | number, vindex: number) => (
          <dd key={vindex}>
            {value}
          </dd>
        ))
      )
    }
  }

  return (
    <>
      <div className="grid grid-cols-2">
        <div>
          {buildValues()}
        </div>
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {buildParentValues()}
              </TooltipTrigger>
              <TooltipContent>
                <p>{propertyData.parent.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </>
  );
}