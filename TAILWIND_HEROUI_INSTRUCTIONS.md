# ComPilot UI Design System v3.1

**Version:** 3.1 (Final)
**Framework:** Next.js 16 + App Router + Tailwind CSS v4 + HeroUI v3 + Framer Motion

---

## Overview

This document is the single source of truth for the ComPilot frontend design system. It defines architecture, theming, layout, components, styling tokens, motion, accessibility, and page blueprints.

### Design Inspiration

* Apple Liquid Glass
* Linear
* Raycast
* Vercel
* Arc Browser

### Core Principles

* Premium SaaS appearance.
* Frosted glass UI.
* Blue / Purple / Cyan aurora palette.
* SSR-first architecture.
* Zero layout shift.
* Zero theme flash.
* Reusable design system.

---

# 1. Tech Stack

* Next.js 16 App Router
* TypeScript
* Tailwind CSS v4
* HeroUI v3
* Framer Motion
* Lucide React
* next/font/google (Inter)
* clsx
* tailwind-merge

---

# 2. Folder Structure (Final)

app/
├── globals.css                    # Next.js global stylesheet (imports Tailwind + theme + animations)
├── layout.tsx                     # Root Layout (SSR cookie theme)
├── page.tsx                       # Landing page / redirect page
│
├── (auth)/
│   ├──layout.tsx                  # Authentication layout wrapper
│   └── login/
│       └── page.tsx
│
├── (main)/
│   ├── layout.tsx                 # Dashboard layout wrapper (Header + Sidebar + MobileNavbar + MainContent)
│   └── dashboard/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   └── projects/
│       ├── page.tsx
│       ├── layout.tsx
│       └── create/
│           ├── page.tsx
│           └── layout.tsx
│
components/
├── common/
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── MobileNavbar.tsx
│   ├── MainContent.tsx
│   ├── Breadcrumb.tsx
│   └── AuroraBackground.tsx
│
├── ui/
│   ├── ThemeProvider.tsx          # Custom ThemeProvider (NOT next-themes)
│   ├── ThemeToggle.tsx
│   ├── LoadingSpinner.tsx
│   ├── GlassCard.tsx
│   ├── GlassButton.tsx
│   ├── GlassInput.tsx
│   ├── GlassTextarea.tsx
│   ├── GlassSelect.tsx
│   ├── GlassSearchSelect.tsx
│   ├── GlassCheckbox.tsx
│   ├── GlassRadioGroup.tsx
│   ├── GlassBadge.tsx
│   └── GlassStatCard.tsx
│
│
services/
│ theme/
│   └── actions.ts                 # Theme cookie Server Actions
│
├── auth/
│   └── actions.ts
│
├── project/
│    └── actions.ts
│
lib/
├── utils.ts
├── constants.ts
│ 
styles/
├── theme.css                      # CSS variables & design tokens
├── animations.css                 # Framer Motion & keyframes
├── utilities.css                  # Reusable Tailwind utility classes
├── scrollbar.css                  # Optional custom scrollbar
│ 
public/
├── logo.svg
├── icons/
└── images/

---

# 3. Theme System (Cookie SSR)

## Theme Source of Truth:

Cookie named `theme`.

Possible values:

- light
- dark
- system

Storage Rules:

- Cookie maxAge = 31536000 (1 year).
- Path = "/".
- SameSite = "lax".
- Secure only in production.
- Updated through Server Actions.
- SSR always reads cookies first.
- System theme is used only when cookie is missing.

Never use:

- next-themes.
- localStorage.
- inline theme scripts.
- document.cookie directly inside components.

## Root Layout (`app/layout.tsx`)

Responsibilities:

- Import `app/globals.css`.
- `globals.css` imports `styles/theme.css`, `styles/animations.css`, and `styles/utilities.css`.
- Load Inter font using `next/font/google`.
- Read the `theme` cookie using `cookies()` from `next/headers`.
- Pass `initialTheme` into `ThemeProvider`.
- Apply the `light` or `dark` class on the `<html>` element before rendering.
- Render `{children}` only.

Must NOT contain:

- Sidebar.
- Header.
- Mobile Navbar.
- Dashboard layout.
- Authentication layout.
- Business logic.

## ThemeProvider (`components/ui/ThemeProvider.tsx`)

This is a custom ThemeProvider created for ComPilot.

It is **NOT** HeroUI ThemeProvider.
It is **NOT** next-themes.

Responsibilities:

- Receive `initialTheme`.
- Provide React Context for theme state.
- Synchronize the `<html>` class (`light` / `dark`).
- Call `services/theme/actions.ts`.
- Never read or write localStorage.
- Never inject scripts.

---

# 4. CSS Design Tokens

