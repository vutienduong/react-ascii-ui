# React ASCII UI - Storybook

Interactive component documentation and playground for React ASCII UI.

## 🚀 Getting Started

### Development Server
```bash
npm run storybook
```
Opens Storybook at `http://localhost:6006`

### Build for Production
```bash
npm run build-storybook
```
Generates static files in `storybook-static/`

## 🎨 Features

### Theme System
- **7 ASCII Themes**: Use the theme selector (paintbrush icon) in the toolbar
- **Real-time Switching**: See components adapt to different themes instantly
- **Global Controls**: Theme changes apply to all stories simultaneously

### Interactive Stories
- **Controls Panel**: Adjust component props in real-time
- **Actions Panel**: Monitor component events and interactions
- **Docs**: Auto-generated documentation with prop tables

### Component Categories

#### **Components**
- `AsciiButton` - Bracketed interactive buttons
- `AsciiBadge` - Color-coded status badges  
- `AsciiCard` - Bordered content containers
- `AsciiInput` - Terminal-style input fields
- `AsciiAlert` - Themed notification messages

#### **Animations**  
- `AsciiSpinner` - Loading animations (10+ variants)
- `AsciiTypewriter` - Typing text effects
- `AsciiMatrixRain` - Digital character rain
- `AsciiTransition` - State change animations

#### **Overview**
- `Theme Showcase` - Complete component demonstration
- Interactive examples across all themes

## 🎯 Usage

Each story includes:
- **Canvas**: Interactive component preview
- **Controls**: Real-time prop adjustment
- **Actions**: Event logging
- **Docs**: Generated documentation

## 📦 Deployment

Storybook builds to static files and can be deployed to:
- Vercel/Netlify
- GitHub Pages  
- AWS S3
- Any static hosting service

The built files are in `storybook-static/` after running `npm run build-storybook`.

## 🔧 Development

Stories are located in `src/stories/` and follow the `*.stories.ts` pattern.

### Adding New Stories
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from '../components/YourComponent';

const meta = {
  title: 'Components/YourComponent',
  component: YourComponent,
  // ... configuration
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // ... props
  },
};
```

The theme provider decorator is automatically applied to all stories, ensuring consistent theming across the documentation.