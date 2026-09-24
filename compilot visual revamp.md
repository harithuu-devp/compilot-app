# ComPilot UI Redesign V7 — Layout Architecture & Typography Fix (Tailwind CSS v4)

> **Purpose:** Fix the remaining layout and typography issues after V3/V4.
>
> **Framework:** Next.js App Router + Tailwind CSS v4 + TypeScript.
>
> This is an **implementation patch**, not a redesign.

---

# Mission

Refactor only the **layout composition** so the sidebar and page content are managed by a shared parent component.

Also fix typography in light mode by removing opacity/fading effects.

**Keep every feature and behavior exactly the same.**

---

# Critical Rule — Do NOT Change Logic

Do NOT modify:

* Routing.
* API calls.
* Authentication.
* Server Actions.
* React hooks.
* Component props.
* Folder structure.
* Mobile bottom navigation behavior.
* Sidebar collapse logic.
* Theme toggle logic.

Only change layout composition and styling.

---

# 1. New Layout Architecture (MANDATORY)

## Current Architecture (Incorrect)

MainLayout
├── Header
├── Sidebar
└── Main(children)

This causes the sidebar and page content to position independently.

## New Architecture (Required)

MainLayout
├── Header (fixed glass navbar)
└── MainContent (layout container)
├── Sidebar
└── PageContent
├── Dashboard
├── Projects
├── Task Manager
├── Other Pages
└── Footer

MainContent becomes the **single layout owner**.

---

# 2. Refactor MainContent.tsx

MainContent is no longer a simple wrapper.

MainContent must become the parent layout for:

* Sidebar.
* PageContent.

Responsibilities:

* Apply page spacing.
* Align sidebar and content.
* Handle responsive layout.
* Ensure both start on the same horizontal line.

## MainContent Responsibilities

Desktop:

* Display flex row.
* Sidebar fixed width.
* Content fills remaining width.
* Gap between sidebar and content = 24px.

Tablet/Mobile:

* Sidebar hidden.
* Content full width.

## Required Tailwind Classes

Main wrapper:

* flex
* items-start
* gap-6
* px-6
* pt-24
* pb-6

No spacing should exist inside Sidebar for page positioning.

---

# 3. Create New Component — PageContent.tsx

Create a new reusable component.

Purpose:

Wrap every page inside a consistent glass container.

Responsibilities:

* Width management.
* Vertical spacing.
* Footer placement.

## Required Layout

PageContent

* flex-1
* min-w-0
* flex
* flex-col
* gap-6

Footer stays inside PageContent.

---

# 4. Refactor MainLayout.tsx

MainLayout responsibilities:

* Render background blobs.
* Render Header.
* Render MainContent.

Nothing else.

Pseudo hierarchy:

Header

MainContent
Sidebar
PageContent(children)

No sidebar rendered directly inside MainLayout.

---

# 5. Sidebar Alignment Rules (MANDATORY)

Sidebar must start at the exact same vertical position as PageContent.

## Rules

Sidebar wrapper:

* w-72
* shrink-0
* self-start

Sidebar itself:

* sticky
* top-0

Do NOT use:

* top-24
* mt-*
* pt-*
* py-*
* translate-y-*
* relative top-*
* h-full
* min-h-screen

The wrapper already starts below the header.

Sidebar should stick to the wrapper's top.

## Sidebar Height

Viewport height minus:

* Header height (72px).
* Bottom spacing (24px).

Use dynamic viewport units.

Bottom spacing equals left spacing.

---

# 6. Page Content Alignment

PageContent begins on the same row.

No margin-top.

No padding-top besides wrapper padding.

Every page automatically aligns.

---

# 7. Glass Panel Consistency

Sidebar and PageContent use identical glass styling.

Shared class:

glass-panel

Do not duplicate sidebar-specific glass colors.

## Glass Style

Light:

Soft white with slight blue tint.

Dark:

Navy translucent with cyan/violet tint.

Radius:

28px.

Blur:

