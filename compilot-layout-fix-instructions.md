# ComPilot Layout Visual Fix Instructions

## Goal

Fix the desktop visual layout of the ComPilot Next.js application so
that the **Header, Sidebar, Main Content, and Footer form one consistent
page shell**.

The project uses:

-   Latest Next.js App Router
-   React / TypeScript
-   Tailwind CSS v4
-   HeroUI v3
-   Existing custom utility classes such as `glass-panel`, `glass-card`,
    `field`, `button-primary`, etc.
-   Dark/light theme support
-   A desktop sidebar and mobile bottom navigation

Do **not** replace the existing design with a completely different UI.
Keep the current glassmorphism visual style.

The screenshot shows these problems:

1.  The right edge of Main Content does not align visually with the
    Header.
2.  Main Content can start at a different vertical position from the
    Sidebar.
3.  The Sidebar moves/disappears incorrectly when the page is scrolled.
4.  The Sidebar reaches the bottom of the viewport without a visual
    bottom gap.
5.  The Footer should belong to the Main Content column, not be
    positioned independently from it.
6.  Nested `max-width` containers are unnecessarily constraining the
    Main Content.
7.  Spacing should be controlled by the page shell rather than by
    arbitrary margins inside individual pages.

------------------------------------------------------------------------

# 1. Important Tailwind CSS v4 rules

This project uses Tailwind CSS v4.

Prefer normal Tailwind v4 utility classes instead of writing custom CSS
for basic layout.

Useful current utilities include:

-   `flex`
-   `flex-1`
-   `min-w-0`
-   `shrink-0`
-   `items-start`
-   `items-stretch`
-   `gap-6`
-   `px-3`
-   `sm:px-6`
-   `py-6`
-   `pb-6`
-   `sticky`
-   `top-24`
-   `h-dvh`
-   `min-h-dvh`
-   `overflow-y-auto`

Tailwind v4 supports dynamic/custom utility values when genuinely
necessary, but prefer the standard spacing and sizing scale first.

Examples:

``` tsx
className="gap-6"
className="px-3 sm:px-6"
className="pb-6"
className="sticky top-24"
className="h-dvh"
```

Tailwind's current documentation defines `sticky` as an element that
remains in normal flow and becomes fixed relative to its scroll
container until its containing block is exhausted. Therefore, do not
assume `sticky` is equivalent to `fixed`.

------------------------------------------------------------------------

# 2. Do NOT create nested max-width containers

Current structure:

``` tsx
<Header />

<div className="mx-auto flex max-w-[1600px] gap-6 px-3 sm:px-6">
    <Sidebar />

    <MainContent>
        ...
    </MainContent>
</div>
```

This is the correct place to define the application's overall content
width.

However, `MainContent` currently has:

``` tsx
<main className="min-w-0 flex-1 px-4 pb-2 sm:px-6">
    <div className="mx-auto max-w-7xl">
        {children}
    </div>
</main>
```

The `max-w-7xl` creates a second width constraint.

This causes the Main Content to stop before the overall shell's right
edge.

## Required change

`MainContent` should NOT have another `max-w-*`.

Use:

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

The important responsibilities are:

-   `min-w-0`: allows the flex child to shrink correctly and prevents
    long content from forcing horizontal overflow.
-   `flex-1`: makes Main Content consume all remaining horizontal space.
-   No `max-w-7xl`.
-   No additional horizontal padding if the outer shell already owns the
    horizontal page padding.

------------------------------------------------------------------------

# 3. MainLayout should own the page shell

Use the outer layout as the single source of truth for:

-   overall max width
-   horizontal page padding
-   sidebar/content gap
-   vertical page padding

Recommended structure:

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

            <div className="mx-auto flex max-w-[1600px] items-start gap-6 px-3 pb-6 sm:px-6">
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

### Why

The outer container controls the entire desktop content region:

``` text
Page
└── MainLayout
    ├── Header
    ├── Content Shell
    │   ├── Sidebar
    │   └── MainContent
    │       ├── Page Content
    │       └── Footer
    └── MobileBottomNavbar
```

Do not add another `max-w-*` inside `MainContent`.

------------------------------------------------------------------------

# 4. Header alignment

