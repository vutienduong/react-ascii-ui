# React ASCII UI

ASCII-styled React UI components for building retro terminal-style interfaces.

## Installation

```bash
npm install react-ascii-ui
```

## Quick Start

```tsx
import { AsciiButton, AsciiCard } from 'react-ascii-ui';

function App() {
  return (
    <AsciiCard title="Welcome">
      <p>Hello ASCII world!</p>
      <AsciiButton onClick={() => alert('Clicked!')}>
        Click me
      </AsciiButton>
    </AsciiCard>
  );
}
```

## Components

This library includes 29 components:

- **Forms**: AsciiButton, AsciiInput, AsciiCheckbox, AsciiRadio, AsciiSelect, AsciiTextarea, AsciiSwitch, AsciiSlider, AsciiSearch
- **Layout**: AsciiCard, AsciiContainer, AsciiDivider, AsciiNavbar, AsciiSidebar, AsciiTabs, AsciiAccordion, AsciiTable  
- **Feedback**: AsciiAlert, AsciiBadge, AsciiLoading, AsciiModal, AsciiToast, AsciiTooltip, AsciiProgress
- **Utilities**: AsciiPagination, AsciiCalendar, AsciiAvatar, AsciiChart, AsciiCode

## Documentation

Visit [react-ascii-ui.dev](https://react-ascii-ui.dev) for full documentation and examples.

## License

MIT