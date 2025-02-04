// @ts-nocheck
import useFetchFeature from "@/customHooks/useFetchFeature.ts";
import ReportComponent from "@/components/dataCollections/Report.tsx";
import useFetchFeatureList from "@/customHooks/useFetchFeatureList.ts";
import {useState} from "react";
import Throbber from "@/components/icons/Throbber.tsx";
import ClientChooser from "@/components/ClientsChooser.tsx";


export default function FeatureApp() {

    const urlParam = new URLSearchParams(window.location.search);
    const [currentFeatureKey, setCurrentFeatureKey] = useState<string|null>(urlParam.get('feature'));
    const [selectedClients, setSelectedClients] = useState('');
    const [featureData, isPending, error] = useFetchFeature(selectedClients, currentFeatureKey);
    const [categoryFeatures, getFeatureData, isPendingList, errorList] = useFetchFeatureList();

    function buildList() {
        if(currentFeatureKey !== null) return;

        return (<>
            <div className="mb-8 mt-4">Status von verschiedenen Features anzeigen lassen</div>
            {
                Object.keys(categoryFeatures).map((category: string) => {
                    const featureList = categoryFeatures[category];
                    return (
                        <>
                            <h2 className="text-2xl">{category}</h2>
                            {buildFeatureList(featureList)}
                        </>
                    )
                })
            }
        </>);
    }

    function buildFeatureList(featureList) {
        if(featureList.length === 0) {
            return (
                <Throbber/>
            );
        }

        return (
            <div className="flex">
                {
                    featureList.map((featureKey: string, index: number) => {
                        const data = getFeatureData(featureKey);
                        const url = new URL(location.href);
                        url.searchParams.set('feature', featureKey);
                        return (
                            <a key={index} href={url.toString()}
                               className="h-64 w-64 p-6 border bg-gray-600 border-gray-200 rounded-lg shadow-md hover:bg-gray-500 mr-4 mt-4">
                                <div className="sticky top-0 z-10">
                                    <div className="flex items-center gap-1.5">
                                        <div className="text-lg text-gray-50">{data.featureLabel}</div>
                                    </div>
                                </div>
                                <div className="font-medium text-sm text-gray-50 mt-3">{data.featureDescription}</div>
                            </a>
                        )
                    })
                }
            </div>
        )
    }

    function buildFeature() {
        if (featureData === undefined) {return;}

        return (
            featureData.map((report) => (
                <ReportComponent report={report} key={1}/>
            ))
        );
    }

    function build() {
        if(isPending || isPendingList) {
            return (
                <Throbber/>
            );
        }

        return (
            <>
                {buildList()}
                {buildFeature()}
            </>
        );
    }

    return (
        <>
            <ClientChooser selectedClient={selectedClients} handleChange={setSelectedClients} className="mt-8" />
            {build()}
        </>
    );
}