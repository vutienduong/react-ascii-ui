import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AsciiButton } from '../components/AsciiButton';
import { AsciiBadge } from '../components/AsciiBadge';
import { AsciiCard } from '../components/AsciiCard';
import { AsciiInput } from '../components/AsciiInput';
import { AsciiAlert } from '../components/AsciiAlert';
import { AsciiSpinner } from '../animations/components/AsciiSpinner';
import { AsciiTypewriter } from '../animations/components/AsciiTypewriter';

// Create a showcase component
const ThemeShowcase: React.FC = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <AsciiCard title="ASCII UI Theme Showcase">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Buttons and Badges */}
          <div>
            <h3 style={{ marginBottom: '10px', fontSize: '16px', opacity: 0.8 }}>Buttons & Badges</h3>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <AsciiButton>Action Button</AsciiButton>
              <AsciiBadge color="primary">Primary</AsciiBadge>
              <AsciiBadge color="success">Success</AsciiBadge>
              <AsciiBadge color="warning">Warning</AsciiBadge>
              <AsciiBadge color="error">Error</AsciiBadge>
              <AsciiBadge variant="curly" color="primary">Curly</AsciiBadge>
            </div>
          </div>

          {/* Input Field */}
          <div>
            <h3 style={{ marginBottom: '10px', fontSize: '16px', opacity: 0.8 }}>Input Field</h3>
            <AsciiInput placeholder="Type something here..." />
          </div>

          {/* Alerts */}
          <div>
            <h3 style={{ marginBottom: '10px', fontSize: '16px', opacity: 0.8 }}>Alerts</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <AsciiAlert variant="info">Information message with theme colors</AsciiAlert>
              <AsciiAlert variant="success">Success notification</AsciiAlert>
              <AsciiAlert variant="warning">Warning message</AsciiAlert>
              <AsciiAlert variant="error">Error notification</AsciiAlert>
            </div>
          </div>

          {/* Animations */}
          <div>
            <h3 style={{ marginBottom: '10px', fontSize: '16px', opacity: 0.8 }}>Animations</h3>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AsciiSpinner variant="dots" />
                <span style={{ fontSize: '14px', opacity: 0.7 }}>Loading...</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AsciiSpinner variant="binary" />
                <span style={{ fontSize: '14px', opacity: 0.7 }}>Processing...</span>
              </div>
              <AsciiTypewriter 
                text="Theme-aware typewriter effect"
                config={{ speed: 60, showCursor: true }}
              />
            </div>
          </div>

          {/* Terminal Output */}
          <div>
            <h3 style={{ marginBottom: '10px', fontSize: '16px', opacity: 0.8 }}>Terminal Output</h3>
            <AsciiCard>
              <div style={{ fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.4' }}>
                <div>{'>'} system --status</div>
                <div>{'>'} cpu: 45% memory: 2.1GB/8GB</div>
                <div>{'>'} network: connected [192.168.1.100]</div>
                <div>{'>'} services: all operational ✓</div>
              </div>
            </AsciiCard>
          </div>

          {/* Instructions */}
          <div style={{ 
            marginTop: '20px', 
            padding: '15px', 
            border: '1px dashed currentColor', 
            borderRadius: '4px',
            opacity: 0.8,
            fontSize: '14px'
          }}>
            <strong>Theme Instructions:</strong>
            <br />
            Use the theme selector in the Storybook toolbar (paintbrush icon) to switch between different ASCII themes:
            Classic, Cyberpunk, Matrix, Retro, Neon, Terminal, and Minimal.
          </div>
        </div>
      </AsciiCard>
    </div>
  );
};

const meta = {
  title: 'Overview/Theme Showcase',
  component: ThemeShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete showcase of ASCII UI components across different themes. Use the theme selector in the toolbar to see how components adapt to different ASCII aesthetics.'
      }
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof ThemeShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllComponents: Story = {};

export const DarkBackground: Story = {
  parameters: {
    backgrounds: { default: 'dark' }
  }
};

export const LightBackground: Story = {
  parameters: {
    backgrounds: { default: 'light' }
  }
};