import {FeatureDataReport} from "@/features/feature/featureTypes.ts";

export const FEATURE_TYPE_REPORT = 'reports';

export const emptyFeatureReport: FeatureDataReport = {
  featureType: FEATURE_TYPE_REPORT,
  data: undefined,
}