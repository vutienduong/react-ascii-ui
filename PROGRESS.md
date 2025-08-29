# 📋 React ASCII UI — Component Checklist

| Component            | Type       | Description (ASCII style)                            | Priority | Status |
| -------------------- | ---------- | ---------------------------------------------------- | -------- | ------ |
| **AsciiButton**      | Form       | `[ Label ]` clickable button                         | ⭐ High   | ✅ Done |
| **AsciiInput**       | Form       | `[ ________ ]` single-line input                     | ⭐ High   | ✅ Done |
| **AsciiSelect**      | Form       | `[ Option ▼ ]` dropdown select                       | ⭐ High   | ✅ Done |
| **AsciiCheckbox**    | Form       | `[x] Label` / `[ ] Label` toggleable checkbox        | ⭐ High   | ✅ Done |
| **AsciiDivider**     | Layout     | `--------------------------------------------------` | ⭐ High   | ✅ Done |
| **AsciiCard**        | Layout     | ASCII-styled container (bordered box)                | ⭐ High   | ✅ Done |
| **AsciiRadioGroup**  | Form       | `( ) Option` / `(•) Selected` radio buttons          | ⭐ High   | ✅ Done |
| **AsciiTextarea**    | Form       | Multi-line ASCII text box `[ ... ]`                  | ⭐ High   | ✅ Done |
| **AsciiAlert**       | Feedback   | `(!) Error: Something went wrong` message            | ⭐ High   | ✅ Done |
| **AsciiBadge**       | Feedback   | `[ NEW ]` / `{ Info }` small tag                     | ⭐ High   | ✅ Done |
| **AsciiLoader**      | Feedback   | `...loading...` or `[▓▓░░░░]` progress indicator     | ⭐ High   | ✅ Done |
| **AsciiNavbar**      | Navigation | Top bar: `[ Dashboard ] [ Products ] [ Settings ]`   | ⭐ Medium | ✅ Done |
| **AsciiSidebar**     | Navigation | Vertical nav menu `[ Item ]` with active state       | ⭐ Medium | ✅ Done |
| **AsciiTabs**        | Navigation | `[ Tab1 ] [ Tab2 ] [ Tab3 ]`                         | ⭐ Medium | ✅ Done |
| **AsciiAccordion**   | Navigation | Expandable ASCII section `> Title`                   | ⭐ Medium | ✅ Done |
| **AsciiTable**       | Layout     | ASCII-styled grid table                              | ⭐ Medium | ✅ Done |
| **AsciiPagination**  | Navigation | `[ Prev ] 1 2 3 [ Next ]` pager                      | ⭐ Medium | ✅ Done |
| **AsciiModal**       | Overlay    | ASCII popup box with `[ Confirm ] [ Cancel ]`        | ⭐ Medium | ✅ Done |
| **AsciiToast**       | Feedback   | Floating ASCII notification `(!) Saved successfully` | ⭐ Medium | ✅ Done |
| **AsciiTooltip**     | Feedback   | Inline hover `^ Info`                                | ⭐ Medium | ⬜ Todo |
| **AsciiProgressBar** | Feedback   | `▓▓▓░░░░ (40%)` loading bar                          | ⭐ Medium | ⬜ Todo |
| **AsciiSwitch**      | Form       | `[ ON ] / [ OFF ]` toggle switch                     | ⭐ Low    | ⬜ Todo |
| **AsciiCalendar**    | Utility    | ASCII month grid (Mon–Sun + dates)                   | ⭐ Low    | ⬜ Todo |
| **AsciiAvatar**      | Utility    | `(@MV)` user initials                                | ⭐ Low    | ⬜ Todo |
| **AsciiChart**       | Utility    | Inline ASCII chart `▇▇▇▃▂`                           | ⭐ Low    | ⬜ Todo |

---

✅ Legend for **Status**:

* ⬜ Todo
* 🟡 In Progress
* ✅ Done

---
Here’s a roadmap of **what to implement** (tiered from essential → nice-to-have):

---

## 🔹 **Tier 1: Core Primitives (MVP)**

These are must-haves. They let someone build a whole app UI.

* **Typography / Layout**

  * `AsciiDivider` → `"------------------------------------------------"`
  * `AsciiCard` → ASCII-framed container
  * `AsciiPanel` / `AsciiBox` → generic layout box
* **Forms**

  * `AsciiButton` → `[ Label ]`
  * `AsciiInput` → `[ ________ ]`
  * `AsciiSelect` → `[ Option ▼ ]`
  * `AsciiCheckbox` → `[x] Label`
  * `AsciiRadioGroup` → `( ) Option`, `(•) Selected`
  * `AsciiTextarea` → ASCII multi-line input `[ ... ]`
* **Feedback**

  * `AsciiAlert` → `(!) Error: Something went wrong`
  * `AsciiBadge` → `[ NEW ]` or `{ Info }`
  * `AsciiLoader` → `...loading...` or `[▓▓░░░░]` progress bar

---

## 🔹 **Tier 2: Navigation & Structure**

These let you structure dashboards/apps.

* `AsciiNavbar` → top bar with `[ Menu ] [ Settings ]`
* `AsciiSidebar` → vertical menu `[ Dashboard ]` `[ Products ]`
* `AsciiTabs` → `[ Tab1 ] [ Tab2 ] [ Tab3 ]`
* `AsciiAccordion` → collapsible ASCII sections `> Title`
* `AsciiTable` → ASCII grid (rows, columns)
* `AsciiPagination` → `[ Prev ] 1 2 3 [ Next ]`

---

## 🔹 **Tier 3: Dialogs & Overlays**

These make it feel more “complete” like shadcn.

* `AsciiModal` →

  ```
  +----------------------------------+
  |   [ Title ]                      |
  |   Message here...                |
  |   [ Cancel ] [ Confirm ]         |
  +----------------------------------+
  ```
* `AsciiToast` → temporary ASCII alert at bottom
* `AsciiTooltip` → hover `^ Info`

---

## 🔹 **Tier 4: Extra ASCII Flavor (Fun)**

To make it unique and meme-worthy:

* `AsciiProgressBar` → `▓▓▓░░░░░░ (40%)`
* `AsciiAvatar` → `(@mikel)` style initials
* `AsciiChart` → mini bar chart like `▇▇▇▃▂`
* `AsciiSwitch` → `[ ON ] / [ OFF ]`
* `AsciiCalendar` → ASCII month grid

---

## ✅ Recommended Initial Roadmap

To not overwhelm yourself:

**Phase 1 (Release v0.1):**

* Button, Input, Select, Checkbox, Divider, Card

**Phase 2 (v0.2):**

* Tabs, Sidebar, Table, Modal, Loader

**Phase 3 (v1.0):**

* Toast, Accordion, Tooltip, ProgressBar

---

## 💡 How to Differentiate from Shadcn/UI

* Shadcn = *“beautiful, production-ready, Radix + Tailwind components.”*
* ASCII UI = *“fun retro mode for dev dashboards, hackathon projects, and Easter eggs.”*
* You can even allow **theme switching**: `[ ASCII Mode ] ↔ [ Normal Mode ]`.