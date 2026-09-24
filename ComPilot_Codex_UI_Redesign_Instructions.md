# ComPilot UI Visual Redesign Specification (Codex Instructions)

## Goal

Redesign the entire ComPilot Next.js + TailwindCSS application into a modern premium SaaS dashboard with glassmorphism and gradients in both Light and Dark Mode.

**Design keywords**

- Glassmorphism
- Aurora gradients
- Floating panels
- Premium SaaS
- Apple/macOS + Linear + Vercel aesthetics
- Soft shadows
- Rounded corners
- Blur effects
- Smooth animations

---

## Tech Stack

- Next.js App Router
- Tailwind CSS v4
- TypeScript
- Lucide Icons
- CSS Variables for theme colors
- Existing ThemeToggle (`data-theme="light"` / `"dark"`)

---

# Overall Design System

## Layout Hierarchy

```text
Body (gradient background)
│
├── Fixed Glass Header (100% width)
│
└── Content Wrapper (padding 24px)
      │
      ├── Floating Sidebar
      │
      └── Main Content
            │
            ├── Glass Cards
            ├── Tables
            ├── Forms
            └── Footer
```

Spacing must be consistent everywhere.

| Element | Spacing |
|----------|----------|
| Header → Content | 24px |
| Left Edge → Sidebar | 24px |
| Sidebar → Main Content | 24px |
| Bottom Gap | 24px |
| Card Padding | 28–32px |

---

# Color Palette

## Light Mode

Background:
- `#F5F7FB`

Glass:
- rgba(255,255,255,0.65)

Primary Accent:
- `#3B82F6`

Secondary Accent:
- `#7C3AED`

Glow Colors:
- Cyan
- Violet
- Pink

Text:
- Primary `#172033`
- Secondary `#64748B`

Borders:
- rgba(255,255,255,0.6)

---

## Dark Mode

Background:
- `#070B14`

Glass Surface:
- rgba(10,20,35,0.55)

Accent Blue:
- `#60A5FA`

Accent Purple:
- `#8B5CF6`

Accent Cyan:
- `#22D3EE`

Accent Pink:
- `#EC4899`

Text:
- White
- Slate 300
- Slate 400

Border:
- rgba(255,255,255,0.08)

---

# Background

Replace the current background with layered radial gradients.

### Requirements

Body should contain three blurred aurora blobs.

Top Left:
- Cyan glow

Top Right:
- Violet glow

Bottom Center:
- Pink glow

Requirements:

- Fixed attachment.
- No repeating.
- Entire screen coverage.
- Background behind every glass component.

---

# Header

## Position

Header MUST be:

- Fixed.
- Full width.
- Height: 72px.
- Top: 0.
- z-index above sidebar.

## Appearance

Glass navbar.

Properties:

- Backdrop blur 28–32px.
- Saturation 180%.
- Slight transparency.
- Thin bottom border.
- Small shadow underneath.
- Background fades with page.

No rounded corners.

### Left Section

Logo icon.

Text:

ComPilot

Subtitle:

Event operations workspace

Spacing:
12px between icon and text.

### Right Section

Contains:

- Theme toggle.
- Notification placeholder.
- User avatar.
- User name.
- Role.

User section inside rounded glass capsule.

---

# Sidebar

## Position

Sidebar is NOT attached to edges.

Requirements:

- Sticky.
- Starts 24px below header.
- Left margin 24px.
- Bottom margin 24px.
- Same vertical starting line as main content.

Sidebar floats.

## Size

Expanded:
288px.

Collapsed:
96px.

Height:

Viewport minus:

Header height.

Top gap.

Bottom gap.

Equal bottom spacing.

## Appearance

Glass panel.

Large radius:
28px.

Blur:
30px.

Very subtle inner highlight.

Gradient tint from cyan to violet.

## Navigation

Links inside rounded pills.

Hover:

Soft gradient background.

Active:

Blue-violet gradient.

Glow shadow.

Icons remain centered during collapse.

Labels fade + slide.

Collapse animation:

500ms cubic-bezier.

Width animates smoothly.

---

# Main Content

Main content should align perfectly with sidebar.

Starts at same Y coordinate.

Glass panel container.

Padding:
32px desktop.

24px tablet.

20px mobile.

Radius:
28px.

Shadow:
Soft floating shadow.

Blur background.

Subtle border.

---

# Cards

Every feature card uses shared GlassCard component.

### Style

- Radius 28px.
- Gradient overlay.
- Border.
- Blur.
- Inner highlight.
- Floating shadow.

### Hover

Lift 2px.

Increase border opacity.

Increase glow slightly.

Transition 250ms.

---

# Forms

Inputs inspired by Linear + Apple.

## Input

Height:
52px.

Radius:
16px.

Glass fill.

Border.

Blue focus ring.

Placeholder muted.

## Textarea

Radius 16px.

Minimum height 160px.

Glass background.

## Labels

Small uppercase.

Medium weight.

Letter spacing.

---

# Buttons

## Primary

Gradient:

Blue → Indigo.

Radius 16px.

Glow shadow.

Hover:

Slight lift.

Brightness increase.

## Secondary

Glass button.

Transparent.

Border.

Hover adds blur and border.

## Danger

Red translucent.

---

# Tables

Tables inside glass card.

Header darker than rows.

Rows:

Hover blur.

Border bottom.

Rounded table container.

Status pills.

---

# Footer

Centered.

Muted text.

No border.

24px spacing from last content.

---

# Mobile Layout

Sidebar hidden.

Bottom navigation appears.

Header remains fixed.

Cards become full width.

Padding 16px.

---

# Animations

## Global

Duration:
250ms.

Ease:
ease-out.

## Sidebar

Width animation.

Label fade.

Chevron rotates.

## Cards

Hover lift.

## Buttons

Lift.

Glow.

## Inputs

Focus ring expands.

---

# CSS Variables

Create reusable variables.

```
--bg-base
--glass-bg
--glass-border
--glass-shadow
--glass-highlight
--accent
--accent-secondary
--text-primary
--text-secondary
--line
```

Use variables everywhere.

---

# Components To Refactor

## MainLayout

- Fixed glass header.
- Floating sidebar.
- Main glass container.
- Background blobs.

## Header

- Glass navbar.
- Sticky.
- Shadow.

## Sidebar

- Floating.
- Sticky.
- Collapse animation.
- Equal spacing.

## Footer

- Minimal centered footer.

## GlassCard

Reusable wrapper.

## Form Components

- Inputs.
- Labels.
- Buttons.
- Textarea.

---

# Tailwind Requirements

Prefer utility classes.

Avoid inline styles.

Create reusable classes inside globals.css:

- `.glass-panel`
- `.glass-card`
- `.glass-button`
- `.field`
- `.field-label`
- `.nav-link`
- `.nav-link-active`
- `.icon-button`

---

# Visual Reference

The final UI should resemble premium dashboards like:

- Linear
- Vercel Dashboard
- Raycast
- Notion Calendar
- Apple Settings (glass style)
- Modern Bootstrap 5 glass admin template

The interface should feel elegant, spacious, minimal, and consistent across light and dark themes with strong glassmorphism and aurora gradients.
