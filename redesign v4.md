# ComPilot UI Redesign v3 — Codex Master Specification (Tailwind CSS v4)

> **Project:** ComPilot — Event Operations Workspace
>
> **Framework:** Next.js App Router + Tailwind CSS v4 + TypeScript

---

# 1. Objective

Redesign the **entire UI layer** of ComPilot into a premium SaaS dashboard using **glassmorphism**, **aurora gradients**, and a **consistent design system**.

This redesign is **visual only**.

## DO NOT MODIFY

The following must remain exactly the same:

* Folder structure.
* Component names.
* Props.
* React logic.
* Hooks.
* State management.
* Authentication.
* API routes.
* Server Actions.
* Data fetching.
* Form submission behaviour.
* Navigation.
* MobileBottomNavbar behaviour.

Codex should only modify **styles, layout wrappers, spacing, reusable UI classes, and animations**.

---

# 2. Existing Project Structure (Preserve)

app/
layouts/
components/
common/
Header.tsx
Sidebar.tsx
Footer.tsx
MainContent.tsx
MobileBottomNavbar.tsx
views/
task-manager/
CreateTaskForm.tsx
TaskList.tsx
ui/
LoadingSpinner.tsx
globals.css

Do not move or rename these files.

---

# 3. Visual Direction

The interface should feel like a combination of:

* Linear Dashboard
* Vercel Dashboard
* Apple macOS Sonoma Glass
* Raycast
* Bootstrap 5 Glass Admin Template

Characteristics:

* Frosted glass panels.
* Floating sidebar.
* Sticky glass header.
* Aurora background.
* Elegant spacing.
* Soft gradients.
* Blue / Cyan / Purple glow.
* Smooth transitions.
* Minimal but premium.

---

# 4. Global Design Tokens

Everything should use CSS variables inside globals.css.

## Light Theme

Background

--bg-base: #F5F7FB;

Glass

--glass-bg: rgba(255,255,255,.65);

Accent

--accent: #3B82F6;
--accent-secondary: #7C3AED;
--accent-cyan: #22D3EE;
--accent-pink: #EC4899;

Text

--foreground: #172033;
--muted: #64748B;

Border

--line: rgba(148,163,184,.18);

## Dark Theme

Background

--bg-base: #070B14;

Glass

--glass-bg: rgba(10,20,35,.55);

Accent

--accent: #60A5FA;
--accent-secondary: #8B5CF6;
--accent-cyan: #22D3EE;
--accent-pink: #EC4899;

Text

--foreground: #F1F5F9;
--muted: #94A3B8;

Border

--line: rgba(255,255,255,.08);

---

# 5. Body Background (Aurora)

Replace current background with layered radial gradients.

Requirements:

Dark mode:

* Cyan glow top-left.
* Purple glow top-right.
* Pink glow bottom-center.
* Deep navy background.

Light mode:

* White base.
* Soft cyan/purple gradients.
* Very low opacity.

Implementation notes:

* background-attachment: fixed.
* background-repeat: no-repeat.
* background-size: cover.
* overflow-x hidden.

The background must remain visible through glass panels.

---

# 6. Layout System

## MainLayout.tsx

Keep structure.

Desired hierarchy:

Header (fixed)
Content Wrapper
Sidebar
Main Content
Footer

### Wrapper

Padding:

24px desktop.

20px tablet.

16px mobile.

Gap between sidebar and content:

24px.

### Important

Sidebar and main content start at the exact same Y coordinate.

---

# 7. Header Redesign

File:

components/common/Header.tsx

Do not change functionality.

### Layout

Height:

72px.

Position:

fixed.

Width:

100%.

Top:

0.

z-index:

50.

### Appearance

* Glass.
* Blur 30px.
* Saturation 180%.
* Bottom border.
* Soft shadow below.
* Slight gradient overlay.

### Left Side

Logo.

ComPilot.

Subtitle.

Spacing 12px.

### Right Side

Theme Toggle.

Notification icon placeholder.

User Avatar.

Username.

Role.

Avatar sits inside rounded glass capsule.

---

# 8. Sidebar Redesign

File:

Sidebar.tsx

Keep collapse behaviour.

## Floating Sidebar

Must NOT touch browser edges.

Spacing:

Top: 24px below header.

Left: 24px.

Bottom: 24px.

Height automatically fills remaining viewport.

### Width

Expanded:

288px.

Collapsed:

96px.

### Appearance

