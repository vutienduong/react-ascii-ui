export default function ComponentPatternsGuide() {
  return (
    <div>
      <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>Component Patterns</h1>
      
      <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
        Best practices and common patterns for combining React ASCII UI components effectively.
      </p>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Dashboard Layout Pattern</h2>
      
      <p style={{ color: '#ccc', marginBottom: '20px' }}>
        Combine layout components with data visualization for effective dashboards.
      </p>

      <pre style={{ 
        backgroundColor: '#111', 
        border: '1px solid #333', 
        padding: '20px', 
        borderRadius: '4px', 
        overflow: 'auto',
        marginBottom: '30px',
        color: '#ccc'
      }}>
{`import { 
  AsciiContainer, 
  AsciiGrid, 
  AsciiGridItem, 
  AsciiBarChart,
  AsciiSparkline,
  AsciiAdvancedTable 
} from 'react-ascii-ui';

function Dashboard() {
  return (
    <AsciiContainer size="xl" centered>
      <AsciiGrid columns={4} gap="lg">
        {/* Key Metrics */}
        <AsciiGridItem colSpan={4}>
          <AsciiGrid columns={4} gap="md">
            <MetricCard title="Users" value="1,234" trend={sparkData1} />
            <MetricCard title="Revenue" value="$45.2K" trend={sparkData2} />
            <MetricCard title="Sessions" value="89" trend={sparkData3} />
            <MetricCard title="Conversion" value="3.2%" trend={sparkData4} />
          </AsciiGrid>
        </AsciiGridItem>

        {/* Main Chart */}
        <AsciiGridItem colSpan={3}>
          <AsciiContainer border="single" title="Performance Overview">
            <AsciiBarChart 
              data={monthlyData} 
              config={{ animate: true, showGrid: true }}
            />
          </AsciiContainer>
        </AsciiGridItem>

        {/* Side Panel */}
        <AsciiGridItem colSpan={1}>
          <AsciiContainer border="single" title="System Status">
            <SystemStatus />
          </AsciiContainer>
        </AsciiGridItem>

        {/* Data Table */}
        <AsciiGridItem colSpan={4}>
          <AsciiContainer border="single" title="Recent Activity">
            <AsciiAdvancedTable 
              columns={activityColumns}
              data={activityData}
              pageSize={5}
            />
          </AsciiContainer>
        </AsciiGridItem>
      </AsciiGrid>
    </AsciiContainer>
  );
}`}
      </pre>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Form Wizard Pattern</h2>
      
      <p style={{ color: '#ccc', marginBottom: '20px' }}>
        Create complex multi-step workflows with validation and progress tracking.
      </p>

      <pre style={{ 
        backgroundColor: '#111', 
        border: '1px solid #333', 
        padding: '20px', 
        borderRadius: '4px', 
        overflow: 'auto',
        marginBottom: '30px',
        color: '#ccc'
      }}>
{`import { 
  AsciiMultiStepForm, 
  AsciiContainer,
  AsciiFileUpload,
  createValidationRules 
} from 'react-ascii-ui';

const onboardingSteps = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Tell us about yourself',
    fields: [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        width: 'half',
        validation: [createValidationRules.required()]
      },
      {
        name: 'lastName',
        label: 'Last Name', 
        type: 'text',
        width: 'half',
        validation: [createValidationRules.required()]
      },
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        validation: [
          createValidationRules.required(),
          createValidationRules.email()
        ]
      }
    ]
  },
  {
    id: 'company',
    title: 'Company Details',
    fields: [
      {
        name: 'companyName',
        label: 'Company Name',
        type: 'text',
        validation: [createValidationRules.required()]
      },
      {
        name: 'industry',
        label: 'Industry',
        type: 'select',
        options: [
          { value: 'tech', label: 'Technology' },
          { value: 'finance', label: 'Finance' },
          { value: 'healthcare', label: 'Healthcare' }
        ]
      }
    ]
  },
  {
    id: 'documents',
    title: 'Upload Documents',
    description: 'Upload your verification documents',
    fields: [] // Custom content below
  }
];

function OnboardingWizard() {
  return (
    <AsciiContainer size="md" centered border="single" title="Account Setup">
      <AsciiMultiStepForm
        steps={onboardingSteps}
        showProgress={true}
        onSubmit={async (data) => {
          console.log('Onboarding complete:', data);
          // Process form data
        }}
        onStepChange={(step, data) => {
          // Custom logic for step changes
          if (step === 2) {
            // Show file upload when reaching documents step
            return (
              <AsciiFileUpload
                accept="image/*,.pdf"
                multiple={true}
                maxFiles={3}
                onUpload={uploadDocument}
              />
            );
          }
        }}
      />
    </AsciiContainer>
  );
}`}
      </pre>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Terminal Application Pattern</h2>
      
      <p style={{ color: '#ccc', marginBottom: '20px' }}>
        Build interactive terminal applications with window management.
      </p>

      <pre style={{ 
        backgroundColor: '#111', 
        border: '1px solid #333', 
        padding: '20px', 
        borderRadius: '4px', 
        overflow: 'auto',
        marginBottom: '30px',
        color: '#ccc'
      }}>
{`import { 
  AsciiTerminal, 
  AsciiWindow, 
  AsciiWindowManager,
  AsciiAdvancedTable 
} from 'react-ascii-ui';

const terminalCommands = [
  {
    command: 'users',
    description: 'Show user management window',
    handler: () => {
      // Open users window
      setWindows(prev => [...prev, 'users']);
      return 'Opening user management...';
    }
  },
  {
    command: 'monitor',
    description: 'Open system monitor',
    handler: () => {
      setWindows(prev => [...prev, 'monitor']);
      return 'Launching system monitor...';
    }
  }
];

function TerminalApp() {
  const [windows, setWindows] = useState([]);

  return (
    <AsciiWindowManager>
      {/* Main Terminal Window */}
      <AsciiWindow
        title="Main Terminal"
        defaultPosition={{ x: 50, y: 50 }}
        initialWidth={600}
        initialHeight={400}
      >
        <AsciiTerminal
          commands={terminalCommands}
          welcomeMessage="Terminal OS v2.0 - Type 'help' for commands"
          onCommandExecute={(cmd, output) => {
            console.log('Command executed:', cmd);
          }}
        />
      </AsciiWindow>

      {/* Dynamic Windows */}
      {windows.includes('users') && (
        <AsciiWindow
          title="User Management"
          defaultPosition={{ x: 200, y: 150 }}
          initialWidth={800}
          initialHeight={500}
          onClose={() => setWindows(prev => prev.filter(w => w !== 'users'))}
        >
          <AsciiAdvancedTable
            columns={userColumns}
            data={userData}
            caption="System Users"
          />
        </AsciiWindow>
      )}

      {windows.includes('monitor') && (
        <AsciiWindow
          title="System Monitor"
          defaultPosition={{ x: 300, y: 200 }}
          initialWidth={400}
          initialHeight={350}
          onClose={() => setWindows(prev => prev.filter(w => w !== 'monitor'))}
        >
          <SystemMonitorContent />
        </AsciiWindow>
      )}
    </AsciiWindowManager>
  );
}`}
      </pre>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Data Explorer Pattern</h2>
      
      <p style={{ color: '#ccc', marginBottom: '20px' }}>
        Combine tables with charts for interactive data exploration.
      </p>

      <pre style={{ 
        backgroundColor: '#111', 
        border: '1px solid #333', 
        padding: '20px', 
        borderRadius: '4px', 
        overflow: 'auto',
        marginBottom: '30px',
        color: '#ccc'
      }}>
{`import { 
  AsciiAdvancedTable, 
  AsciiLineChart, 
  AsciiBox,
  AsciiContainer 
} from 'react-ascii-ui';

function DataExplorer() {
  const [selectedData, setSelectedData] = useState([]);
  const [chartType, setChartType] = useState('line');

  return (
    <AsciiBox direction="column" gap="lg">
      {/* Controls */}
      <AsciiBox direction="row" gap="md" justifyContent="between">
        <h1 style={{ color: '#00ff00' }}>Sales Analytics</h1>
        <select 
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
        </select>
      </AsciiBox>

      {/* Chart Area */}
      <AsciiContainer border="single" title="Visualization">
        {chartType === 'line' ? (
          <AsciiLineChart 
            data={selectedData.length ? selectedData : salesData}
            config={{ animate: true, showGrid: true }}
          />
        ) : (
          <AsciiBarChart 
            data={selectedData.length ? selectedData : salesData}
            config={{ animate: true }}
          />
        )}
      </AsciiContainer>

      {/* Data Table */}
      <AsciiContainer border="single" title="Sales Data">
        <AsciiAdvancedTable
          columns={salesColumns}
          data={salesData}
          onRowClick={(row) => {
            // Update chart based on selected rows
            setSelectedData([row]);
          }}
          searchable={true}
          filterable={true}
        />
      </AsciiContainer>
    </AsciiBox>
  );
}`}
      </pre>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Best Practices</h2>
      
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#00ff00', fontSize: '1.2em', marginBottom: '10px' }}>Theme Consistency</h3>
        <ul style={{ listStyle: 'disc', marginLeft: '20px', lineHeight: '1.8', color: '#ccc' }}>
          <li>Always wrap your app with <code>AsciiThemeProvider</code></li>
          <li>Use theme colors from <code>useAsciiTheme()</code> for custom styling</li>
          <li>Maintain consistent spacing using theme spacing values</li>
        </ul>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#00ff00', fontSize: '1.2em', marginBottom: '10px' }}>Layout Composition</h3>
        <ul style={{ listStyle: 'disc', marginLeft: '20px', lineHeight: '1.8', color: '#ccc' }}>
          <li>Use <code>AsciiContainer</code> for main content areas</li>
          <li>Combine <code>AsciiGrid</code> and <code>AsciiBox</code> for flexible layouts</li>
          <li>Leverage <code>AsciiSpacer</code> for consistent whitespace</li>
        </ul>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#00ff00', fontSize: '1.2em', marginBottom: '10px' }}>Performance</h3>
        <ul style={{ listStyle: 'disc', marginLeft: '20px', lineHeight: '1.8', color: '#ccc' }}>
          <li>Use pagination for large datasets in tables</li>
          <li>Enable animations selectively based on user preferences</li>
          <li>Implement virtual scrolling for very large lists</li>
        </ul>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#00ff00', fontSize: '1.2em', marginBottom: '10px' }}>Accessibility</h3>
        <ul style={{ listStyle: 'disc', marginLeft: '20px', lineHeight: '1.8', color: '#ccc' }}>
          <li>Provide proper labels for all form inputs</li>
          <li>Use semantic HTML elements where possible</li>
          <li>Ensure sufficient color contrast for all text</li>
          <li>Test keyboard navigation flows</li>
        </ul>
      </div>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Live Examples</h2>
      
      <p style={{ color: '#ccc', marginBottom: '20px' }}>
        See these patterns in action:
      </p>
      
      <ul style={{ listStyle: 'disc', marginLeft: '20px', lineHeight: '1.8', color: '#ccc' }}>
        <li><a href="/examples/admin-dashboard" style={{ color: '#00ff00' }}>Admin Dashboard</a> - Complete dashboard implementation</li>
        <li><a href="/dashboard" style={{ color: '#00ff00' }}>Data Dashboard</a> - Charts and metrics showcase</li>
        <li><a href="/terminal" style={{ color: '#00ff00' }}>Terminal Demo</a> - Interactive terminal application</li>
        <li><a href="/file-manager" style={{ color: '#00ff00' }}>File Manager</a> - Window management example</li>
      </ul>
    </div>
  );
}