## Light Theme

| Token         | Value                 |
| ------------- | --------------------- |
| Background    | #F8FBFF               |
| Surface       | rgba(255,255,255,.65) |
| Surface Hover | rgba(255,255,255,.82) |
| Border        | rgba(255,255,255,.45) |
| Text          | #0F172A               |
| Secondary     | #475569               |
| Muted         | #64748B               |

## Dark Theme

| Token         | Value                 |
| ------------- | --------------------- |
| Background    | #07111F               |
| Surface       | rgba(255,255,255,.05) |
| Surface Hover | rgba(255,255,255,.08) |
| Border        | rgba(255,255,255,.12) |
| Text          | #F8FAFC               |
| Secondary     | #CBD5E1               |
| Muted         | #94A3B8               |

## Accent Palette

| Accent       | Hex     |
| ------------ | ------- |
| Primary Blue | #2563EB |
| Indigo       | #4F46E5 |
| Violet       | #7C3AED |
| Lavender     | #A855F7 |
| Cyan         | #22D3EE |
| Turquoise    | #06B6D4 |

---

# 4.1 CSS Variable Tokens

All reusable UI colors must use CSS variables.

Do not hardcode Tailwind colors inside reusable components.

Example tokens:

--bg
--surface
--surface-hover
--glass-border

--text
--text-secondary
--muted

--primary
--secondary
--accent

--success
--warning
--danger
--info

--gradient-primary
--gradient-secondary
--gradient-surface

Theme switching only changes CSS variables.
Components never change color definitions.

---

# 5. Gradient System

Primary:

```css
linear-gradient(
135deg,
#2563EB,
#7C3AED,
#22D3EE
)
```

Secondary:

```css
linear-gradient(
135deg,
#4F46E5,
#8B5CF6
)
```

Use gradients for:

* Buttons.
* Sidebar active state.
* Charts.
* Progress bars.
* Hero headings.
* Login CTA.

---

# 6. Aurora Background

Create reusable component:

components/common/AuroraBackground.tsx

Layers:

1. Top-left Electric Blue radial.
2. Top-right Indigo radial.
3. Center Lavender blur.
4. Bottom-left Turquoise blur.
5. Bottom-right Violet blur.
6. Noise texture overlay.

Performance Rules:

- CSS pseudo-elements only.
- Blur between 140px–200px.
- Opacity between 18%–35%.
- Transform animation only.
- Animation duration between 25s–30s.
- Respect prefers-reduced-motion.
- No canvas.
- No SVG filters.

---

# 7. Glassmorphism System

Glass surfaces use:

* backdrop-blur-2xl
* rounded-3xl
* translucent border
* ambient shadow
* soft glow

Hover:

* translateY(-2px)
* brighter border
* brighter surface

---

# 8. Typography

Font:

Inter.

Weights:

300–800.

Rules:

* Headings semibold.
* Body normal.
* Numbers tabular.
* Letter spacing slightly tighter for titles.

---

# 9. Layout Specifications

## Root Layout

File:

app/layout.tsx

Purpose:

Initialize the application shell.

Contains:

- HTML
- Body
- Inter font
- ThemeProvider
- Children

## Main Layout

File:

layout/MainLayout.tsx

Purpose:

Reusable dashboard wrapper.

Contains:

- AuroraBackground
- Sidebar
- Header
- MainContent
- MobileNavbar

Desktop:

- Sidebar fixed.
- Header fixed.
- Content scrolls independently.

Mobile:

- Sidebar hidden.
- Header fixed.
- MobileNavbar visible.

## Auth Layout

File:

layout/AuthLayout.tsx

Purpose:

Reusable authentication wrapper.

Contains:

- AuroraBackground
- Centered auth container.

No sidebar/header/footer.

---

# 10. Sidebar Specification

Expanded width:

280px.

Collapsed:

88px.

Features:

* Smooth collapse.
* Icons remain centered.
* Labels fade.
* Tooltip in collapsed mode.

Active item:

Blue → Violet gradient background.

Border left:

3px solid blue.

Sidebar Animation Rules:

Use Framer Motion Layout animations.

Duration:

300ms.

Ease:

easeOut.

Behavior:

- Animate width.
- Animate MainContent margin-left.
- Labels fade.
- Icons remain centered.
- No layout jumping.

---

# 11. Header Specification

Header is fixed to the top edge.

Height: 72px.

Width: 100%.

No rounded corners.

No floating margin.

Glass blur background.

Border bottom appears when scrolling.

Contains:

- Sidebar collapse button.
- Breadcrumb.
- Global Search.
- Notification button.
- ThemeToggle.
- User Avatar.

Header never scrolls with page content.

---

# 12. MainContent

Desktop padding:

