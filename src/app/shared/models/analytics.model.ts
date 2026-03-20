export type DateRange = 'week' | 'month' | 'year';

export interface KPI {
  title: string;
  value: number | string;
  change: number;
  isPositive: boolean;
  icon: string;
  color: string;
}

export interface ChartDataPoint {
  label: string;
  value?: number;
  [key: string]: any;
}

export type TransactionStatus = 'pending' | 'completed' | 'failed';

export interface TableRecord {
  id: string;
  name: string;
  date: string;
  category: string;
  amount: number;
  status: TransactionStatus;
}

export interface AnalyticsDashboard {
  kpis: KPI[];
  lineChartData: ChartDataPoint[];
  barChartData: ChartDataPoint[];
  doughnutChartData: ChartDataPoint[];
  tableRecords: TableRecord[];
}