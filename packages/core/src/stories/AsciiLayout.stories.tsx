import type { Meta, StoryObj } from '@storybook/react';
import { 
  AsciiGrid, 
  AsciiGridItem, 
  AsciiContainer, 
  AsciiBox, 
  AsciiStack, 
  AsciiInline, 
  AsciiCenter,
  AsciiSpacer,
  AsciiWindow,
  AsciiWindowManager 
} from '../components/layout';

// Sample content component
const SampleCard = ({ title, children, color = '#4ade80' }: { 
  title: string; 
  children: React.ReactNode; 
  color?: string;
}) => (
  <div 
    className="p-4 border rounded"
    style={{ borderColor: color, backgroundColor: `${color}20` }}
  >
    <h3 className="font-bold mb-2" style={{ color }}>{title}</h3>
    <div style={{ color: '#ffffff' }}>{children}</div>
  </div>
);

// Grid Stories
const gridMeta: Meta<typeof AsciiGrid> = {
  title: 'Layout/AsciiGrid',
  component: AsciiGrid,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'dark' }
  },
};

export default gridMeta;

export const BasicGrid: StoryObj<typeof AsciiGrid> = {
  args: {
    columns: 3,
    gap: 'md',
  },
  render: (args) => (
    <AsciiGrid {...args}>
      <SampleCard title="Item 1" color="#4ade80">Grid item content 1</SampleCard>
      <SampleCard title="Item 2" color="#3b82f6">Grid item content 2</SampleCard>
      <SampleCard title="Item 3" color="#f59e0b">Grid item content 3</SampleCard>
      <SampleCard title="Item 4" color="#ef4444">Grid item content 4</SampleCard>
      <SampleCard title="Item 5" color="#8b5cf6">Grid item content 5</SampleCard>
      <SampleCard title="Item 6" color="#ec4899">Grid item content 6</SampleCard>
    </AsciiGrid>
  ),
};

export const ResponsiveGrid: StoryObj<typeof AsciiGrid> = {
  render: () => (
    <AsciiGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} gap="lg">
      <SampleCard title="Responsive 1" color="#4ade80">Adapts to screen size</SampleCard>
      <SampleCard title="Responsive 2" color="#3b82f6">Changes layout on resize</SampleCard>
      <SampleCard title="Responsive 3" color="#f59e0b">Mobile friendly</SampleCard>
      <SampleCard title="Responsive 4" color="#ef4444">Desktop optimized</SampleCard>
    </AsciiGrid>
  ),
};

export const GridWithSpanning: StoryObj<typeof AsciiGrid> = {
  render: () => (
    <AsciiGrid columns={4} gap="md">
      <AsciiGridItem colSpan={2}>
        <SampleCard title="Wide Item" color="#4ade80">Spans 2 columns</SampleCard>
      </AsciiGridItem>
      <SampleCard title="Normal" color="#3b82f6">Single column</SampleCard>
      <SampleCard title="Normal" color="#f59e0b">Single column</SampleCard>
      <AsciiGridItem colSpan={3}>
        <SampleCard title="Very Wide" color="#ef4444">Spans 3 columns</SampleCard>
      </AsciiGridItem>
      <SampleCard title="Last" color="#8b5cf6">Single column</SampleCard>
    </AsciiGrid>
  ),
};

export const AutoFitGrid: StoryObj<typeof AsciiGrid> = {
  render: () => (
    <AsciiGrid autoFit minColumnWidth="250px" gap="md">
      <SampleCard title="Auto Fit 1" color="#4ade80">Automatically fits container</SampleCard>
      <SampleCard title="Auto Fit 2" color="#3b82f6">Minimum 250px width</SampleCard>
      <SampleCard title="Auto Fit 3" color="#f59e0b">Responsive without breakpoints</SampleCard>
      <SampleCard title="Auto Fit 4" color="#ef4444">Perfect for card layouts</SampleCard>
      <SampleCard title="Auto Fit 5" color="#8b5cf6">Dynamic column count</SampleCard>
    </AsciiGrid>
  ),
};

// Container Stories
const containerMeta: Meta<typeof AsciiContainer> = {
  title: 'Layout/AsciiContainer',
  component: AsciiContainer,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' }
  },
};

export const BasicContainer: StoryObj<typeof AsciiContainer> = {
  args: {
    size: 'md',
    padding: 'lg',
    centered: true,
  },
  render: (args) => (
    <AsciiContainer {...args}>
      <h2 className="text-xl font-bold mb-4 text-green-400">Container Content</h2>
      <p className="text-cyan-300">
        This is a centered container with medium size constraints and large padding. 
        It automatically centers content and provides consistent spacing.
      </p>
    </AsciiContainer>
  ),
};

