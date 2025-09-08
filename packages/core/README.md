# React ASCII UI

Complete ASCII-styled React UI library with **advanced features** 🎨

Perfect for retro dashboards, developer tools, network monitoring, code editors, and creative ASCII applications!

## 🌟 Advanced Features

### 🔊 Sound System
**Retro audio feedback** with Web Audio API:
- 20+ sound presets for UI interactions
- Custom hooks: `useButtonSounds()`, `useTerminalSounds()`, `useSystemSounds()`
- Master volume controls and audio context management

### 🎨 ASCII Art Generator  
**Image-to-ASCII conversion** with real-time processing:
- Multiple character sets and dithering algorithms
- Webcam live preview and batch processing
- Canvas-based image manipulation

### 💻 Code Editor
**Syntax-highlighted code editor** with ASCII styling:
- Multi-language support (JS, TS, Python, CSS, HTML, JSON)
- 4 retro themes with custom tokenizers
- Multi-tab editing and advanced features

### 🔗 Network Visualizer
**Interactive network topology diagrams**:
- 5 layout algorithms and real-time monitoring
- Network analysis and path finding
- SVG-based visualization with ASCII aesthetics

## Installation

```bash
npm install react-ascii-ui
```

## Quick Start

```tsx
import { 
  AsciiButton, 
  AsciiCard, 
  AsciiSoundProvider,
  useButtonSounds 
} from 'react-ascii-ui';

function App() {
  return (
    <AsciiSoundProvider>
      <AsciiCard title="Welcome to ASCII UI">
        <p>Hello ASCII world with sound!</p>
        <SoundButton />
      </AsciiCard>
    </AsciiSoundProvider>
  );
}

function SoundButton() {
  const { playClick } = useButtonSounds();
  
  return (
    <AsciiButton onClick={playClick}>
      [ Click Me! ]
    </AsciiButton>
  );
}
```

## Component Library

**50+ components and systems** across 6 categories:

### 🔧 **Core Components**
- **Forms**: AsciiButton, AsciiInput, AsciiCheckbox, AsciiRadio, AsciiSelect, AsciiTextarea, AsciiSwitch
- **Layout**: AsciiCard, AsciiContainer, AsciiDivider, AsciiNavbar, AsciiSidebar, AsciiTabs, AsciiAccordion, AsciiTable  
- **Feedback**: AsciiAlert, AsciiBadge, AsciiLoader, AsciiModal, AsciiToast, AsciiTooltip, AsciiProgressBar
- **Utilities**: AsciiPagination, AsciiCalendar, AsciiAvatar, AsciiChart, AsciiTree, AsciiPopover

### 🚀 **Advanced Systems**
- `AsciiSoundProvider` - Complete audio system with retro effects
- `AsciiArtGenerator` - Image-to-ASCII conversion with webcam support
- `AsciiCodeEditor` - Multi-language code editor with syntax highlighting
- `AsciiNetworkVisualizer` - Interactive network topology diagrams

### 🎵 **Sound Hooks**
- `useButtonSounds()` - Click and hover audio feedback
- `useTerminalSounds()` - Keyboard typing simulation  
- `useFormSounds()` - Form submission and validation audio
- `useSystemSounds()` - Notifications, alerts, and system events
- `useAmbientSounds()` - Background atmospheric audio

## Features

- **TypeScript** - Fully typed with IntelliSense support
- **Web Audio API** - Real-time sound generation and audio feedback
- **Advanced Image Processing** - Canvas-based ASCII art conversion
- **Multi-language Syntax Highlighting** - Custom tokenizers for 6+ languages
- **Interactive Network Diagrams** - SVG-based topology visualization
- **Performance Optimized** - Efficient rendering and memory management
- **Accessible** - Keyboard navigation, ARIA support, screen reader friendly

## Documentation

Visit our comprehensive documentation at:
- **[Main Docs](https://react-ascii-ui-docs.vercel.app)** - Complete API reference
- **[Live Examples](https://react-ascii-ui-docs.vercel.app/dashboard)** - Interactive demos
- **[Component Gallery](https://react-ascii-ui-docs.vercel.app/components)** - All components showcase

## Use Cases

Perfect for:
- **Developer Tools** - CLIs, terminals, code editors, network monitoring
- **Retro Dashboards** - System monitoring, analytics with real-time updates
- **Creative Applications** - ASCII art generators, multimedia tools
- **Network Administration** - Topology visualization, diagnostic tools
- **Audio Applications** - Music players, sound effects, interactive experiences
- **Educational Tools** - Programming interfaces, system administration

## License

MIT © Mikel Vu

---

*Built with ❤️ for the ASCII aesthetic revolution* 🎯