Current Header:

``` tsx
<header className="sticky top-3 z-30 mx-3 mb-5 flex h-16 items-center justify-between rounded-2xl border border-white/40 bg-white/60 px-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60 sm:mx-6 sm:px-6">
```

The Header currently has its own:

``` text
mx-3 sm:mx-6
```

while the body shell has:

``` text
max-w-[1600px]
px-3 sm:px-6
```

This means the Header and body do not technically share the same
max-width container.

## Preferred solution

Make Header use the same outer shell width as the body.

Instead of making the `<header>` itself the width container, structure
it like this:

``` tsx
<header className="sticky top-3 z-30 mb-5 px-3 sm:px-6">
    <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between rounded-2xl border border-white/40 bg-white/60 px-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60 sm:px-6">
        {/* existing header content */}
    </div>
</header>
```

This is preferable because:

-   Header outer spacing is independent from the visual panel.
-   The inner header panel uses the exact same `max-w-[1600px]` as the
    body.
-   The left and right edges align.
-   `top-3` controls the sticky offset.
-   `mb-5` controls the space below the Header.

The visual panel should not itself be responsible for the page's maximum
width.

------------------------------------------------------------------------

# 5. Sidebar positioning

The Sidebar should be:

-   hidden below desktop breakpoint
-   fixed-width on desktop
-   non-shrinking
-   sticky below the Header
-   visually separated from the viewport bottom
-   allowed to have its own internal scrolling if it eventually becomes
    very tall

Recommended:

``` tsx
<aside
    className={`glass-panel hidden shrink-0 p-3 lg:sticky lg:top-24 lg:block lg:h-[calc(100dvh-7.5rem)] ${
        collapsed ? "w-20" : "w-60"
    }`}
>
    ...
</aside>
```

However, first try to avoid a hardcoded calculated height unless the
design actually requires it.

A more robust approach is:

``` tsx
<aside
    className={`glass-panel hidden shrink-0 p-3 lg:sticky lg:top-24 lg:max-h-[calc(100dvh-7.5rem)] lg:self-start lg:overflow-y-auto ${
        collapsed ? "w-20" : "w-60"
    }`}
>
    ...
</aside>
```

Use `max-h` rather than `h` if the sidebar should remain content-sized
when its content is short.

This prevents an unnecessarily tall empty sidebar.

## Why `top-24`

The Header is approximately:

-   `top-3` = 0.75rem
-   `h-16` = 4rem
-   `mb-5` = 1.25rem

So the visual header area is approximately 6rem from the top.

`top-24` = 6rem gives the Sidebar a sensible sticky position below the
Header.

If the actual Header dimensions change, adjust this offset based on the
real layout instead of blindly using `top-24`.

------------------------------------------------------------------------

# 6. Do NOT use `self-start` and `items-stretch` inconsistently

The parent currently uses a flex row:

``` tsx
<div className="mx-auto flex ...">
```

For this layout, use:

``` tsx
items-start
```

not:

``` tsx
items-stretch
```

Recommended:

``` tsx
<div className="mx-auto flex max-w-[1600px] items-start gap-6 px-3 pb-6 sm:px-6">
```

Reason:

-   Sidebar has its own natural/sticky height.
-   Main Content determines its own height.
-   Sidebar should not be stretched to the full height of the Main
    Content.
-   `items-start` makes the two columns begin at the same vertical
    position.

Avoid adding:

``` tsx
self-start
```

to Sidebar if the parent already has:

``` tsx
items-start
```

It is redundant.

------------------------------------------------------------------------

# 7. Sidebar bottom spacing

The page shell must have bottom padding:

``` tsx
pb-6
```

on the main desktop content row:

``` tsx
<div className="mx-auto flex max-w-[1600px] items-start gap-6 px-3 pb-6 sm:px-6">
```

This gives the page content a visible bottom breathing room.

Do not try to solve all bottom spacing with a random margin on Sidebar.

If the Sidebar has a viewport-based maximum height, leave room below the
sticky region:

``` tsx
lg:max-h-[calc(100dvh-7.5rem)]
```

The `7.5rem` should be treated as a design value, not a magical Tailwind
requirement.

------------------------------------------------------------------------

