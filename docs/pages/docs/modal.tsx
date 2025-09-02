import React, { useState } from 'react';
import { AsciiModal, AsciiButton } from 'react-ascii-ui';

export default function ModalDocs() {
  const [isBasicOpen, setIsBasicOpen] = useState(false);
  const [isSmallOpen, setIsSmallOpen] = useState(false);
  const [isLargeOpen, setIsLargeOpen] = useState(false);
  const [isStaticOpen, setIsStaticOpen] = useState(false);
  const [isNoCloseOpen, setIsNoCloseOpen] = useState(false);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '10px' }}>Modal</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '20px', color: '#ccc' }}>
          Overlay dialogs with ASCII-style borders for important messages and user interactions.
        </p>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <a href="#docs" style={{ color: '#00ff00', textDecoration: 'none', fontSize: '14px' }}>Docs</a>
          <span style={{ color: '#333' }}>•</span>
          <a href="#api" style={{ color: '#00ff00', textDecoration: 'none', fontSize: '14px' }}>API Reference</a>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #333' }}>
          <button style={{ 
            padding: '10px 20px', 
            backgroundColor: '#111', 
            border: 'none', 
            color: '#fff', 
            borderBottom: '2px solid #00ff00',
            fontFamily: 'monospace'
          }}>
            Preview
          </button>
          <button style={{ 
            padding: '10px 20px', 
            backgroundColor: 'transparent', 
            border: 'none', 
            color: '#666',
            fontFamily: 'monospace'
          }}>
            Code
          </button>
        </div>
      </div>

      {/* Preview */}
      <div style={{
        marginBottom: '40px',
        padding: '40px',
        border: '1px solid #333',
        borderRadius: '4px',
        backgroundColor: '#111'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <AsciiButton onClick={() => setIsBasicOpen(true)}>
              Basic Modal
            </AsciiButton>
            <AsciiButton onClick={() => setIsSmallOpen(true)}>
              Small Modal  
            </AsciiButton>
            <AsciiButton onClick={() => setIsLargeOpen(true)}>
              Large Modal
            </AsciiButton>
          </div>
          
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <AsciiButton onClick={() => setIsStaticOpen(true)}>
              Static Backdrop
            </AsciiButton>
            <AsciiButton onClick={() => setIsNoCloseOpen(true)}>
              No Close Button
            </AsciiButton>
          </div>
          
          <p style={{ color: '#666', fontSize: '12px', fontFamily: 'monospace', textAlign: 'center' }}>
            Click any button to open a modal. Press ESC or click outside to close (except static).
          </p>
        </div>
      </div>

      {/* Modals */}
      <AsciiModal
        isOpen={isBasicOpen}
        onClose={() => setIsBasicOpen(false)}
        title="Basic Modal"
      >
        <div style={{ color: '#ccc' }}>
          <p style={{ marginBottom: '15px' }}>
            This is a basic modal with a title and close button. You can close it by:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '20px', listStyle: 'disc' }}>
            <li>Clicking the [X] button</li>
            <li>Pressing the ESC key</li>
            <li>Clicking outside the modal</li>
          </ul>
          <div style={{ textAlign: 'right' }}>
            <AsciiButton onClick={() => setIsBasicOpen(false)}>
              Close
            </AsciiButton>
          </div>
        </div>
      </AsciiModal>

      <AsciiModal
        isOpen={isSmallOpen}
        onClose={() => setIsSmallOpen(false)}
        title="Small Modal"
        size="sm"
      >
        <div style={{ color: '#ccc' }}>
          <p style={{ marginBottom: '15px' }}>This is a small modal, perfect for confirmations or simple forms.</p>
          <div style={{ textAlign: 'center' }}>
            <AsciiButton onClick={() => setIsSmallOpen(false)}>
              Got it
            </AsciiButton>
          </div>
        </div>
      </AsciiModal>

      <AsciiModal
        isOpen={isLargeOpen}
        onClose={() => setIsLargeOpen(false)}
        title="Large Modal"
        size="lg"
      >
        <div style={{ color: '#ccc' }}>
          <p style={{ marginBottom: '15px' }}>
            This is a large modal, great for complex forms or detailed content.
          </p>
          <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#000', border: '1px solid #333' }}>
            <h4 style={{ color: '#00ff00', marginBottom: '10px' }}>ASCII Art Example:</h4>
            <pre style={{ color: '#ccc', fontSize: '12px', fontFamily: 'monospace' }}>
{`    ╔══════════════════════════════════════╗
    ║            LARGE MODAL               ║
    ║                                      ║
    ║  ┌────────────────────────────────┐   ║
    ║  │      Content goes here         │   ║
    ║  │  More space for complex UI     │   ║
    ║  └────────────────────────────────┘   ║
    ╚══════════════════════════════════════╝`}
            </pre>
          </div>
          <div style={{ textAlign: 'right' }}>
            <AsciiButton onClick={() => setIsLargeOpen(false)}>
              Close Large Modal
            </AsciiButton>
          </div>
        </div>
      </AsciiModal>

      <AsciiModal
        isOpen={isStaticOpen}
        onClose={() => setIsStaticOpen(false)}
        title="Static Backdrop"
        backdrop="static"
      >
        <div style={{ color: '#ccc' }}>
          <p style={{ marginBottom: '15px' }}>
            This modal has a static backdrop. You cannot close it by clicking outside, 
            only by using the close button or ESC key.
          </p>
          <div style={{ textAlign: 'center' }}>
            <AsciiButton onClick={() => setIsStaticOpen(false)}>
              Close Modal
            </AsciiButton>
          </div>
        </div>
      </AsciiModal>

      <AsciiModal
        isOpen={isNoCloseOpen}
        onClose={() => setIsNoCloseOpen(false)}
        title="No Close Button"
        showCloseButton={false}
      >
        <div style={{ color: '#ccc' }}>
          <p style={{ marginBottom: '15px' }}>
            This modal doesn't show the [X] close button. You can still close it 
            with ESC key or clicking outside.
          </p>
          <div style={{ textAlign: 'center' }}>
            <AsciiButton onClick={() => setIsNoCloseOpen(false)}>
              Manual Close
            </AsciiButton>
          </div>
        </div>
      </AsciiModal>

      {/* Installation */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Installation</h2>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
            <button style={{ 
              padding: '5px 10px', 
              backgroundColor: '#333', 
              border: '1px solid #666', 
              color: '#fff',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}>
              npm
            </button>
            <button style={{ 
              padding: '5px 10px', 
              backgroundColor: 'transparent', 
              border: '1px solid #333', 
              color: '#666',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}>
              yarn
            </button>
            <button style={{ 
              padding: '5px 10px', 
              backgroundColor: 'transparent', 
              border: '1px solid #333', 
              color: '#666',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}>
              pnpm
            </button>
          </div>
          <pre style={{
            backgroundColor: '#000',
            border: '1px solid #333',
            padding: '15px',
            borderRadius: '4px',
            color: '#00ff00',
            fontFamily: 'monospace',
            fontSize: '14px'
          }}>
            npm install react-ascii-ui
          </pre>
        </div>
      </div>

      {/* Usage */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Usage</h2>
        <pre style={{
          backgroundColor: '#111',
          border: '1px solid #333',
          padding: '20px',
          borderRadius: '4px',
          color: '#ccc',
          fontFamily: 'monospace',
          fontSize: '14px',
          lineHeight: '1.5'
        }}>
          {`import { AsciiModal, AsciiButton } from 'react-ascii-ui';

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AsciiButton onClick={() => setIsOpen(true)}>
        Open Modal
      </AsciiButton>
      
      <AsciiModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="My Modal"
      >
        <p>Modal content goes here</p>
      </AsciiModal>
    </>
  );
}`}
        </pre>
      </div>

      {/* Examples */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Examples</h2>
        
        {/* Basic Example */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Basic Modal</h3>
          <pre style={{
            backgroundColor: '#000',
            border: '1px solid #333',
            padding: '15px',
            borderRadius: '4px',
            color: '#00ff00',
            fontFamily: 'monospace',
            fontSize: '12px'
          }}>
            {`<AsciiModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Basic Modal"
>
  <p>Your content here</p>
</AsciiModal>`}
          </pre>
        </div>

        {/* Different Sizes */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Different Sizes</h3>
          <pre style={{
            backgroundColor: '#000',
            border: '1px solid #333',
            padding: '15px',
            borderRadius: '4px',
            color: '#00ff00',
            fontFamily: 'monospace',
            fontSize: '12px'
          }}>
            {`{/* Small modal */}
<AsciiModal size="sm" isOpen={isOpen} onClose={onClose}>
  <p>Small modal content</p>
</AsciiModal>

{/* Large modal */}
<AsciiModal size="lg" isOpen={isOpen} onClose={onClose}>
  <p>Large modal with more space</p>
</AsciiModal>`}
          </pre>
        </div>

        {/* Static Backdrop */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Static Backdrop</h3>
          <pre style={{
            backgroundColor: '#000',
            border: '1px solid #333',
            padding: '15px',
            borderRadius: '4px',
            color: '#00ff00',
            fontFamily: 'monospace',
            fontSize: '12px'
          }}>
            {`<AsciiModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  backdrop="static"
  title="Cannot click outside to close"
>
  <p>This modal requires explicit close action</p>
</AsciiModal>`}
          </pre>
        </div>

        {/* Without Close Button */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Without Close Button</h3>
          <pre style={{
            backgroundColor: '#000',
            border: '1px solid #333',
            padding: '15px',
            borderRadius: '4px',
            color: '#00ff00',
            fontFamily: 'monospace',
            fontSize: '12px'
          }}>
            {`<AsciiModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  showCloseButton={false}
  title="Custom Controls"
>
  <p>Use your own close button</p>
  <AsciiButton onClick={() => setIsOpen(false)}>
    Custom Close
  </AsciiButton>
</AsciiModal>`}
          </pre>
        </div>
      </div>

      {/* API Reference */}
      <div id="api" style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>API Reference</h2>
        
        <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Props</h3>
        <div style={{ overflow: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse', 
            border: '1px solid #333',
            fontFamily: 'monospace',
            fontSize: '14px'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#222' }}>
                <th style={{ 
                  padding: '12px', 
                  textAlign: 'left', 
                  borderBottom: '1px solid #333',
                  color: '#fff',
                  fontWeight: 'bold'
                }}>
                  Prop
                </th>
                <th style={{ 
                  padding: '12px', 
                  textAlign: 'left', 
                  borderBottom: '1px solid #333',
                  color: '#fff',
                  fontWeight: 'bold'
                }}>
                  Type
                </th>
                <th style={{ 
                  padding: '12px', 
                  textAlign: 'left', 
                  borderBottom: '1px solid #333',
                  color: '#fff',
                  fontWeight: 'bold'
                }}>
                  Default
                </th>
                <th style={{ 
                  padding: '12px', 
                  textAlign: 'left', 
                  borderBottom: '1px solid #333',
                  color: '#fff',
                  fontWeight: 'bold'
                }}>
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  isOpen
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  boolean
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  -
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Whether the modal is visible
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  onClose
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  () =&gt; void
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  -
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Callback function called when modal should close
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  title
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  string
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  -
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Optional title displayed in modal header
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  children
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  React.ReactNode
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  -
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Modal body content
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  size
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  'sm' | 'md' | 'lg'
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  'md'
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Modal size variant
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  showCloseButton
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  boolean
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  true
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Whether to show the [X] close button
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  backdrop
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  'static' | 'clickable'
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  'clickable'
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Whether clicking outside closes the modal
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  className
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  string
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  ""
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Additional CSS classes for modal container
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <h4 style={{ color: '#fff', fontSize: '1.1em', marginBottom: '10px' }}>Features</h4>
          <ul style={{ color: '#ccc', listStyle: 'disc', marginLeft: '20px', lineHeight: '1.6' }}>
            <li><strong>ESC key support:</strong> Press ESC to close modal</li>
            <li><strong>Body scroll lock:</strong> Prevents background scrolling when modal is open</li>
            <li><strong>Focus management:</strong> Proper keyboard navigation and accessibility</li>
            <li><strong>Backdrop control:</strong> Choose between clickable and static backgrounds</li>
            <li><strong>Size variants:</strong> Small, medium, and large modal sizes</li>
          </ul>
        </div>
        
        <p style={{ 
          color: '#ccc', 
          marginTop: '15px',
          fontSize: '14px'
        }}>
          Modal automatically handles accessibility features including focus management and ARIA attributes.
        </p>
      </div>
    </div>
  );
}