export const ContainerWithBorder: StoryObj<typeof AsciiContainer> = {
  render: () => (
    <div className="space-y-6 p-6">
      <AsciiContainer border="single" title="Single Border" padding="md">
        <p>Container with single ASCII border</p>
      </AsciiContainer>
      
      <AsciiContainer border="double" title="Double Border" padding="md">
        <p>Container with double ASCII border</p>
      </AsciiContainer>
      
      <AsciiContainer border="thick" title="Thick Border" padding="md">
        <p>Container with thick ASCII border</p>
      </AsciiContainer>
      
      <AsciiContainer border="dashed" title="Dashed Border" padding="md">
        <p>Container with dashed ASCII border</p>
      </AsciiContainer>
    </div>
  ),
};

export const FlexibleContainers: StoryObj<typeof AsciiContainer> = {
  render: () => (
    <div className="space-y-4 p-4">
      <AsciiContainer size="xs" centered border padding="sm">
        <p>Extra Small Container</p>
      </AsciiContainer>
      
      <AsciiContainer size="sm" centered border padding="sm">
        <p>Small Container</p>
      </AsciiContainer>
      
      <AsciiContainer size="md" centered border padding="sm">
        <p>Medium Container</p>
      </AsciiContainer>
      
      <AsciiContainer size="lg" centered border padding="sm">
        <p>Large Container</p>
      </AsciiContainer>
      
      <AsciiContainer size="xl" centered border padding="sm">
        <p>Extra Large Container</p>
      </AsciiContainer>
    </div>
  ),
};

// Box Stories
const boxMeta: Meta<typeof AsciiBox> = {
  title: 'Layout/AsciiBox',
  component: AsciiBox,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'dark' }
  },
};

export const FlexBoxLayouts: StoryObj<typeof AsciiBox> = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-cyan-400">Row Layout</h3>
        <AsciiBox direction="row" gap="md" padding="sm">
          <div className="p-4 border border-green-500 bg-green-900 bg-opacity-20">Item 1</div>
          <div className="p-4 border border-blue-500 bg-blue-900 bg-opacity-20">Item 2</div>
          <div className="p-4 border border-yellow-500 bg-yellow-900 bg-opacity-20">Item 3</div>
        </AsciiBox>
      </div>

      <div>
        <h3 className="mb-2 text-cyan-400">Column Layout</h3>
        <AsciiBox direction="column" gap="sm" padding="sm">
          <div className="p-4 border border-green-500 bg-green-900 bg-opacity-20">Item 1</div>
          <div className="p-4 border border-blue-500 bg-blue-900 bg-opacity-20">Item 2</div>
          <div className="p-4 border border-yellow-500 bg-yellow-900 bg-opacity-20">Item 3</div>
        </AsciiBox>
      </div>

      <div>
        <h3 className="mb-2 text-cyan-400">Centered Layout</h3>
        <AsciiCenter padding="lg" style={{ minHeight: '200px', border: '1px dashed #6b7280' }}>
          <div className="p-6 border border-purple-500 bg-purple-900 bg-opacity-20">
            Perfectly Centered Content
          </div>
        </AsciiCenter>
      </div>
    </div>
  ),
};

export const UtilityComponents: StoryObj<typeof AsciiStack> = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-cyan-400">Stack (Vertical)</h3>
        <AsciiStack gap="md">
          <div className="p-3 bg-red-900 bg-opacity-20 border border-red-500">Stack Item 1</div>
          <div className="p-3 bg-green-900 bg-opacity-20 border border-green-500">Stack Item 2</div>
          <div className="p-3 bg-blue-900 bg-opacity-20 border border-blue-500">Stack Item 3</div>
        </AsciiStack>
      </div>

      <div>
        <h3 className="mb-2 text-cyan-400">Inline (Horizontal)</h3>
        <AsciiInline gap="md">
          <div className="p-3 bg-red-900 bg-opacity-20 border border-red-500">Inline 1</div>
          <div className="p-3 bg-green-900 bg-opacity-20 border border-green-500">Inline 2</div>
          <div className="p-3 bg-blue-900 bg-opacity-20 border border-blue-500">Inline 3</div>
        </AsciiInline>
      </div>

      <div>
        <h3 className="mb-2 text-cyan-400">Spacers</h3>
        <AsciiStack>
          <div className="p-3 bg-purple-900 bg-opacity-20 border border-purple-500">Before Spacer</div>
          <AsciiSpacer size="lg" />
          <div className="p-3 bg-orange-900 bg-opacity-20 border border-orange-500">After Large Spacer</div>
          <AsciiSpacer size="sm" />
          <div className="p-3 bg-pink-900 bg-opacity-20 border border-pink-500">After Small Spacer</div>
        </AsciiStack>
      </div>
    </div>
  ),
};

// Window Stories
const windowMeta: Meta<typeof AsciiWindow> = {
  title: 'Layout/AsciiWindow',
  component: AsciiWindow,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' }
  },
};

