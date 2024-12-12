import EyeIcon from "@/components/icons/EyeIcon.tsx";
import {useMemo} from "react";
import ExtEntityOverviewWrapper from "@/components/extendedEntityOverview/ExtEntityOverviewWrapper.tsx";

export default function EntityOverviewTable({entityOverviewData, loadEntity}) {

  const header = useMemo(() => (entityOverviewData.entities[0].entityOverview.header), [entityOverviewData]);

  return (
    <table className="w-fit text-sm text-left rtl:text-right">
      <thead className="text-xs text-gray-900 uppercase">
      <tr>
        <th className="px-6 py-3 bg-white">

        </th>
        {
          Object.keys(header).map((headerKey) => {
            return (
              <th className="px-6 py-3 bg-white" key={headerKey}>
                {header[headerKey]}
              </th>
            )
          })
        }
      </tr>
      </thead>
      <tbody>
      {
        entityOverviewData.entities.map((data, overviewKey) => {
          const overview = data.entityOverview;
          return (
            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-200 text-nowrap" key={overviewKey}>
              <td className="px-6 py-1 text-nowrap text-nowrap">
                <div className="underline hover:cursor-pointer" entity-key={data.entityKey}
                     key={data.entityKey}
                     onClick={() => loadEntity(data.entityKey)}><EyeIcon/>
                </div>
              </td>
              {
                Object.keys(overview.data).map((propertyKey, index) => {
                    return (
                      <td className="px-6 py-1 text-nowrap text-nowrap" key={index}>
                        <ExtEntityOverviewWrapper key={propertyKey} extOverview={overview.data[propertyKey]}
                                                  loadEntity={loadEntity}/>
                      </td>
                    )
                  }
                )
              }
            </tr>
          )
        })
      }
      </tbody>
    </table>
  )
}