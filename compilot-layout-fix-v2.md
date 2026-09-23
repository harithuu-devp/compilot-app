# ComPilot Layout Fix v2 --- Header, Sidebar, Main Content and Footer

## Goal

Fix the current desktop layout so:

1.  Sidebar and Main Content start at **exactly the same vertical
    level**.
2.  The gap between Header and Sidebar is exactly the same as the gap
    between Header and Main Content.
3.  Header and the desktop content shell share the same horizontal
    `max-w-[1600px]` boundary.
4.  Sidebar fills the available content-row height instead of becoming
    half-height.
5.  Sidebar has a visible bottom gap equal to the intended top gap.
6.  Main Content can become taller than the viewport naturally.
7.  Sidebar remains usable while scrolling.
8.  Footer belongs to Main Content.
9.  Do not solve alignment with arbitrary `mt-*`, `translate-y-*`,
    `absolute`, or `fixed` positioning.

------------------------------------------------------------------------

## 1. Important diagnosis

Do **not** use a Sidebar-only rule such as:

``` tsx
lg:max-h-[calc(100dvh-7.5rem)]
```

to solve this.

`max-h-*` only limits the maximum height. It does not make the Sidebar
fill the available content area, so a short Sidebar can become
half-height.

The desired relationship is:

``` text
Header
    ↓ same vertical gap
Content Row
    ├── Sidebar: fills the row
    └── Main Content: natural height
    ↓ bottom spacing
Page bottom
```

The **Content Row should own the shared vertical geometry**.

------------------------------------------------------------------------

## 2. Use one page-shell coordinate system

The hierarchy should be:

``` text
MainLayout
├── Header
└── Desktop Content Row
    ├── Sidebar
    └── MainContent
        ├── Page content
        └── Footer
```

Do not give Header, Sidebar, and MainContent independent page-width
calculations.

The Header and content row should both use:

``` tsx
max-w-[1600px]
```

------------------------------------------------------------------------

## 3. Header: make vertical spacing explicit

Do not use `sticky top-3` as the mechanism that creates the top page
spacing.

Use an actual top padding:

``` tsx
<header className="sticky top-0 z-30 px-3 pt-3 pb-5 sm:px-6">
    <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between rounded-2xl border border-white/40 bg-white/60 px-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60 sm:px-6">
        {/* existing header content */}
    </div>
</header>
```

This creates an explicit relationship:

``` text
viewport
↓
pt-3
↓
Header panel
h-16
↓
pb-5
↓
Content Row
```

This makes it much easier to guarantee that Sidebar and Main Content
start at the same level.

------------------------------------------------------------------------

## 4. MainLayout: make the content row own the height

Use:

``` tsx
export function MainLayout({
    children,
    user,
}: {
    children: ReactNode;
    user: LoggedInUser;
}) {
    return (
        <div className="min-h-dvh">
            <Header user={user} />

            <div className="mx-auto flex max-w-[1600px] items-stretch gap-6 px-3 pb-5 sm:px-6 lg:min-h-[calc(100dvh-6rem)]">
                <Sidebar />

                <MainContent>
                    {children}
                    <Footer />
                </MainContent>
            </div>

            <MobileBottomNavbar />
        </div>
    );
}
```

### Important

The exact:

``` tsx
lg:min-h-[calc(100dvh-6rem)]
```

is based on the current Header geometry and should be adjusted if the
Header's real occupied height differs.

Do not blindly keep changing Sidebar margins to compensate.

The key part is:

``` tsx
items-stretch
```

The Content Row should stretch the Sidebar to the row height.

------------------------------------------------------------------------

## 5. Do not use `items-start` for the final content row

Previous versions used:

``` tsx
items-start
```

That is appropriate when each child should retain its natural height.

For the current requirement, use:

``` tsx
items-stretch
```

because the Sidebar must fill the content row vertically.

Use:

``` tsx
<div className="mx-auto flex max-w-[1600px] items-stretch gap-6 px-3 pb-5 sm:px-6 lg:min-h-[calc(100dvh-6rem)]">
```

This gives:

``` text
┌───────────────┬──────────────────────────────┐
│               │                              │
│               │                              │
│   Sidebar     │       Main Content            │
│               │                              │
│               │                              │
│               │                              │
└───────────────┴──────────────────────────────┘
```

Both columns start at the exact same Y coordinate.

------------------------------------------------------------------------

## 6. Sidebar: remove independent height calculations

Do not use:

``` tsx
lg:h-[calc(100dvh-6rem)]
```

or:

``` tsx
lg:max-h-[calc(100dvh-7.5rem)]
```

if the parent Content Row is responsible for the height.

Start with:

``` tsx
<aside
    className={`glass-panel hidden shrink-0 p-3 lg:sticky lg:top-24 lg:block ${
        collapsed ? "w-20" : "w-60"
    }`}
>
    ...
</aside>
```

The parent row supplies the height.

Do not combine:

``` text
items-stretch
+
h-[calc(...)]
+
max-h-[calc(...)]
```

because these are competing height rules.

------------------------------------------------------------------------

## 7. Sidebar sticky behavior

Keep:

``` tsx
lg:sticky lg:top-24
```

if the Sidebar should remain below the Header while scrolling.

Do not switch to `fixed` just to force it to stay visible.

`sticky` is preferable because the Sidebar remains part of the page
layout.

Also avoid putting an unintended scrolling container around the Sidebar.

Do not add these to layout ancestors without a deliberate reason:

``` tsx
overflow-hidden
overflow-auto
overflow-scroll
```

The document should remain the primary vertical scrolling container.

------------------------------------------------------------------------

## 8. MainContent

Use only:

``` tsx
import type { ReactNode } from "react";

export function MainContent({ children }: { children: ReactNode }) {
    return (
        <main className="min-w-0 flex-1">
            {children}
        </main>
    );
}
```

Remove:

``` tsx
max-w-7xl
mx-auto
px-4
sm:px-6
```

from MainContent.

The outer shell already owns:

``` tsx
max-w-[1600px]
px-3 sm:px-6
```

A nested `max-w-7xl` was the reason the Main Content stopped before the
Header's right boundary.

------------------------------------------------------------------------

## 9. Header and content horizontal alignment

Header inner panel:

``` tsx
<div className="mx-auto flex h-16 max-w-[1600px] ...">
```

Content row:

``` tsx
<div className="mx-auto flex max-w-[1600px] ...">
```

Both must use the same:

``` text
max-w-[1600px]
```

and the same outer horizontal padding:

``` text
px-3 sm:px-6
```

Expected:

``` text
┌───────────────────────────────────────────────────────┐
│ Header panel                                          │
└───────────────────────────────────────────────────────┘
┌───────────────┬───────────────────────────────────────┐
│ Sidebar       │ Main Content                          │
└───────────────┴───────────────────────────────────────┘
```

No second `max-w-*` should be introduced inside MainContent.

------------------------------------------------------------------------

## 10. Equal top and bottom spacing

The desired geometry is:

``` text
Header
┌──────────────────────────────────────────────┐
│                                              │
└──────────────────────────────────────────────┘
                    ↓
                SAME GAP
                    ↓
┌───────────────┬──────────────────────────────┐
│               │                              │
│   Sidebar     │       Main Content            │
│               │                              │
│               │                              │
│               │                              │
└───────────────┴──────────────────────────────┘
                    ↓
                SAME GAP
                    ↓
                page bottom
```

Use:

-   Header `pb-5` for the top-to-content-row gap.
-   Content row `pb-5` for bottom breathing room.
-   `items-stretch` so Sidebar occupies the row.
-   No random Sidebar `mt-*` or `mb-*`.

If the visual gap is slightly different because of the actual Header
dimensions, adjust the **shell spacing**, not individual children.