# 8. Why the Sidebar was moving when scrolling

This is normal `sticky` behavior.

Tailwind's `sticky` utility uses CSS `position: sticky`.

A sticky element:

``` tsx
className="sticky top-24"
```

is not permanently fixed to the viewport. It remains constrained by its
containing block.

Therefore:

-   `sticky` is correct when the Sidebar should participate in the page
    layout.
-   `fixed` should NOT be used for this Sidebar unless the entire layout
    is redesigned around a fixed sidebar.
-   The parent must not introduce an unexpected scrolling/overflow
    container.
-   Avoid `overflow-hidden`, `overflow-auto`, or `overflow-scroll` on
    ancestors of the Sidebar unless intentionally creating a scroll
    container.

For this application, keep the document as the main scroll container.

------------------------------------------------------------------------

# 9. Footer placement

The Footer should remain inside `MainContent`.

Correct:

``` tsx
<MainContent>
    {children}
    <Footer />
</MainContent>
```

Do NOT do:

``` tsx
<div>
    <Sidebar />
    <MainContent>{children}</MainContent>
</div>

<Footer />
```

The Footer should visually belong to the main content column.

If the Footer needs spacing from the page content, implement that inside
Footer:

``` tsx
<footer className="mt-10 pb-2">
    ...
</footer>
```

Do not use absolute positioning.

Do not use `fixed` positioning.

Do not force the Footer to the viewport bottom with arbitrary `min-h`
calculations unless the application specifically needs a sticky footer.

------------------------------------------------------------------------

# 10. Recommended Footer visual spacing

A reasonable Footer structure is:

``` tsx
<footer className="mt-10 pb-2 text-center text-xs text-[var(--muted)]">
    ...
</footer>
```

If it contains multiple items:

``` tsx
<footer className="mt-10 flex flex-col items-center justify-center gap-2 pb-2 text-xs text-[var(--muted)] sm:flex-row">
    ...
</footer>
```

The Footer should not create horizontal overflow.

------------------------------------------------------------------------

# 11. Main page content

Individual pages should NOT try to reproduce the application shell.

For example:

``` tsx
export default async function TaskPage() {
    const user = await requireUser();
    const tasks = await taskList();

    return (
        <MainLayout user={user}>
            <CreateTaskForm />
            <TaskList tasks={tasks} />
        </MainLayout>
    );
}
```

This is good.

The page should not add:

``` tsx
<div className="max-w-7xl mx-auto">
```

around its entire contents unless there is a specific design reason.

The layout shell already controls the available width.

------------------------------------------------------------------------

# 12. CreateTaskForm width

The form can simply use the available Main Content width:

``` tsx
<form className="glass-card p-6 sm:p-8">
```

Do not add:

``` tsx
max-w-7xl
mx-auto
```

unless the form itself intentionally needs to be narrower than the main
content.

The current problem is not the form's width. It is the nested
`max-w-7xl` in `MainContent`.

------------------------------------------------------------------------

# 13. Form grid

For a form where:

-   small: 1 column
-   medium: 2 columns
-   extra large: 3 columns

use:

``` tsx
<div className="grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2 xl:grid-cols-3">
    ...
</div>
```

This is preferable to:

``` tsx
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
    <div className="mb-4 md:mr-4">
```

because Grid already has proper gap utilities.

Use:

``` tsx
gap-x-4
gap-y-5
```

instead of manually adding:

``` tsx
mr-4
mb-4
```

to individual fields.

For a field spanning the full form:

``` tsx
<div className="md:col-span-2 xl:col-span-3">
```

For example:

``` tsx
<div className="grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2 xl:grid-cols-3">
    <div>
        <label className="field-label" htmlFor="firstName">
            First name
        </label>
        <input className="field" id="firstName" name="firstName" />
    </div>

    <div>
        <label className="field-label" htmlFor="lastName">
            Last name
        </label>
        <input className="field" id="lastName" name="lastName" />
    </div>

    <div>
        <label className="field-label" htmlFor="email">
            Email
        </label>
        <input className="field" id="email" name="email" />
    </div>
</div>
```

Tailwind's current documentation supports `gap`, `gap-x`, and `gap-y`
utilities for flex and grid gutters.

