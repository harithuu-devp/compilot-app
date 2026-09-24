# ComPilot UI Visual Redesign v2 — Codex Master Specification

> Project: ComPilot (Next.js App Router + Tailwind CSS v4 + TypeScript)

## Mission

Redesign ONLY the visual layer of the application.

DO NOT change:
- Folder structure
- Component hierarchy
- Business logic
- API calls
- State management
- Routing
- Authentication
- Server Actions
- Behaviour

Only improve styling, layout, spacing, colors, glassmorphism, gradients, responsiveness, and animations.

## Tailwind Version

This project uses Tailwind CSS v4.

Requirements:
- Use Tailwind v4 syntax.
- Use CSS variables defined in globals.css.
- Do NOT install UI libraries.
- Keep existing reusable classes like glass-card, glass-panel, field, nav-link, icon-button.

## Design Philosophy

Premium dashboard inspired by Linear, Vercel, Apple Glass UI, Raycast, and modern Bootstrap admin templates.

Visual style:
- Frosted glass.
- Aurora gradients.
- Floating panels.
- Rounded corners.
- Blue/Purple glow.
- Spacious layout.
- Smooth animations.

Everything must support both Light Mode and Dark Mode.

## Layout Rules

- Fixed glass header.
- Floating glass sidebar with equal 24px spacing on left, top, and bottom.
- Sidebar and main content start on the same horizontal line.
- Main content inside a reusable glass container.
- Footer below content.

## Background

Dark mode:
- Background #070B14.
- Cyan radial glow top-left.
- Violet radial glow top-right.
- Pink radial glow bottom-center.
- Background fixed.

Light mode:
- White/Blue/Purple soft aurora.

## Header

Keep Header.tsx logic unchanged.

Visuals:
- Fixed.
- Full width.
- Height 72px.
- Backdrop blur 30px.
- Transparent glass background.
- Thin bottom border.
- Small bottom shadow.
- User profile capsule is glass.

## Sidebar

Keep Sidebar.tsx collapse behaviour unchanged.

Visuals:
- Floating.
- Sticky.
- Width 288px expanded / 96px collapsed.
- Radius 28px.
- Backdrop blur 30px.
- Glass gradient.
- Equal spacing from header and bottom.
- Active navigation uses blue/purple gradient.
- Hover uses soft glass highlight.
- Logout pinned to bottom.
- Width transition 500ms cubic-bezier.

## Main Content

Keep page components unchanged.

Visuals:
- Glass panel.
- Radius 28px.
- Blur.
- Soft border.
- Floating shadow.
- Padding 32px desktop / 24px tablet / 20px mobile.

## Glass Cards

Reusable style:
- Radius 28px.
- Gradient overlay.
- Glass blur.
- Border rgba(255,255,255,.08).
- Inner highlight.
- Shadow.
- Hover lift + glow.

## Forms

Inputs:
- Height 52px.
- Radius 16px.
- Glass fill.
- Blue focus ring.
- Placeholder muted.

Textarea:
- Radius 16px.
- Min height 160px.

Buttons:
Primary:
- Blue → Indigo gradient.
- Glow shadow.
Secondary:
- Glass button.
Danger:
- Red translucent glass.

## Tables

- Glass container.
- Darker header.
- Hover rows.
- Rounded container.
- Status pills.

## Footer

- Centered.
- Muted.
- 24px spacing.

## Mobile

- Fixed header.
- Bottom navbar.
- Sidebar hidden.
- Cards full width.

## globals.css

Refactor reusable classes only:
- glass-panel
- glass-card
- field
- field-label
- button-primary
- button-secondary
- nav-link
- nav-link-active
- icon-button

Use CSS variables everywhere.

## Deliverables

Modify ONLY:
- globals.css
- Header.tsx
- Sidebar.tsx
- MainLayout.tsx
- Footer.tsx

Do NOT modify logic or behaviour.