32px.

Tablet:

24px.

Mobile:

20px.

Top margin:

88px.

Bottom mobile padding:

120px.

---

# 13. Mobile Navigation

Floating glass pill.

Bottom center.

Icons:

* Dashboard
* Projects
* Create
* Notifications
* Profile

Hidden on desktop.

---

# 14. Component Library

## GlassCard

Reusable glass container.

Radius 24px.

Blur 24px.

Padding 24px.

## GlassButton

Variants:

* Primary
* Secondary
* Ghost
* Danger

Primary uses blue/violet/cyan gradient.

## GlassInput

Rounded 2XL.

Blue focus ring.

Cyan glow.

## GlassTextarea

Same as input.

Auto resize.

## GlassSelect

HeroUI Select.

Glass dropdown.

## GlassSearchSelect

Autocomplete with search icon.

## GlassCheckbox

HeroUI checkbox with blue accent.

## GlassRadioGroup

Card-style radio.

Selected card glows blue/violet.

## GlassBadge

Gradient pills.

Variants:

* Success
* Warning
* Danger
* Info
* Purple

## GlassStatCard

Dashboard analytics card with gradient icon circle and hover glow.

---

# 15. Motion System

Use Framer Motion.

Duration:

250–350ms.

Ease:

easeOut.

Animations:

* Sidebar collapse.
* Cards.
* Dropdowns.
* Page transitions.
* Hover glow.
* Loading spinner.

---

# 16. Responsive System

Breakpoints:

| Breakpoint | Purpose |
| ---------- | ------- |
| Mobile     | default |
| Tablet     | md      |
| Desktop    | lg      |
| Wide       | xl      |

Rules:

* Sidebar hidden below lg.
* Mobile navbar shown below lg.
* Tables become cards on mobile.

---

# 17. Dashboard Blueprint

Sections:

* Welcome.
* Stats cards.
* Traffic chart.
* Top pages.
* Devices.
* Browser analytics.
* Countries.
* Transactions.
* Calendar.
* Sources.

Everything uses GlassCard.

---

# 18. Projects Blueprint

Top toolbar:

* Search.
* Filter.
* Sort.
* Create Project.

Grid layout.

First card is Create Project.

Dashed border.

Gradient plus icon.

---

# 19. Create Project Blueprint

Glass form divided into sections.

Fields:

* Project name.
* Description.
* Category.
* Template.
* Visibility.
* Features.
* Members.
* Tags.

Sticky action bar on mobile.

---

# 20. Login Blueprint

Centered glass card.

Aurora background.

Gradient login button.

Google glass button.

Fade-up animation.

---

# 21. Utility Classes

Core utility classes:

glass
glass-hover
glass-panel
glass-sidebar
glass-input
glass-button
glass-border

aurora-bg
text-gradient

glow-blue
glow-violet
glow-cyan

glass-scrollbar

transition-glass

All utilities must be implemented inside:

styles/utilities.css

using @layer utilities.

---

# 22. Shadow System

| Shadow        | Value                           |
| ------------- | ------------------------------- |
| Ambient Dark  | 0 12px 48px rgba(0,0,0,.32)     |
| Ambient Light | 0 12px 40px rgba(37,99,235,.08) |
| Blue Glow     | 0 0 35px rgba(59,130,246,.20)   |
| Violet Glow   | 0 0 35px rgba(124,58,237,.18)   |
| Cyan Glow     | 0 0 35px rgba(34,211,238,.15)   |

---

# 23. Accessibility

* Keyboard navigation.
* ARIA labels.
* WCAG AA contrast.
* Focus-visible rings.
* Reduced motion support.

---

## Codex Implementation Rules

Architecture

- Server Components by default.
- Client Components only for interactive UI.
- ThemeProvider is the only Context provider.

Styling

- Tailwind CSS v4 only.
- CSS Variables for colors.
- No inline styles.
- No CSS Modules.
- No duplicated utility classes.

Theme

- Theme stored in cookies only.
- Theme actions live in services/theme/actions.ts.
- Never use next-themes.
- Never use localStorage.
- Never inject scripts into HTML.

Components

- UI components remain inside components/ui.
- Shared layout components remain inside components/common.
- MainLayout and AuthLayout remain inside layout/.

Code Quality

- Strong TypeScript types.
- Reusable props.
- No business logic inside UI.
- No Zustand.
- No Redux.

---

# Final Goal

ComPilot should be visually consistent across light and dark mode with:

* Apple-style Liquid Glass.
* Linear-inspired spacing and typography.
* Raycast-style glass surfaces.
* Vercel-inspired gradients.
* Blue / Violet / Cyan aurora background.
* Smooth animations.
* Production-ready component architecture.
