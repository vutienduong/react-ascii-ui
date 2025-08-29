# React ASCII UI

A tiny React + Tailwind component library for **ASCII-style UIs** 🎨

## Install

```bash
npm install react-ascii-ui
```

## Usage

```tsx
import { AsciiButton, AsciiInput, AsciiSelect, AsciiDivider } from "react-ascii-ui";

export default function Demo() {
  return (
    <div className="bg-black text-white p-4 space-y-4">
      <AsciiInput placeholder="Search..." />
      <AsciiSelect>
        <option>All</option>
        <option>Newest</option>
      </AsciiSelect>
      <AsciiButton onClick={() => alert("Clicked!")}>Generate</AsciiButton>
      <AsciiDivider />
    </div>
  );
}
```
