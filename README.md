# React ASCII UI

A complete React + Tailwind component library for **ASCII-style UIs** 🎨

Perfect for retro dashboards, hackathon projects, developer tools, and adding some ASCII flair to your apps!

📚 **[View Documentation & Examples →](https://react-ascii-ui-docs.vercel.app)**

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

**31 components** across 4 tiers - everything you need for ASCII UIs:

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

## 🎯 Features

- **TypeScript** - Fully typed with IntelliSense support
- **Tailwind CSS** - Styled with utility classes
- **Accessible** - Keyboard navigation and ARIA support  
- **Consistent API** - Predictable props across all components
- **Customizable** - Color themes, sizes, and variants
- **Zero Dependencies** - Only peer deps: React 18+ and Tailwind

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

- **Developer Tools** - CLIs, terminals, coding environments
- **Retro Dashboards** - Monitoring, analytics, admin panels  
- **Hackathon Projects** - Stand out with unique ASCII styling
- **Easter Eggs** - Hidden ASCII modes in existing apps
- **Prototyping** - Quick and distinctive UI mockups

## 📝 License

MIT © Mikel Vu

---

*Built with ❤️ for the ASCII aesthetic revolution* 🎯