------------------------------------------------------------------------

## 11. Footer

Keep Footer inside MainContent:

``` tsx
<MainContent>
    {children}
    <Footer />
</MainContent>
```

Recommended Footer spacing:

``` tsx
<footer className="mt-10 pb-1 text-center text-xs text-[var(--muted)]">
    ...
</footer>
```

Do not use:

``` text
fixed
absolute
bottom-0
```

for the Footer.

The Footer should naturally appear below the page content.

------------------------------------------------------------------------

## 12. Main Content can be taller than the viewport

The content row should use:

``` tsx
min-h-...
```

not a fixed:

``` tsx
h-screen
```

When the Main Content is short:

``` text
Content Row minimum height
┌───────────────┬──────────────────────────────┐
│ Sidebar       │ Main Content                  │
│               │                              │
│               │                              │
└───────────────┴──────────────────────────────┘
```

The Sidebar still fills the available row.

When the Main Content is long:

``` text
┌───────────────┬──────────────────────────────┐
│ Sidebar       │ Main Content                  │
│               │ Task 1                        │
│               │ Task 2                        │
│               │ Task 3                        │
│               │ ...                           │
│               │ Task 500                      │
└───────────────┴──────────────────────────────┘
```

The page naturally becomes taller.

Do not constrain the entire content row to exactly one viewport height.

------------------------------------------------------------------------

## 13. Do not use `h-screen`

Avoid:

``` tsx
h-screen
```

for the desktop content row.

Prefer:

``` tsx
min-h-dvh
```

or:

``` tsx
lg:min-h-[calc(100dvh-6rem)]
```

because the Header consumes vertical space and page content can be
taller than the viewport.

------------------------------------------------------------------------

## 14. Tailwind CSS v4

Prefer current Tailwind utilities:

``` text
min-h-dvh
max-w-[1600px]
min-w-0
flex-1
shrink-0
items-stretch
gap-6
px-3
sm:px-6
pb-5
sticky
top-24
```

Arbitrary values such as:

``` text
calc(100dvh - 6rem)
```

are acceptable because this represents an actual relationship between
the viewport and Header height.

Do not introduce custom CSS for ordinary flexbox/grid spacing.

------------------------------------------------------------------------

## 15. HeroUI

Keep HeroUI for UI components.

Use Tailwind for page-shell layout:

-   flex
-   grid
-   gap
-   padding
-   width
-   height
-   sticky positioning
-   responsive behavior

Do not replace the page shell with a HeroUI component just to fix this
issue.

Keep the existing:

``` text
glass-panel
glass-card
field
button-primary
button-secondary
```

visual system.

------------------------------------------------------------------------

## 16. Form layout

For the existing Task form, use Grid gaps rather than margins on
individual fields.

Preferred:

``` tsx
<div className="grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2 xl:grid-cols-3">
```

Instead of:

``` tsx
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
    <div className="mb-4 md:mr-4">
```

This is unrelated to the Sidebar height, but it keeps the form layout
consistent with the new shell.

------------------------------------------------------------------------

## 17. Remove conflicting classes

Inspect the layout components for these classes:

``` text
max-w-7xl
self-start
items-start
items-stretch
h-screen
h-[calc(...)]
max-h-[calc(...)]
overflow-hidden
overflow-auto
overflow-scroll
mt-*
mb-*
translate-y-*
absolute
fixed
```

Do not blindly remove all of them.

Determine whether they are competing with the page-shell geometry.

The goal is:

### MainLayout

Owns:

``` text
overall width
content row gap
content row height
bottom spacing
```

### Header

Owns:

``` text
header height
top spacing
header-to-content spacing
```

### Sidebar

Owns:

``` text
sidebar width
sidebar visual styling
sticky position
navigation
```

### MainContent

Owns:

``` text
remaining horizontal width
page content
footer
```

------------------------------------------------------------------------

## 18. Final recommended code

### MainLayout.tsx

