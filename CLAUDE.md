# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React ASCII UI is a TypeScript React component library that creates ASCII-styled UI components for retro/terminal-style interfaces. Components use monospace fonts and ASCII characters (brackets, symbols) implemented via CSS pseudo-elements.

## Key Development Commands

- `npm run build` - Build library for production (ESM + CJS + TypeScript declarations)
- `npm run dev` - Build in watch mode for development  
- `npm run prepare` - Prepare package for publishing
- `npm pack` - Create tarball for local testing

## Architecture

### Component Structure
- Each component is a separate `.tsx` file in `src/components/`
- All components re-exported in `src/index.ts`
- Components extend native HTML element props for full compatibility
- ASCII styling achieved through Tailwind CSS pseudo-elements

### Current Components
- AsciiButton: `[ Label ]` styling with hover effects
- AsciiInput: `[ ________ ]` input field with brackets
- AsciiSelect: `[ Option ▼ ]` dropdown styling
- AsciiDivider: `--------------------------------------------------` separator

### Component Pattern
```tsx
export const AsciiComponent: React.FC<
  React.HTMLAttributes<HTMLElement>
> = ({ className = "", ...props }) => {
  return (
    <element
      {...props}
      className={`
        font-mono ascii-styling-classes
        ${className}
      `}
    />
  );
};
```

## Development Workflow

### Adding New Components
1. Create `src/components/ComponentName.tsx` following existing patterns
2. Export in `src/index.ts`
3. Update `PROGRESS.md` status from ⬜ Todo to ✅ Done
4. Run `npm run build` to verify compilation

### Styling Conventions
- Use `font-mono` for monospace appearance
- Implement ASCII characters via `before:content-['[']` and `after:content-[']']`
- Default colors: white text with green hover states
- Always support `className` prop override

### Build System
- **tsup**: Handles TypeScript compilation and bundling
- **Output**: Dual ESM/CJS packages with TypeScript declarations
- **Tailwind**: Processes only `src/**/*.{ts,tsx}` files

## Roadmap Reference

See `PROGRESS.md` for comprehensive component roadmap with 29 planned components organized by priority (High/Medium/Low). Current implementation focuses on Phase 1 core primitives.

## Testing

No formal testing framework configured. Verify changes by:
1. Running `npm run build`
2. Testing with `npm pack` and local installation in test React project
3. Checking TypeScript compilation output in `dist/`