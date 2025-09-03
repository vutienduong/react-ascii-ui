import React, { useState } from 'react';
import { AsciiCalendar } from 'react-ascii-ui';

export default function CalendarDocs() {
  const [selectedDate1, setSelectedDate1] = useState<Date | undefined>(new Date());
  const [selectedDate2, setSelectedDate2] = useState<Date | undefined>();
  const [viewDate, setViewDate] = useState(new Date());

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '10px' }}>Calendar</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '20px', color: '#ccc' }}>
          A retro-styled calendar component with ASCII borders and monospace typography for date selection.
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
        backgroundColor: '#111',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '320px' }}>
          <AsciiCalendar
            selectedDate={selectedDate1}
            onDateSelect={setSelectedDate1}
          />
          {selectedDate1 && (
            <div style={{ 
              marginTop: '15px', 
              textAlign: 'center', 
              color: '#ccc', 
              fontFamily: 'monospace',
              fontSize: '14px'
            }}>
              Selected: {selectedDate1.toLocaleDateString()}
            </div>
          )}
        </div>
      </div>

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
          {`import { AsciiCalendar } from 'react-ascii-ui';

export default function Example() {
  const [selectedDate, setSelectedDate] = useState<Date>();

  return (
    <AsciiCalendar
      selectedDate={selectedDate}
      onDateSelect={setSelectedDate}
    />
  );
}`}
        </pre>
      </div>

      {/* Examples */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Examples</h2>

        {/* Basic Calendar */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Basic Calendar</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <AsciiCalendar />
          </div>
          <pre style={{
            backgroundColor: '#000',
            border: '1px solid #333',
            padding: '15px',
            borderRadius: '4px',
            color: '#00ff00',
            fontFamily: 'monospace',
            fontSize: '12px'
          }}>
            {`<AsciiCalendar />`}
          </pre>
        </div>

        {/* With Date Selection */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>With Date Selection</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div>
              <AsciiCalendar
                selectedDate={selectedDate2}
                onDateSelect={setSelectedDate2}
              />
              {selectedDate2 && (
                <div style={{ 
                  marginTop: '10px', 
                  textAlign: 'center', 
                  color: '#00ff00',
                  fontFamily: 'monospace',
                  fontSize: '12px'
                }}>
                  Selected: {selectedDate2.toDateString()}
                </div>
              )}
            </div>
          </div>
          <pre style={{
            backgroundColor: '#000',
            border: '1px solid #333',
            padding: '15px',
            borderRadius: '4px',
            color: '#00ff00',
            fontFamily: 'monospace',
            fontSize: '12px'
          }}>
            {`const [selectedDate, setSelectedDate] = useState<Date>();

<AsciiCalendar
  selectedDate={selectedDate}
  onDateSelect={setSelectedDate}
/>`}
          </pre>
        </div>

        {/* Without Navigation */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Without Navigation</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <AsciiCalendar showNavigation={false} />
          </div>
          <pre style={{
            backgroundColor: '#000',
            border: '1px solid #333',
            padding: '15px',
            borderRadius: '4px',
            color: '#00ff00',
            fontFamily: 'monospace',
            fontSize: '12px'
          }}>
            {`<AsciiCalendar showNavigation={false} />`}
          </pre>
        </div>

        {/* With Month Change Handler */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>With Month Change Handler</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div>
              <AsciiCalendar
                currentDate={viewDate}
                onMonthChange={(date) => {
                  setViewDate(date);
                }}
              />
              <div style={{ 
                marginTop: '10px', 
                textAlign: 'center', 
                color: '#ccc',
                fontFamily: 'monospace',
                fontSize: '12px'
              }}>
                Viewing: {viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
            </div>
          </div>
          <pre style={{
            backgroundColor: '#000',
            border: '1px solid #333',
            padding: '15px',
            borderRadius: '4px',
            color: '#00ff00',
            fontFamily: 'monospace',
            fontSize: '12px'
          }}>
            {`const [viewDate, setViewDate] = useState(new Date());

<AsciiCalendar
  currentDate={viewDate}
  onMonthChange={setViewDate}
/>`}
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
                  currentDate
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Date
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  new Date()
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  The initial date to display the calendar for
                </td>
              </tr>
              <tr>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  selectedDate
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Date
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
                  Currently selected date
                </td>
              </tr>
              <tr>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  onDateSelect
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  (date: Date) =&gt; void
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
                  Callback when a date is selected
                </td>
              </tr>
              <tr>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  showNavigation
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
                  Whether to show month navigation arrows
                </td>
              </tr>
              <tr>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  onMonthChange
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  (date: Date) =&gt; void
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
                  Callback when month changes
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
                  Additional CSS classes
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h4 style={{ color: '#fff', fontSize: '1.1em', marginBottom: '10px' }}>Features</h4>
          <ul style={{ color: '#ccc', listStyle: 'disc', marginLeft: '20px', lineHeight: '1.6' }}>
            <li><strong>Date Selection:</strong> Click on any date to select it</li>
            <li><strong>Month Navigation:</strong> Navigate between months with [&lt;] and [&gt;] buttons</li>
            <li><strong>Today Highlight:</strong> Current date is highlighted in yellow</li>
            <li><strong>Selected Highlight:</strong> Selected date is highlighted in green</li>
            <li><strong>Week Layout:</strong> Monday to Sunday layout with proper alignment</li>
            <li><strong>Visual Legend:</strong> Shows meaning of colors and highlighting</li>
            <li><strong>ASCII Styling:</strong> Monospace font with retro ASCII borders</li>
          </ul>
        </div>

        <p style={{
          color: '#ccc',
          marginTop: '15px',
          fontSize: '14px'
        }}>
          AsciiCalendar extends all HTML div attributes and supports all React div props.
        </p>
      </div>
    </div>
  );
}