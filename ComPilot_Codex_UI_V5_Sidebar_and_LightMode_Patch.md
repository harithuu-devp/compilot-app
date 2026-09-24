# ComPilot UI Redesign V5 — Codex Visual Patch

## Sidebar Alignment
- Sidebar and main content start at same Y position.
- MainLayout owns spacing (`pt-24 px-6 pb-6 gap-6 items-start`).
- Sidebar wrapper: `hidden lg:block w-72 shrink-0 self-start`.
- Sidebar: `sticky top-24 h-[calc(100dvh-96px-24px)]`.
- Remove any `mt-*`, `pt-*`, `translate-y-*`, `top-28`, `top-32` from Sidebar.

## Light Mode Typography
- Remove all text opacity utilities (`text-black/50`, `opacity-70`, etc.).
- Use solid colors: headings `text-slate-900`, body `text-slate-700`, secondary `text-slate-600`, caption `text-slate-500`.
- Dark mode: `text-slate-50`, `text-slate-300`, `text-slate-400`.

## Glass Fixes
- Light glass: `rgba(255,255,255,.72)`.
- Dark glass: `rgba(8,15,28,.60)`.
- Same `glass-panel` style for sidebar and cards.

## Deliverables
Edit only `globals.css`, `MainLayout.tsx`, `Sidebar.tsx`, and `Header.tsx` if needed.