export const BasicWindow: StoryObj<typeof AsciiWindow> = {
  args: {
    title: 'ASCII Terminal Window',
    initialWidth: 500,
    initialHeight: 350,
    defaultPosition: { x: 200, y: 100 },
  },
  render: (args) => (
    <AsciiWindow {...args}>
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-green-400">Terminal Content</h3>
        <div className="font-mono text-sm text-green-300">
          <div>$ ls -la</div>
          <div>drwxr-xr-x  3 user user  4096 Jan 15 10:30 .</div>
          <div>drwxr-xr-x  5 user user  4096 Jan 15 10:25 ..</div>
          <div>-rw-r--r--  1 user user   220 Jan 15 10:30 README.md</div>
          <div>-rwxr-xr-x  1 user user  1024 Jan 15 10:28 script.sh</div>
          <div>$ _</div>
        </div>
        <p className="text-cyan-400">
          This window can be dragged, resized, minimized, maximized, and closed.
        </p>
      </div>
    </AsciiWindow>
  ),
};

export const WindowManager: StoryObj<typeof AsciiWindowManager> = {
  render: () => (
    <AsciiWindowManager>
      <AsciiWindow
        title="File Explorer"
        defaultPosition={{ x: 50, y: 50 }}
        initialWidth={400}
        initialHeight={300}
      >
        <div className="space-y-2">
          <h4 className="font-bold text-blue-400">📁 Documents</h4>
          <div className="pl-4 space-y-1 text-sm">
            <div>📄 report.txt</div>
            <div>📄 presentation.pdf</div>
            <div>📁 Projects</div>
          </div>
        </div>
      </AsciiWindow>

      <AsciiWindow
        title="Text Editor"
        defaultPosition={{ x: 300, y: 150 }}
        initialWidth={450}
        initialHeight={350}
      >
        <div className="font-mono text-sm space-y-2">
          <div className="text-gray-400">1 | function helloWorld() {'{}'}</div>
          <div className="text-gray-400">2 |   console.log('Hello, ASCII World!');</div>
          <div className="text-gray-400">3 | {'}'}</div>
          <div className="text-gray-400">4 | </div>
          <div className="text-gray-400">5 | helloWorld();</div>
          <div className="bg-blue-900 bg-opacity-30">6 | _</div>
        </div>
      </AsciiWindow>

      <AsciiWindow
        title="System Monitor"
        defaultPosition={{ x: 100, y: 250 }}
        initialWidth={350}
        initialHeight={280}
      >
        <div className="space-y-3">
          <div>
            <div className="text-green-400 font-bold">CPU Usage: 45%</div>
            <div className="font-mono">{'█'.repeat(9)}{'░'.repeat(11)} 45%</div>
          </div>
          <div>
            <div className="text-blue-400 font-bold">Memory: 8.2GB / 16GB</div>
            <div className="font-mono">{'█'.repeat(10)}{'░'.repeat(10)} 51%</div>
          </div>
          <div>
            <div className="text-yellow-400 font-bold">Disk: 245GB / 500GB</div>
            <div className="font-mono">{'█'.repeat(10)}{'░'.repeat(10)} 49%</div>
          </div>
        </div>
      </AsciiWindow>
    </AsciiWindowManager>
  ),
};

// Complete Layout Demo
export const LayoutShowcase = () => {
  return (
    <div className="min-h-screen p-6">
      <AsciiContainer size="xl" centered padding="lg">
        <AsciiStack gap="xl">
          <AsciiCenter>
            <h1 className="text-3xl font-bold text-green-400">ASCII Layout System</h1>
          </AsciiCenter>

          <AsciiSpacer size="lg" />

          {/* Grid Section */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-cyan-400">Responsive Grid</h2>
            <AsciiGrid columns={3} gap="md">
              <AsciiContainer border="single" title="Grid Item 1" padding="md">
                <p>Responsive grid system with ASCII borders</p>
              </AsciiContainer>
              <AsciiContainer border="double" title="Grid Item 2" padding="md">
                <p>Multiple border styles available</p>
              </AsciiContainer>
              <AsciiContainer border="thick" title="Grid Item 3" padding="md">
                <p>Consistent spacing and alignment</p>
              </AsciiContainer>
            </AsciiGrid>
          </div>

          <AsciiSpacer size="lg" />

          {/* Flex Section */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-cyan-400">Flexible Layouts</h2>
            <AsciiBox direction="row" gap="md" wrap>
              <AsciiBox direction="column" gap="sm" flex="1">
                <div className="p-4 bg-green-900 bg-opacity-30 border border-green-500">Sidebar</div>
                <div className="p-4 bg-blue-900 bg-opacity-30 border border-blue-500">Navigation</div>
              </AsciiBox>
              
              <AsciiBox direction="column" gap="sm" flex="2">
                <div className="p-6 bg-purple-900 bg-opacity-30 border border-purple-500">
                  Main Content Area
                </div>
                <AsciiInline gap="sm">
                  <div className="flex-1 p-3 bg-yellow-900 bg-opacity-30 border border-yellow-500">
                    Footer Left
                  </div>
                  <div className="flex-1 p-3 bg-red-900 bg-opacity-30 border border-red-500">
                    Footer Right
                  </div>
                </AsciiInline>
              </AsciiBox>
            </AsciiBox>
          </div>
        </AsciiStack>
      </AsciiContainer>
    </div>
  );
};

LayoutShowcase.parameters = {
  layout: 'fullscreen',
};