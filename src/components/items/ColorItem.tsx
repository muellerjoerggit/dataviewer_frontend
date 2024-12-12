import {ColorItemData} from '@/features/property/propertyTypes.ts'

type props = {
  propertyData: ColorItemData
}

export default function ColorItemComponent({propertyData}: props): JSX.Element {

  return (
    <>
      {
        propertyData.values.map((value: string, index: number) => (
          <dd key={index}>
            {value}
            <div style={{height: '100px', width: '100px', backgroundColor: value}}></div>
          </dd>
        ))
      }
    </>
  );
}