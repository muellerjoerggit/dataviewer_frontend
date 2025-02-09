import {ReportType} from "@/features/report/reportTypes.ts";

export type Feature = {
  feature: string,
  description: string,
  label: string,
}

export type FeatureData = FeatureDataReport;

export type FeatureDataReport = {
  featureType: 'reports',
  data: ReportType[] | undefined,
}