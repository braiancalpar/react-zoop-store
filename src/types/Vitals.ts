import type { Metric, ReportOpts } from 'web-vitals';

export type VitalsMetricName = 'CLS' | 'FCP' | 'INP' | 'LCP' | 'TTFB';

export interface VitalsMetricData {
  name: VitalsMetricName;
  value: number;
  id: string;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  timestamp: number;
  navigationType?: string;
}

export type VitalsReportCallback = (metric: VitalsMetricData) => void;

export interface VitalsConfig {
  onReport?: VitalsReportCallback;
  enableConsoleLog?: boolean;
  reportOpts?: ReportOpts;
}

export type { Metric };
