import {CommonItemData} from '@/features/property/propertyTypes.ts'

type props = {
  propertyData: CommonItemData
}

export default function CommonItemComponent({propertyData}: props ): JSX.Element {

  return (
    <>
      {
        propertyData.values.map((value: string | number, index: number) => (
          <dd key={index}>
            {value}
          </dd>
        ))
      }
    </>
  );
}