Glass panel.

Radius:

28px.

Blur:

30px.

Gradient tint.

Inner highlight.

Border.

Shadow.

### Collapse Animation

* Width transition.
* Labels fade.
* Icons stay centered.
* Chevron rotates.

Timing:

500ms cubic-bezier(.22,1,.36,1)

### Navigation

Hover

Soft blue/cyan glow.

Active

Gradient pill.

Blue → Violet.

Soft shadow.

Rounded 16px.

Logout pinned bottom.

---

# 9. Main Content Panel

Every page content is inside reusable glass panel.

Radius:

28px.

Padding:

32px desktop.

24px tablet.

20px mobile.

Shadow:

Large floating shadow.

Border.

Gradient overlay.

---

# 10. Glass Card Design

Shared utility.

Properties:

* Radius 28px.
* Border rgba white 8%.
* Backdrop blur 30px.
* Saturation 180%.
* Gradient overlay.
* Inner highlight.
* Soft outer shadow.

Hover:

TranslateY(-2px).

Increase glow.

Transition 250ms.

---

# 11. Forms

Applies to:

CreateTaskForm.

Project forms.

Future forms.

## Labels

Uppercase optional.

Muted.

Weight 600.

Letter spacing.

## Inputs

Height:

52px.

Radius:

16px.

Glass fill.

Border.

Placeholder muted.

Hover border brighter.

Focus

Blue ring.

Shadow.

Slight darker glass.

## Textarea

Radius 16px.

Min height 160px.

Glass.

---

# 12. Buttons

Primary

Blue → Indigo gradient.

Radius 16px.

Glow.

Hover lift.

Secondary

Glass button.

Border.

Backdrop blur.

Hover border brighter.

Danger

Red translucent.

---

# 13. Tables

TaskList.

ProjectList.

Future tables.

Glass container.

Rounded 24px.

Header darker.

Rows translucent.

Hover blur.

Sticky header.

Status pills colorful.

---

# 14. Typography

Use Inter if already installed.

Hierarchy:

H1

32px.

Bold.

H2

24px.

Semibold.

H3

20px.

Semibold.

Body

15–16px.

Caption

13px muted.

---

# 15. Footer

Minimal.

Centered.

Muted.

24px spacing.

No border.

---

# 16. Scrollbar

Modern scrollbar.

Dark mode:

Dark thumb.

Blue hover.

Light mode:

Slate thumb.

Rounded.

---

# 17. Mobile Layout

Header fixed.

Bottom navbar visible.

Sidebar hidden.

Cards full width.

16px padding.

---

# 18. Reusable Utility Classes (globals.css)

Create reusable classes only.

glass-panel

glass-card

glass-button

field

field-label

button-primary

button-secondary

nav-link

nav-link-active

icon-button

status-pill

All pages should reuse these classes.

---

# 19. Shadows

Use consistent shadows.

Glass

0 20px 60px rgba(0,0,0,.35)

Hover

0 30px 70px rgba(59,130,246,.18)

Header

0 4px 20px rgba(0,0,0,.15)

---

# 20. Border Radius System

Button

16px.

Input

16px.

Small card

20px.

Glass panel

28px.

Avatar capsule

9999px.

---

# 21. Motion System

Duration:

250ms default.

Sidebar:

500ms.

Hover lift.

Focus ring.

Glow transitions.

No excessive animations.

---

# 22. Accessibility

Keep contrast AA compliant.

Focus visible.

Hover not required for functionality.

Do not reduce readability because of transparency.

---

# 23. Files Codex May Edit

globals.css

components/common/Header.tsx

components/common/Sidebar.tsx

components/common/Footer.tsx

layouts/MainLayout.tsx

components/common/MainContent.tsx

Reusable UI components only.

---

# 24. Files Codex Must Not Edit

Server Actions.

API.

lib/.

services/.

auth.

Database.

Types.

Page logic.

Hooks.

React behaviour.

---

# 25. Expected Final Result

A polished production-ready dashboard where:

* Header is sticky glass across the full screen.
* Sidebar floats with equal spacing on every side.
* Sidebar collapse animation is smooth like Bootstrap.
* Main content aligns perfectly with sidebar.
* Every card uses consistent glassmorphism.
* Background shows elegant aurora gradients.
* Light mode feels bright and airy.
* Dark mode feels rich with blue, cyan, and purple glass reflections.
* The entire application has one cohesive design system while preserving all existing functionality and project structure.