30px.

Border:

1px solid rgba(255,255,255,.08)

Shadow:

Soft floating shadow.

---

# 8. Typography Refactor (MANDATORY)

The current light theme uses faded text.

Remove ALL opacity-based typography.

## Search Entire Project

Remove:

text-black/50

text-black/60

text-black/70

text-slate-500/70

text-slate-600/60

text-slate-700/70

text-white/70

opacity-50

opacity-60

opacity-70

opacity-80

## Also Remove

bg-clip-text

text-transparent

bg-gradient-to-r

bg-gradient-to-l

mask-image

Gradient text is forbidden for normal typography.

---

# 9. New Semantic Text Color System

Use CSS variables.

## Light Theme

Primary Heading

#0F172A

Secondary Heading

#1E293B

Body

#334155

Secondary Body

#475569

Muted

#64748B

Placeholder

#94A3B8

## Dark Theme

Primary

#F8FAFC

Secondary

#CBD5E1

Muted

#94A3B8

Placeholder

#64748B

Every text element uses variables.

Never opacity.

---

# 10. Labels

Labels must be fully opaque.

Examples:

WORKSPACE

OPERATIONS OVERVIEW

ACTIVE PROJECTS

TASK NAME

DESCRIPTION

Requirements:

* Font weight 600.
* Letter spacing preserved.
* Opacity 100%.

---

# 11. Card Typography

Card titles:

Primary color.

Body:

Secondary color.

Metadata:

Muted color.

Do not inherit opacity.

---

# 12. Navigation Typography

Sidebar inactive:

Light

Slate 700.

Dark

Slate 300.

Hover

Slate 900 / White.

Active

White.

No opacity.

---

# 13. Button Typography

Buttons always use full opacity text.

Primary

White.

Secondary

Primary text color.

Danger

Red 500.

---

# 14. Glass in Light Mode

Current glass washes out typography.

Update glass.

Light mode glass:

* More opaque.
* Slight blue tint.
* Less white bloom.

Text should remain high contrast.

---

# 15. CSS Variable Cleanup

Create semantic variables.

--text-primary

--text-secondary

--text-muted

--glass-bg

--glass-border

--glass-shadow

--accent

--accent-secondary

Use variables everywhere.

---

# 16. Responsive Layout Rules

Desktop

Sidebar visible.

Content aligned.

Tablet

Sidebar hidden.

Content full width.

Mobile

Bottom navbar only.

Header remains fixed.

---

# 17. QA Checklist (Codex Must Verify)

## Layout

* Header fixed.
* Sidebar starts exactly aligned with PageContent.
* Sidebar sticky inside MainContent.
* Equal 24px spacing around layout.

## Typography

* No faded text.
* No gradient text.
* No opacity utilities.
* High contrast in light mode.
* High contrast in dark mode.

## Glass

* Sidebar and PageContent share the same glass style.
* Shadows consistent.
* Borders consistent.
* Blur consistent.

## Behavior

* Sidebar collapse unchanged.
* Header unchanged.
* Theme toggle unchanged.
* Routing unchanged.
* Forms unchanged.

---

# Files Codex May Edit

layouts/MainLayout.tsx

components/common/MainContent.tsx

components/common/Sidebar.tsx

components/common/Header.tsx (layout spacing only)

components/common/PageContent.tsx (NEW)

globals.css

---

# Files Codex Must Not Edit

app/**/*.tsx page logic

services/**

lib/**

auth/**

API routes

Database logic

React hooks

Server Actions

Component behavior

Business logic

---

# Expected Final Result

A production-ready layout where:

* The fixed glass header spans the full width.
* MainContent is the shared parent layout.
* Sidebar and PageContent always begin on the same row.
* Sidebar floats with equal spacing on the left, top, and bottom.
* Light mode typography is fully readable with no faded opacity.
* Dark mode keeps the glassmorphism appearance while maintaining strong text contrast.
* Every page automatically inherits the same layout and spacing without additional per-page margins.
