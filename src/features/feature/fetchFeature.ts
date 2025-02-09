import {FEATURE_GET_URL} from "@/features/api.ts";
import {FeatureData} from "@/features/feature/featureTypes.ts";
import {emptyFeatureReport} from "@/features/feature/featureConstants.ts";
import {buildFeatureClientKey} from "@/features/feature/useGetFeature.ts";

export default function fetchFeature(featureKey: string, client: string, featureDataMap: Map<string, FeatureData> | undefined, setFeature: (data: FeatureData) => void) {
  const featureClientKey = buildFeatureClientKey(featureKey, client);

  fetch(`${FEATURE_GET_URL}/${client}/${featureKey}`)
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      try {
        return res.json();
      } catch {
        res.text().then(text => {
          throw new Error(text)
        });
      }
    })
    .then((data) => {
      setFeature(data);
      if(featureDataMap !== undefined) {
        featureDataMap.set(featureClientKey, data);
      }
    })
    .catch(function () {
      setFeature(emptyFeatureReport);
    });

}