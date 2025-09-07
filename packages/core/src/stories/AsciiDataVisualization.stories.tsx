import type { Meta, StoryObj } from '@storybook/react';
import { AsciiBarChart, AsciiLineChart, AsciiSparkline, AsciiDonutChart } from '../components/data-visualization';

const sampleData = [
  { label: 'Jan', value: 65, color: '#00ff00' },
  { label: 'Feb', value: 59, color: '#0088ff' },
  { label: 'Mar', value: 80, color: '#ff0088' },
  { label: 'Apr', value: 81, color: '#ffff00' },
  { label: 'May', value: 56, color: '#ff8800' },
  { label: 'Jun', value: 55, color: '#8800ff' },
];

const sparklineData = [23, 45, 56, 78, 87, 65, 43, 32, 45, 67, 89, 78, 65, 43, 21, 34, 56, 78, 89, 65];

const donutData = [
  { label: 'Desktop', value: 45, color: '#00ff00' },
  { label: 'Mobile', value: 35, color: '#0088ff' },
  { label: 'Tablet', value: 20, color: '#ff0088' },
];

// Bar Chart Stories
const barChartMeta: Meta<typeof AsciiBarChart> = {
  title: 'Data Visualization/AsciiBarChart',
  component: AsciiBarChart,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' }
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    maxBarLength: {
      control: { type: 'range', min: 10, max: 50 },
    },
  },
};

export default barChartMeta;
type BarChartStory = StoryObj<typeof AsciiBarChart>;

export const VerticalBarChart: BarChartStory = {
  args: {
    data: sampleData,
    orientation: 'vertical',
    maxBarLength: 15,
    config: {
      showLabels: true,
      showValues: true,
      animate: true,
      animationDuration: 1000,
    },
  },
};

export const HorizontalBarChart: BarChartStory = {
  args: {
    data: sampleData,
    orientation: 'horizontal',
    maxBarLength: 20,
    config: {
      showLabels: true,
      showValues: true,
      showGrid: true,
      animate: true,
    },
  },
};

export const StaticBarChart: BarChartStory = {
  args: {
    data: sampleData,
    orientation: 'vertical',
    config: {
      animate: false,
      showGrid: true,
    },
  },
};

// Line Chart Stories
const lineChartMeta: Meta<typeof AsciiLineChart> = {
  title: 'Data Visualization/AsciiLineChart',
  component: AsciiLineChart,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' }
  },
};

export const BasicLineChart: StoryObj<typeof AsciiLineChart> = {
  args: {
    data: sampleData,
    config: {
      width: 50,
      height: 15,
      showLabels: true,
      showValues: true,
      showGrid: true,
      animate: true,
    },
  },
};

export const SmoothLineChart: StoryObj<typeof AsciiLineChart> = {
  args: {
    data: sampleData,
    smooth: true,
    config: {
      width: 40,
      height: 12,
      showGrid: false,
    },
  },
};

export const FilledLineChart: StoryObj<typeof AsciiLineChart> = {
  args: {
    data: sampleData,
    fill: true,
    config: {
      width: 45,
      height: 18,
      showGrid: true,
      animate: true,
    },
  },
};

// Sparkline Stories  
const sparklineMeta: Meta<typeof AsciiSparkline> = {
  title: 'Data Visualization/AsciiSparkline',
  component: AsciiSparkline,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' }
  },
};

export const BasicSparkline: StoryObj<typeof AsciiSparkline> = {
  args: {
    data: sparklineData,
    width: 25,
    height: 5,
    showTrend: false,
  },
};

export const SparklineWithTrend: StoryObj<typeof AsciiSparkline> = {
  args: {
    data: sparklineData,
    width: 30,
    height: 6,
    showTrend: true,
    color: '#00ff88',
  },
};

export const MiniSparkline: StoryObj<typeof AsciiSparkline> = {
  args: {
    data: [12, 19, 3, 5, 2, 3, 8, 15, 22, 18, 25],
    width: 15,
    height: 3,
    showTrend: true,
  },
};

// Donut Chart Stories
const donutChartMeta: Meta<typeof AsciiDonutChart> = {
  title: 'Data Visualization/AsciiDonutChart',
  component: AsciiDonutChart,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' }
  },
};

export const BasicDonutChart: StoryObj<typeof AsciiDonutChart> = {
  args: {
    data: donutData,
    showPercentages: true,
    showLegend: true,
    innerRadius: 0.5,
  },
};

export const DonutChartNoLegend: StoryObj<typeof AsciiDonutChart> = {
  args: {
    data: donutData,
    showPercentages: false,
    showLegend: false,
    innerRadius: 0.3,
  },
};

export const ThickDonutChart: StoryObj<typeof AsciiDonutChart> = {
  args: {
    data: [
      { label: 'Sales', value: 120, color: '#ff6b6b' },
      { label: 'Marketing', value: 80, color: '#4ecdc4' },
      { label: 'Support', value: 60, color: '#45b7d1' },
      { label: 'Development', value: 140, color: '#96ceb4' },
    ],
    showPercentages: true,
    showLegend: true,
    innerRadius: 0.2,
  },
};

// Combined Dashboard Story
export const DataVisualizationDashboard = () => {
  return (
    <div className="p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-6 text-green-400">ASCII Data Visualization Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="border border-green-600 p-4">
          <h2 className="text-lg font-semibold mb-4 text-cyan-400">Monthly Revenue</h2>
          <AsciiBarChart 
            data={sampleData} 
            orientation="vertical"
            config={{ 
              showLabels: true, 
              showValues: true,
              animate: true 
            }}
          />
        </div>
        
        <div className="border border-green-600 p-4">
          <h2 className="text-lg font-semibold mb-4 text-cyan-400">Performance Trend</h2>
          <AsciiLineChart 
            data={sampleData} 
            fill={true}
            config={{ 
              width: 40, 
              height: 12,
              showGrid: true,
              animate: true 
            }}
          />
        </div>
        
        <div className="border border-green-600 p-4">
          <h2 className="text-lg font-semibold mb-4 text-cyan-400">Traffic Sources</h2>
          <AsciiDonutChart 
            data={donutData}
            showPercentages={true}
            showLegend={true}
          />
        </div>
        
        <div className="border border-green-600 p-4">
          <h2 className="text-lg font-semibold mb-4 text-cyan-400">Quick Stats</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>CPU Usage:</span>
              <AsciiSparkline data={[65, 68, 72, 69, 71, 75, 78, 76, 74, 72]} width={20} height={3} showTrend={true} />
            </div>
            <div className="flex items-center justify-between">
              <span>Memory:</span>
              <AsciiSparkline data={[45, 48, 52, 49, 51, 55, 58, 56, 54, 52]} width={20} height={3} showTrend={true} />
            </div>
            <div className="flex items-center justify-between">
              <span>Network:</span>
              <AsciiSparkline data={[25, 28, 32, 29, 31, 35, 38, 36, 34, 32]} width={20} height={3} showTrend={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DataVisualizationDashboard.parameters = {
  layout: 'fullscreen',
};