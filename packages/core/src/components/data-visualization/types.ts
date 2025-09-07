export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface ChartConfig {
  width?: number;
  height?: number;
  showLabels?: boolean;
  showValues?: boolean;
  showGrid?: boolean;
  animate?: boolean;
  animationDuration?: number;
}

export interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: ChartDataPoint[];
  config?: ChartConfig;
  orientation?: 'horizontal' | 'vertical';
  maxBarLength?: number;
}

export interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: ChartDataPoint[];
  config?: ChartConfig;
  smooth?: boolean;
  fill?: boolean;
}

export interface SparklineProps extends React.HTMLAttributes<HTMLSpanElement> {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  showTrend?: boolean;
}

export interface DonutChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: ChartDataPoint[];
  innerRadius?: number;
  showPercentages?: boolean;
  showLegend?: boolean;
}

export type ChartType = 'bar' | 'line' | 'sparkline' | 'donut';