``` tsx
import type { ReactNode } from "react";
import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import { MainContent } from "@/components/common/MainContent";
import { MobileBottomNavbar } from "@/components/common/MobileBottomNavbar";
import { Sidebar } from "@/components/common/Sidebar";
import type { LoggedInUser } from "@/types";

export function MainLayout({
    children,
    user,
}: {
    children: ReactNode;
    user: LoggedInUser;
}) {
    return (
        <div className="min-h-dvh">
            <Header user={user} />

            <div className="mx-auto flex max-w-[1600px] items-stretch gap-6 px-3 pb-5 sm:px-6 lg:min-h-[calc(100dvh-6rem)]">
                <Sidebar />

                <MainContent>
                    {children}
                    <Footer />
                </MainContent>
            </div>

            <MobileBottomNavbar />
        </div>
    );
}
```

### MainContent.tsx

``` tsx
import type { ReactNode } from "react";

export function MainContent({ children }: { children: ReactNode }) {
    return (
        <main className="min-w-0 flex-1">
            {children}
        </main>
    );
}
```

### Header.tsx

``` tsx
<header className="sticky top-0 z-30 px-3 pt-3 pb-5 sm:px-6">
    <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between rounded-2xl border border-white/40 bg-white/60 px-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60 sm:px-6">
        {/* existing header content */}
    </div>
</header>
```

### Sidebar.tsx

``` tsx
<aside
    className={`glass-panel hidden shrink-0 p-3 lg:sticky lg:top-24 lg:block ${
        collapsed ? "w-20" : "w-60"
    }`}
>
    ...
</aside>
```

Start with these exact structures before introducing any additional
height or margin rules.

------------------------------------------------------------------------

## 19. Verification checklist

Test at:

-   1024px
-   1280px
-   1440px
-   1600px
-   1920px
-   mobile width

### Header

-   [ ] Header is centered.
-   [ ] Header uses `max-w-[1600px]`.
-   [ ] Header has explicit top spacing.
-   [ ] Header has a consistent bottom gap.

### Sidebar

-   [ ] Sidebar starts at exactly the same Y coordinate as Main Content.
-   [ ] Sidebar has exactly the same gap from Header as Main Content.
-   [ ] Sidebar fills the content row.
-   [ ] Sidebar does not become half-height.
-   [ ] Sidebar has bottom breathing room.
-   [ ] Sidebar remains usable during document scrolling.
-   [ ] Sidebar does not cause horizontal overflow.

### Main Content

-   [ ] Main Content starts at exactly the same Y coordinate as Sidebar.
-   [ ] Main Content fills remaining width.
-   [ ] Main Content right edge aligns with Header.
-   [ ] No nested `max-w-7xl`.
-   [ ] No arbitrary top margin is needed.

### Footer

-   [ ] Footer stays inside MainContent.
-   [ ] Footer appears below page content.
-   [ ] Footer does not overlap Sidebar.
-   [ ] Footer does not control Sidebar height.

------------------------------------------------------------------------

## 20. Core rule

Do **not** fix this by adding another margin to whichever element looks
too high or too low.

The correct structure is:

``` text
                    MainLayout
                        │
          ┌─────────────┴─────────────┐
          │                           │
       Header                     Content Row
                                      │
                          ┌───────────┴───────────┐
                          │                       │
                       Sidebar              MainContent
                                                  │
                                               Footer
```

The **Content Row owns the shared vertical geometry**.

Therefore:

-   Header establishes the top boundary.
-   Header establishes the Header-to-content gap.
-   Content Row establishes the available minimum height.
-   `items-stretch` makes Sidebar fill that row.
-   Main Content determines natural page height when it is longer.
-   Content Row's bottom padding creates the bottom gap.
-   Footer stays inside Main Content.
-   Sidebar does not independently calculate its own viewport height.

Do not solve the problem with independent Sidebar `height`,
`max-height`, `margin-top`, `margin-bottom`, or `translate-y` values.
