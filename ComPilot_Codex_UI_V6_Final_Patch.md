# ComPilot UI Redesign V6 — Final Visual Patch

## Sidebar Alignment
MainLayout owns all spacing. Wrapper: `flex items-start gap-6 px-6 pt-24 pb-6`. Sidebar wrapper: `hidden lg:block w-72 shrink-0 self-start`. Sidebar uses only `sticky top-24 h-[calc(100dvh-96px-24px)]`. Remove all `mt-*`, `pt-*`, `py-*`, `translate-y-*`, `top-28`, `top-32`, `self-center`, `justify-center`, `items-center`, `h-full`, `min-h-screen` from Sidebar.

## Light Mode Typography
Remove every opacity-based text class (`text-black/60`, `text-slate-700/70`, `opacity-70`, etc.). Use solid colors only: headings `text-slate-900`, body `text-slate-700`, secondary `text-slate-600`, muted `text-slate-500`. Never use `bg-clip-text` or `text-transparent` on text.

## Glass Panels
Light glass: `rgba(255,255,255,.82)` with blur 24px and strong white border. Dark glass: `rgba(8,15,28,.72)` with blur 30px. Sidebar and cards share the same `glass-panel` class.

## Deliverables
Edit only globals.css, MainLayout.tsx, Sidebar.tsx, Header.tsx (spacing only). Keep all logic unchanged.
