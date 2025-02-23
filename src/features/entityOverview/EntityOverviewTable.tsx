import EyeIcon from "@/components/icons/EyeIcon.tsx";
import ExtEntityOverviewWrapper from "@/features/extEntityOverview/items/ExtEntityOverviewWrapper.tsx";
import BookmarkIcon from "@/components/icons/BookmarkIcon.tsx";

export default function EntityOverviewTable({header, entityOverviewRows, loadEntity, toggleBookmark, isBookmarkCallback}) {

  return (
    <table className="w-fit text-sm text-left rtl:text-right">
      <thead className="text-xs text-gray-900 uppercase">
      <tr>
        <th className="px-6 py-3 bg-white">

        </th>
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
        Object.keys(entityOverviewRows).map((entityKey: string ) => {
          const row = entityOverviewRows[entityKey];
          const overview = row.extOverview;
          return (
            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-200 text-nowrap" key={row.entityKey}>
              <td className="px-6 py-1 text-nowrap text-nowrap">
                <div className="underline hover:cursor-pointer" entity-key={row.entityKey}
                     key={row.entityKey}
                     onClick={() => loadEntity(row.entityKey)}><EyeIcon/>
                </div>
              </td>
              <td className="px-6 py-1 text-nowrap text-nowrap">
                <div className="underline hover:cursor-pointer" entity-key={row.entityKey}
                     key={row.entityKey}
                     onClick={() => toggleBookmark(row.entityKey)}><BookmarkIcon className={isBookmarkCallback(row.entityKey) ? 'text-yellow-400 mr-2' : 'mr-2'}/>
                </div>
              </td>
              {
                Object.keys(overview.data).map((propertyKey, index) => {
                    return (
                      <td className="px-6 py-1 text-nowrap text-nowrap" key={index}>
                        <ExtEntityOverviewWrapper
                          key={propertyKey}
                          extOverviewItems={overview.data[propertyKey]}
                          loadEntity={loadEntity}
                        />
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