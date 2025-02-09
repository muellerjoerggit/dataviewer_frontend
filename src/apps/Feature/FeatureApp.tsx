import {useState} from "react";
import ClientChooser from "@/components/ClientsChooser.tsx";
import {FeatureData} from "@/features/feature/featureTypes.ts";
import useGetFeature from "@/features/feature/useGetFeature.ts";
import Report from "@/features/report/Report.tsx";

export default function FeatureApp() {

  const urlParam = new URLSearchParams(window.location.search);
  const currentFeatureKey: string | null = urlParam.get('feature');
  const [selectedClients, setSelectedClients] = useState('');
  const [featureDataState, setFeatureDataState] = useState<FeatureData | undefined>(undefined);

  useGetFeature(currentFeatureKey, selectedClients, setFeatureData)

  function setFeatureData(featureData: FeatureData) {
    setFeatureDataState(featureData);
  }

  // function buildList() {
  //   if (currentFeatureKey !== null) return;
  //
  //   return (
  //     features.map((feature: Feature) => {
  //       const url = new URL(location.href);
  //       url.searchParams.set('feature', feature.feature);
  //       return (
  //         <a key={feature.feature} href={url.toString()}
  //            className="h-64 w-64 p-6 border bg-gray-600 border-gray-200 rounded-lg shadow-md hover:bg-gray-500 mr-4 mt-4">
  //           <div className="sticky top-0 z-10">
  //             <div className="flex items-center gap-1.5">
  //               <div className="text-lg text-gray-50">{feature.label}</div>
  //             </div>
  //           </div>
  //           <div className="font-medium text-sm text-gray-50 mt-3">{feature.description}</div>
  //         </a>
  //       )
  //     })
  //   );
  // }

  function buildFeature() {
    if (featureDataState === undefined || featureDataState.data == null) {
      return;
    }

    return (
      featureDataState.data.map((report) => (
        <Report report={report} key={1}/>
      ))
    );
  }

  function build() {
    return (
      <>
        {/*{buildList()}*/}
        {buildFeature()}
      </>
    );
  }

  return (
    <>
      <ClientChooser selectedClient={selectedClients} handleChange={setSelectedClients} className="mt-8"/>
      {build()}
    </>
  );
}