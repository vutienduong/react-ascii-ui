import { useState } from 'react';
import { 
  AsciiCard, 
  AsciiButton, 
  AsciiSelect,
  AsciiChart,
  AsciiTabs,
  AsciiBadge
} from 'react-ascii-ui';

export default function Chart() {
  const [selectedDataset, setSelectedDataset] = useState('revenue');
  const [chartType, setChartType] = useState('bar');
  const [timeRange, setTimeRange] = useState('6months');

  const datasets = {
    revenue: {
      name: 'Revenue',
      data: [
        { label: 'Jan', value: 42000 },
        { label: 'Feb', value: 38000 },
        { label: 'Mar', value: 51000 },
        { label: 'Apr', value: 47000 },
        { label: 'May', value: 55000 },
        { label: 'Jun', value: 62000 }
      ],
      color: '#00ff00',
      format: (value: number) => `$${(value / 1000).toFixed(0)}k`
    },
    users: {
      name: 'Active Users',
      data: [
        { label: 'Jan', value: 1250 },
        { label: 'Feb', value: 1180 },
        { label: 'Mar', value: 1420 },
        { label: 'Apr', value: 1380 },
        { label: 'May', value: 1650 },
        { label: 'Jun', value: 1720 }
      ],
      color: '#00ffff',
      format: (value: number) => `${value}`
    },
    performance: {
      name: 'Server Performance',
      data: [
        { label: 'CPU', value: 68 },
        { label: 'RAM', value: 42 },
        { label: 'Disk', value: 23 },
        { label: 'Network', value: 81 },
        { label: 'Cache', value: 95 },
        { label: 'DB', value: 57 }
      ],
      color: '#ffaa00',
      format: (value: number) => `${value}%`
    },
    traffic: {
      name: 'Website Traffic',
      data: [
        { label: 'Direct', value: 35 },
        { label: 'Search', value: 42 },
        { label: 'Social', value: 12 },
        { label: 'Email', value: 8 },
        { label: 'Referral', value: 3 }
      ],
      color: '#ff6600',
      format: (value: number) => `${value}%`
    }
  };

  const currentDataset = datasets[selectedDataset as keyof typeof datasets];

  const getDatasetSummary = () => {
    const data = currentDataset.data;
    const values = data.map(item => item.value);
    const total = values.reduce((sum, val) => sum + val, 0);
    const average = total / values.length;
    const max = Math.max(...values);
    const min = Math.min(...values);

    return { total, average, max, min };
  };

  const summary = getDatasetSummary();

  const chartTypeOptions = [
    { value: 'bar', label: 'Bar Chart' },
    { value: 'line', label: 'Line Chart' },
    { value: 'area', label: 'Area Chart' }
  ];

  const datasetOptions = [
    { value: 'revenue', label: 'Revenue Analytics' },
    { value: 'users', label: 'User Analytics' },
    { value: 'performance', label: 'System Performance' },
    { value: 'traffic', label: 'Traffic Sources' }
  ];

  return (
    <div>
      <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>Chart Demo</h1>
      
      <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
        Interactive data visualization showcasing the AsciiChart component with multiple datasets.
      </p>

      <AsciiCard title="[ DATA VISUALIZATION CENTER ]">
        {/* Chart Controls */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr 1fr', 
          gap: '15px', 
          marginBottom: '30px' 
        }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#fff', 
              fontSize: '14px' 
            }}>
              Dataset:
            </label>
            <AsciiSelect
              value={selectedDataset}
              onChange={(e) => setSelectedDataset(e.target.value)}
              style={{ width: '100%' }}
            >
              {datasetOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </AsciiSelect>
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#fff', 
              fontSize: '14px' 
            }}>
              Chart Type:
            </label>
            <AsciiSelect
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              style={{ width: '100%' }}
            >
              {chartTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </AsciiSelect>
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#fff', 
              fontSize: '14px' 
            }}>
              Actions:
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <AsciiButton>
                Export
              </AsciiButton>
              <AsciiButton>
                Share
              </AsciiButton>
            </div>
          </div>
        </div>

        {/* Dataset Info */}
        <div style={{ 
          marginBottom: '20px',
          padding: '15px',
          border: '1px solid #333',
          backgroundColor: '#0a0a0a'
        }}>
          <h3 style={{ color: currentDataset.color, marginBottom: '10px' }}>
            {currentDataset.name} Overview
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
            gap: '15px' 
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.2em', color: '#00ff00', marginBottom: '4px' }}>
                {currentDataset.format(summary.total)}
              </div>
              <div style={{ color: '#ccc', fontSize: '12px' }}>Total</div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.2em', color: '#00ffff', marginBottom: '4px' }}>
                {currentDataset.format(Math.round(summary.average))}
              </div>
              <div style={{ color: '#ccc', fontSize: '12px' }}>Average</div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.2em', color: '#ffaa00', marginBottom: '4px' }}>
                {currentDataset.format(summary.max)}
              </div>
              <div style={{ color: '#ccc', fontSize: '12px' }}>Maximum</div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.2em', color: '#ff6600', marginBottom: '4px' }}>
                {currentDataset.format(summary.min)}
              </div>
              <div style={{ color: '#ccc', fontSize: '12px' }}>Minimum</div>
            </div>
          </div>
        </div>

        {/* Main Chart */}
        <div style={{ 
          marginBottom: '30px',
          padding: '20px',
          border: '1px solid #333',
          backgroundColor: '#000',
          textAlign: 'center'
        }}>
          <h4 style={{ color: currentDataset.color, marginBottom: '15px' }}>
            {currentDataset.name} - {chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart
          </h4>
          <AsciiChart
            data={currentDataset.data.map(item => item.value)}
            type={chartType as 'bar' | 'line' | 'area'}
            width={currentDataset.data.length}
            height={15}
            color="success"
            showValues={true}
            style={{ margin: '0 auto' }}
          />
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginTop: '10px',
            color: '#ccc',
            fontSize: '12px'
          }}>
            {currentDataset.data.map((item, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div>{item.label}</div>
                <div style={{ color: currentDataset.color }}>
                  {currentDataset.format(item.value)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Table */}
        <AsciiTabs 
          tabs={[
            { 
              label: 'Raw Data', 
              content: (
                <div style={{ marginTop: '20px' }}>
                  <table style={{ 
                    width: '100%', 
                    borderCollapse: 'collapse',
                    border: '1px solid #333'
                  }}>
                    <thead>
                      <tr style={{ backgroundColor: '#111' }}>
                        <th style={{ 
                          border: '1px solid #333', 
                          padding: '8px', 
                          color: '#fff',
                          textAlign: 'left'
                        }}>
                          Label
                        </th>
                        <th style={{ 
                          border: '1px solid #333', 
                          padding: '8px', 
                          color: '#fff',
                          textAlign: 'right'
                        }}>
                          Value
                        </th>
                        <th style={{ 
                          border: '1px solid #333', 
                          padding: '8px', 
                          color: '#fff',
                          textAlign: 'right'
                        }}>
                          Formatted
                        </th>
                        <th style={{ 
                          border: '1px solid #333', 
                          padding: '8px', 
                          color: '#fff',
                          textAlign: 'center'
                        }}>
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentDataset.data.map((item, index) => {
                        const isHigh = item.value > summary.average;
                        return (
                          <tr key={index}>
                            <td style={{ 
                              border: '1px solid #333', 
                              padding: '8px', 
                              color: '#ccc' 
                            }}>
                              {item.label}
                            </td>
                            <td style={{ 
                              border: '1px solid #333', 
                              padding: '8px', 
                              color: '#ccc',
                              textAlign: 'right'
                            }}>
                              {item.value}
                            </td>
                            <td style={{ 
                              border: '1px solid #333', 
                              padding: '8px', 
                              color: currentDataset.color,
                              textAlign: 'right'
                            }}>
                              {currentDataset.format(item.value)}
                            </td>
                            <td style={{ 
                              border: '1px solid #333', 
                              padding: '8px',
                              textAlign: 'center'
                            }}>
                              <AsciiBadge color={isHigh ? 'success' : 'default'}>
                                {isHigh ? 'Above Avg' : 'Below Avg'}
                              </AsciiBadge>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )
            },
            {
              label: 'Insights',
              content: (
                <div style={{ marginTop: '20px', lineHeight: '1.8' }}>
                  <h4 style={{ color: '#00ff00', marginBottom: '15px' }}>Data Insights</h4>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <strong style={{ color: '#fff' }}>Trend Analysis:</strong>
                    <p style={{ color: '#ccc', marginLeft: '20px', marginTop: '5px' }}>
                      {summary.max > summary.average * 1.2 
                        ? "Strong upward trend with significant peak values detected."
                        : "Steady performance with consistent values across the dataset."
                      }
                    </p>
                  </div>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <strong style={{ color: '#fff' }}>Performance Rating:</strong>
                    <p style={{ color: '#ccc', marginLeft: '20px', marginTop: '5px' }}>
                      {summary.average > (summary.max * 0.7) 
                        ? "Excellent - Values consistently near maximum potential."
                        : summary.average > (summary.max * 0.5)
                        ? "Good - Values above median range with room for improvement."
                        : "Needs Improvement - Values below optimal range."
                      }
                    </p>
                  </div>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <strong style={{ color: '#fff' }}>Recommendations:</strong>
                    <ul style={{ color: '#ccc', marginLeft: '20px', marginTop: '5px' }}>
                      <li>Focus on improving low-performing metrics</li>
                      <li>Analyze factors contributing to peak performance</li>
                      <li>Implement monitoring for trend detection</li>
                    </ul>
                  </div>
                </div>
              )
            },
            {
              label: 'Settings',
              content: (
                <div style={{ marginTop: '20px' }}>
                  <h4 style={{ color: '#00ff00', marginBottom: '15px' }}>Chart Configuration</h4>
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '20px' 
                  }}>
                    <div>
                      <h5 style={{ color: '#fff', marginBottom: '10px' }}>Display Options</h5>
                      <ul style={{ color: '#ccc', lineHeight: '1.6' }}>
                        <li>Interactive tooltips: Enabled</li>
                        <li>Grid lines: Visible</li>
                        <li>Animations: Smooth transitions</li>
                        <li>Responsive: Auto-resize</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 style={{ color: '#fff', marginBottom: '10px' }}>Data Processing</h5>
                      <ul style={{ color: '#ccc', lineHeight: '1.6' }}>
                        <li>Real-time updates: Supported</li>
                        <li>Data validation: Active</li>
                        <li>Caching: Memory optimized</li>
                        <li>Export formats: JSON, CSV, PNG</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            }
          ]}
          defaultTab={0}
        />
      </AsciiCard>

      {/* Demo Info */}
      <div style={{ 
        marginTop: '30px', 
        padding: '15px', 
        border: '1px solid #333', 
        borderRadius: '4px',
        backgroundColor: '#111'
      }}>
        <h3 style={{ color: '#00ff00', marginBottom: '10px' }}>Chart Features</h3>
        <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.6' }}>
          This chart demo showcases:
        </p>
        <ul style={{ 
          color: '#ccc', 
          fontSize: '14px', 
          listStyle: 'disc', 
          marginLeft: '20px', 
          lineHeight: '1.6' 
        }}>
          <li>Multiple chart types (bar, line, area) with dynamic switching</li>
          <li>Interactive dataset selection with different data formats</li>
          <li>Real-time data summary calculations (total, average, min, max)</li>
          <li>Tabbed interface for data viewing and insights</li>
          <li>Color-coded chart themes that match dataset types</li>
          <li>Responsive chart sizing and auto-formatting</li>
          <li>Data table with status badges and formatted values</li>
          <li>Export and sharing capabilities</li>
        </ul>
      </div>
    </div>
  );
}