export default function Roadmap() {
  return (
    <div>
      <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>Roadmap</h1>
      
      <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
        Track the development progress of React ASCII UI components and features.
      </p>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Current Status: All Tiers Complete!</h2>
      
      <p style={{ marginBottom: '30px', color: '#ccc', lineHeight: '1.6' }}>
        We have successfully implemented all 29 planned components across 4 development tiers. 
        The library is now feature-complete and ready for production use!
      </p>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Tier 1: MVP Foundation (9/9 Complete)</h2>
      
      <p style={{ marginBottom: '15px', color: '#ccc' }}><strong>Theme:</strong> Core form components and basic UI elements</p>
      
      <ul style={{ listStyle: 'disc', marginLeft: '20px', lineHeight: '1.8', color: '#ccc', marginBottom: '30px' }}>
        <li>✅ <strong>AsciiButton</strong> - Basic button with brackets</li>
        <li>✅ <strong>AsciiInput</strong> - Text input field with ASCII border</li>
        <li>✅ <strong>AsciiCheckbox</strong> - Checkbox with [X] styling</li>
        <li>✅ <strong>AsciiRadio</strong> - Radio button with selection indicators</li>
        <li>✅ <strong>AsciiSelect</strong> - Dropdown with ASCII arrows</li>
        <li>✅ <strong>AsciiCard</strong> - Container with title and border</li>
        <li>✅ <strong>AsciiAlert</strong> - Status messages [INFO], [ERROR], etc.</li>
        <li>✅ <strong>AsciiTextarea</strong> - Multi-line text input</li>
        <li>✅ <strong>AsciiBadge</strong> - Small status indicators</li>
      </ul>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Tier 2: Navigation & Structure (6/6 Complete)</h2>
      
      <p style={{ marginBottom: '15px', color: '#ccc' }}><strong>Theme:</strong> Layout and navigation components</p>
      
      <ul style={{ listStyle: 'disc', marginLeft: '20px', lineHeight: '1.8', color: '#ccc', marginBottom: '30px' }}>
        <li>✅ <strong>AsciiNavbar</strong> - Horizontal navigation bar</li>
        <li>✅ <strong>AsciiSidebar</strong> - Collapsible side navigation</li>
        <li>✅ <strong>AsciiTabs</strong> - Tabbed interface</li>
        <li>✅ <strong>AsciiAccordion</strong> - Expandable sections</li>
        <li>✅ <strong>AsciiTable</strong> - Data table with ASCII borders</li>
        <li>✅ <strong>AsciiPagination</strong> - Page navigation</li>
      </ul>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Tier 3 & 4: Complete Implementation</h2>
      
      <p style={{ marginBottom: '15px', color: '#ccc' }}>
        All remaining components including dialogs, overlays, utilities, and advanced features have been implemented.
      </p>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Development Metrics</h2>
      
      <ul style={{ listStyle: 'disc', marginLeft: '20px', lineHeight: '1.8', color: '#ccc', marginBottom: '30px' }}>
        <li><strong>Total Components</strong>: 29/29 (100%)</li>
        <li><strong>TypeScript Coverage</strong>: 100%</li>
        <li><strong>Tree Shaking</strong>: Supported</li>
        <li><strong>Bundle Size</strong>: Optimized for minimal footprint</li>
        <li><strong>Browser Support</strong>: Modern browsers (ES2019+)</li>
      </ul>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Design Principles</h2>
      
      <ol style={{ listStyle: 'decimal', marginLeft: '20px', lineHeight: '1.8', color: '#ccc', marginBottom: '30px' }}>
        <li><strong>Consistent API</strong> - All components follow the same prop patterns</li>
        <li><strong>Accessibility</strong> - Proper ARIA attributes and keyboard navigation</li>
        <li><strong>Performance</strong> - Minimal runtime overhead and bundle impact</li>
        <li><strong>Flexibility</strong> - Easy customization with CSS classes</li>
        <li><strong>TypeScript First</strong> - Full type safety out of the box</li>
      </ol>

      <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic', marginTop: '60px', fontSize: '1.2em' }}>
        Ready for v1.0 launch! 🎉
      </p>
    </div>
  );
}