------------------------------------------------------------------------

# 14. Responsive behavior

Use Tailwind's standard responsive breakpoints.

Current Tailwind defaults include:

-   `sm`: 640px
-   `md`: 768px
-   `lg`: 1024px
-   `xl`: 1280px
-   `2xl`: 1536px

The Sidebar currently uses:

``` tsx
hidden lg:block
```

which is appropriate if the desktop Sidebar starts at 1024px.

The mobile navigation can remain responsible for smaller screens.

Do not add unnecessary breakpoint variants.

------------------------------------------------------------------------

# 15. Do not mix HeroUI and custom layout responsibilities

HeroUI v3 is compatible with Tailwind CSS v4.

The current HeroUI v3 documentation recommends importing:

``` css
@import "tailwindcss";
@import "@heroui/styles";
```

with Tailwind imported first.

HeroUI should be used for UI components such as:

-   Button
-   Input
-   Textarea
-   Card
-   Modal
-   Dropdown
-   Navbar
-   etc.

Tailwind should control this application's page layout:

-   `flex`
-   `grid`
-   `gap-*`
-   `max-w-*`
-   `px-*`
-   `py-*`
-   `sticky`
-   `top-*`
-   `min-w-0`
-   `flex-1`
-   `shrink-0`
-   responsive variants

Do not introduce a HeroUI layout component merely to solve the page
shell.

------------------------------------------------------------------------

# 16. Recommended final component structure

## MainLayout.tsx

Use approximately:

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

            <div className="mx-auto flex max-w-[1600px] items-start gap-6 px-3 pb-6 sm:px-6">
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

------------------------------------------------------------------------

# 17. MainContent.tsx

Use:

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

No nested max width.

No nested horizontal page padding.

No `mx-auto`.

No `max-w-7xl`.

------------------------------------------------------------------------

# 18. Header.tsx

Refactor the structure so the outer element controls sticky positioning
and page padding, while an inner element controls the visual Header
panel.

Recommended:

``` tsx
<header className="sticky top-3 z-30 mb-5 px-3 sm:px-6">
    <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between rounded-2xl border border-white/40 bg-white/60 px-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60 sm:px-6">
        {/* existing Header content */}
    </div>
</header>
```

Keep the existing Header content unchanged unless another issue is
discovered.

------------------------------------------------------------------------

# 19. Sidebar.tsx

Recommended starting point:

``` tsx
<aside
    className={`glass-panel hidden shrink-0 p-3 lg:sticky lg:top-24 lg:block lg:max-h-[calc(100dvh-7.5rem)] lg:self-start lg:overflow-y-auto ${
        collapsed ? "w-20" : "w-60"
    }`}
>
```

Important:

-   `shrink-0` prevents the Sidebar width from shrinking.
-   `w-60` is the expanded desktop width.
-   `w-20` is the collapsed desktop width.
-   `sticky top-24` keeps it below the Header.
-   `max-h-[calc(100dvh-7.5rem)]` prevents an oversized Sidebar.
-   `overflow-y-auto` allows only the Sidebar to scroll if it eventually
    becomes taller than the available viewport.
-   `self-start` is optional when the parent already uses `items-start`;
    remove it if redundant.

Do NOT use `fixed` for the Sidebar at this stage.

------------------------------------------------------------------------

# 20. Avoid these classes for the page shell

Do not use these as quick fixes:

``` text
absolute
fixed
left-0
right-0
inset-0
ml-[...]
mr-[...]
mt-[...]
translate-x-[...]
translate-y-[...]
w-screen
max-w-7xl on MainContent
```

unless there is a demonstrated reason.

Especially avoid manually moving the Main Content into alignment with:

``` tsx
ml-4
mr-4
translate-x-...
```

The correct solution is to fix the container hierarchy.

------------------------------------------------------------------------

# 21. Important diagnosis checklist

After making the changes, inspect the browser at approximately:

-   1024px
-   1280px
-   1440px
-   1600px+
-   mobile width

Verify:

### Header

-   Header has the same maximum horizontal boundary as the main shell.
-   Header does not become wider/narrower than the body.
-   Header has consistent left/right margins.
-   Header remains sticky if that behavior is desired.

### Sidebar

