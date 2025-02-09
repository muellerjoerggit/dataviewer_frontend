import {useEffect, useMemo} from "react";
import {FeatureData} from "@/features/feature/featureTypes.ts";
import fetchFeature from "@/features/feature/fetchFeature.ts";

export default function useGetFeature(featureKey: string | null, client: string, setFeatureCallback: (feature: FeatureData) => void) {
  const featureDataMap: Map<string, FeatureData>  = useMemo(() => new Map(), []);

  useEffect(() => {
    getFeature();
  },[featureKey, client]);

  function getFeature() {
    if(featureKey == null || featureKey === '' || client === '') {
      return;
    }

    const featureClientKey = buildFeatureClientKey(featureKey, client);
    const feature = featureDataMap.get(featureClientKey);

    if (feature !== undefined) {
      setFeatureCallback(feature);
    } else {
      fetchFeature(featureKey, client, featureDataMap, setFeatureCallback);
    }
  }
}

export function buildFeatureClientKey(featureKey: string, client: string) {
  return `${featureKey}-${client}`;
}