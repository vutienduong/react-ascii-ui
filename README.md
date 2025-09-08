# React ASCII UI

A complete React component library for **ASCII-style UIs** with **advanced features** 🎨

Perfect for retro dashboards, hackathon projects, developer tools, network monitoring, code editors, and adding ASCII flair to your apps!

📚 **[View Documentation & Examples →](https://react-ascii-ui-docs.vercel.app)**

## 🌟 **NEW: Advanced Features**

### 🔊 Sound System
**Retro audio feedback** with Web Audio API integration:
- 20+ sound presets (button clicks, keyboard typing, system alerts)
- Custom hooks: `useButtonSounds()`, `useTerminalSounds()`, `useSystemSounds()`
- Master volume controls and browser-compatible audio resumption

### 🎨 ASCII Art Generator  
**Image-to-ASCII conversion** with real-time processing:
- Multiple character sets (detailed, simple, blocks, dots, classic)
- Webcam live preview and batch image processing
- Advanced options: brightness, contrast, dithering algorithms

### 💻 Code Editor
**Full-featured ASCII-style code editor** with syntax highlighting:
- Multi-language support (JS, TS, Python, CSS, HTML, JSON)
- 4 retro themes (green terminal, amber, cyan, classic)
- Multi-tab editing, auto-indentation, bracket matching

### 🔗 Network Visualizer
**Interactive network topology diagrams** with ASCII aesthetics:
- 5 layout algorithms (force-directed, hierarchical, circular, grid, tree)
- Real-time monitoring with status updates and event tracking  
- Network analysis: path finding, metrics calculation, hub detection

## Install

```bash
npm install react-ascii-ui
```

## Quick Start

```tsx
import { 
  AsciiButton, 
  AsciiInput, 
  AsciiSelect, 
  AsciiDivider,
  AsciiCard,
  AsciiAlert 
} from "react-ascii-ui";

export default function Demo() {
  return (
    <div className="bg-black text-white p-4 space-y-4">
      <AsciiCard title="Dashboard">
        <AsciiAlert variant="info" title="Welcome">
          Ready to build some ASCII magic?
        </AsciiAlert>
        
        <div className="space-y-2 mt-4">
          <AsciiInput placeholder="Search..." />
          <AsciiSelect>
            <option>All Items</option>
            <option>Recent</option>
            <option>Favorites</option>
          </AsciiSelect>
          <AsciiButton onClick={() => alert("ASCII!")}>
            [ Generate ]
          </AsciiButton>
        </div>
        
        <AsciiDivider />
      </AsciiCard>
    </div>
  );
}
```

## 🎮 Live Demo Applications

See the full potential with **10 interactive demo apps**:

- **[Dashboard](https://react-ascii-ui-docs.vercel.app/dashboard)** - Admin panel with metrics and analytics
- **[Terminal](https://react-ascii-ui-docs.vercel.app/terminal)** - Interactive command-line interface
- **[IDE](https://react-ascii-ui-docs.vercel.app/ide)** - Full development environment with file explorer
- **[Music Player](https://react-ascii-ui-docs.vercel.app/music-player)** - Complete audio player with playlists
- **[Chat App](https://react-ascii-ui-docs.vercel.app/chat)** - Real-time messaging with channels
- **[Email Client](https://react-ascii-ui-docs.vercel.app/email)** - Three-pane email interface
- **[File Manager](https://react-ascii-ui-docs.vercel.app/file-manager)** - Directory browser with navigation
- **[Monitoring](https://react-ascii-ui-docs.vercel.app/monitoring)** - System dashboard with live metrics

## 📦 Complete Component Library

**50+ components and systems** across 6 categories - everything you need for ASCII UIs:

### 🔧 Forms & Inputs
- `AsciiButton` - `[ Click Me ]` clickable buttons
- `AsciiInput` - `[ ________ ]` text inputs  
- `AsciiSelect` - `[ Option ▼ ]` dropdowns
- `AsciiCheckbox` - `[x] Checked` / `[ ] Unchecked`
- `AsciiRadioGroup` - `(•) Selected` / `( ) Option`
- `AsciiTextarea` - Multi-line text input
- `AsciiSwitch` - `[ ON ]` / `[ OFF ]` toggles

### 📐 Layout & Structure
- `AsciiCard` - Bordered containers with optional titles
- `AsciiDivider` - `--------------------` separators
- `AsciiTable` - Data tables with ASCII borders
- `AsciiNavbar` - Top navigation bars
- `AsciiSidebar` - Vertical navigation menus
- `AsciiTabs` - `[ Tab1 ] [ Tab2 ] [ Tab3 ]`
- `AsciiAccordion` - Expandable sections
- `AsciiPagination` - `[ Prev ] 1 2 3 [ Next ]`

### 💬 Feedback & Overlays
- `AsciiAlert` - `(!) Error` / `(✓) Success` messages
- `AsciiBadge` - `[ NEW ]` / `{ Info }` tags
- `AsciiLoader` - `...loading...` / `[▓▓░░░░]` progress
- `AsciiModal` - Popup dialogs with borders
- `AsciiToast` - Floating notifications
- `AsciiTooltip` - Hover info with `^ arrows`
- `AsciiProgressBar` - `▓▓▓░░░░ (40%)` progress bars

### 🎨 Utilities & Fun
- `AsciiCalendar` - Month grids for date selection
- `AsciiAvatar` - `(@UV)` user initials
- `AsciiChart` - `▇▇▇▃▂` data visualization
- `AsciiTree` - Hierarchical data with `[+]` expansion
- `AsciiPopover` - Contextual overlays with smart positioning

### 🚀 **Advanced Systems**
- `AsciiSoundProvider` - Complete audio system with retro sound effects
- `AsciiArtGenerator` - Real-time image-to-ASCII conversion with webcam support
- `AsciiCodeEditor` - Multi-language code editor with syntax highlighting
- `AsciiNetworkVisualizer` - Interactive network topology diagrams

### 🎵 **Sound Hooks**
- `useButtonSounds()` - Click and hover audio feedback
- `useTerminalSounds()` - Keyboard typing simulation  
- `useFormSounds()` - Form submission and validation audio
- `useSystemSounds()` - Notifications, alerts, and system events
- `useAmbientSounds()` - Background static and atmospheric audio

## 🎯 Features

- **TypeScript** - Fully typed with IntelliSense support
- **Web Audio API** - Real-time sound generation and audio feedback
- **Advanced Image Processing** - Canvas-based ASCII art conversion
- **Multi-language Syntax Highlighting** - Custom tokenizers for 6+ languages
- **Interactive Network Diagrams** - SVG-based topology visualization
- **Accessible** - Keyboard navigation, ARIA support, and screen reader friendly
- **Consistent API** - Predictable props across all components
- **Customizable Themes** - Multiple ASCII color schemes and styling options
- **Performance Optimized** - Efficient rendering and memory management

## 🎨 Styling

Components work best with dark backgrounds and monospace fonts:

```tsx
// Recommended container styling
<div className="bg-black text-white font-mono p-4">
  {/* Your ASCII components */}
</div>
```

All components support `className` prop for customization and follow consistent color patterns:
- **White**: Default text and borders
- **Green**: Active/success states and hover effects  
- **Yellow**: Warning states and "today" highlights
- **Red**: Error states and danger actions
- **Blue**: Info states and primary actions

## 🚀 Perfect For

- **Developer Tools** - CLIs, terminals, code editors, network monitoring
- **Retro Dashboards** - System monitoring, analytics, admin panels with real-time updates
- **Creative Applications** - ASCII art generators, image processing tools, multimedia apps
- **Network Administration** - Topology visualization, status monitoring, diagnostic tools
- **Audio Applications** - Music players, sound effects, interactive audio experiences
- **Hackathon Projects** - Stand out with unique ASCII styling and advanced features
- **Easter Eggs** - Hidden ASCII modes, retro themes, and nostalgic experiences
- **Educational Tools** - Learning interfaces for programming, networking, and system administration

## 📝 License

MIT © Mikel Vu

---

*Built with ❤️ for the ASCII aesthetic revolution* 🎯