-   Sidebar begins at the same vertical level as Main Content.
-   Sidebar remains visible while scrolling.
-   Sidebar stays below the Header.
-   Sidebar has visible bottom breathing room.
-   Sidebar does not stretch to Main Content height.
-   Sidebar does not cause horizontal overflow.
-   Sidebar can internally scroll if it eventually becomes too tall.

### Main Content

-   Main Content starts immediately beside the Sidebar.
-   Main Content uses the remaining horizontal space.
-   Main Content reaches the same right boundary as the Header shell.
-   No nested `max-w-7xl`.
-   No unexpected horizontal scrollbar.

### Footer

-   Footer is inside Main Content.
-   Footer appears below page content.
-   Footer does not overlap the Sidebar.
-   Footer has reasonable top/bottom spacing.
-   Footer does not use fixed/absolute positioning.

------------------------------------------------------------------------

# 22. Do not modify unrelated functionality

This task is a **layout-only refactor**.

Do not change:

-   authentication
-   session handling
-   database code
-   task actions
-   task service functions
-   routing
-   task form submission behavior
-   API behavior
-   theme cookie logic
-   user types
-   authorization
-   mobile navigation functionality

Only modify the layout components and their relevant Tailwind classes.

------------------------------------------------------------------------

# 23. Final target architecture

The final visual hierarchy should be:

``` text
<body>
└── MainLayout
    │
    ├── Header
    │   └── Header visual panel
    │
    ├── Desktop content shell
    │   ├── Sidebar
    │   │   └── Workspace navigation
    │   │
    │   └── MainContent
    │       ├── Page content
    │       │   └── Task page / other page
    │       │
    │       └── Footer
    │
    └── MobileBottomNavbar
```

Visually:

``` text
        viewport
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │ Header                                              │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   ┌──────────────┐  ┌──────────────────────────────────┐   │
│   │              │  │                                  │   │
│   │              │  │                                  │   │
│   │   Sidebar    │  │          Main Content             │   │
│   │              │  │                                  │   │
│   │              │  │                                  │   │
│   │              │  │                                  │   │
│   │              │  │                                  │   │
│   └──────────────┘  │                                  │   │
│                     │                                  │   │
│                     │              Footer              │   │
│                     └──────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

The Header's visual panel and the Main Content's right edge should share
the same `max-w-[1600px]` boundary.

The Sidebar should be a sibling of Main Content, not a parent of it.

------------------------------------------------------------------------

# 24. Most important changes, summarized

Apply these changes first:

### Change 1

Remove nested `max-w-7xl`:

``` diff
- <div className="mx-auto max-w-7xl">{children}</div>
+ {children}
```

### Change 2

Use one main shell:

``` tsx
<div className="mx-auto flex max-w-[1600px] items-start gap-6 px-3 pb-6 sm:px-6">
```

### Change 3

Make MainContent fill remaining width:

``` tsx
<main className="min-w-0 flex-1">
```

### Change 4

Make Header use the same max-width:

``` tsx
<header className="sticky top-3 z-30 mb-5 px-3 sm:px-6">
    <div className="mx-auto flex h-16 max-w-[1600px] ...">
```

### Change 5

Keep Sidebar sticky below Header:

``` tsx
lg:sticky lg:top-24
```

### Change 6

Prevent Sidebar from growing beyond the available viewport:

``` tsx
lg:max-h-[calc(100dvh-7.5rem)] lg:overflow-y-auto
```

### Change 7

Do not use `items-stretch` for the main shell:

``` diff
- items-stretch
+ items-start
```

### Change 8

Do not use manual margins to compensate for incorrect layout.

Fix the parent/child container hierarchy instead.

------------------------------------------------------------------------

## Reference

The current Tailwind CSS documentation confirms the relevant flex, gap,
padding, height, responsive, and sticky utilities. Tailwind currently
documents `h-dvh` for dynamic viewport height and `sticky` as
scroll-constrained sticky positioning.
citeturn0search3turn0search0turn0search4turn0search6turn0search8

The current HeroUI v3 documentation recommends Tailwind CSS v4 and
`@heroui/styles`, with Tailwind imported before HeroUI styles.
citeturn0search5turn0search1
