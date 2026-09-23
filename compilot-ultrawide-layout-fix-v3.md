# ComPilot Ultrawide Layout Fix v3

## Goal

Fix desktop layouts on ultrawide displays so:

1. Header spans the entire application width.
2. Sidebar is anchored to the left edge of the application shell.
3. Main Content expands to the right edge.
4. No giant empty left/right gutters appear on 21:9 or 32:9 monitors.
5. Existing sticky sidebar behavior remains unchanged.
6. Existing mobile layout remains unchanged.
7. Existing spacing relationships remain unchanged.
8. Footer remains inside MainContent.

---

## Diagnosis

Current layout uses:

```tsx
max-w-[1600px]
mx-auto
```

for both Header and Content Row.

This causes the entire application to remain centered inside a fixed-width shell on ultrawide monitors.

---

## New Strategy

Separate:

- Application Shell Width
- Content Readability Width

Do not use a single max-width for everything.

---

## Header

Replace:

```tsx
<header className="sticky top-0 z-30 px-3 pt-3 pb-5 sm:px-6">
    <div className="mx-auto flex h-16 max-w-[1600px] items-center">
```

with:

```tsx
<header className="sticky top-0 z-30 px-3 pt-3 pb-5 sm:px-6">
    <div className="flex h-16 w-full items-center justify-between rounded-2xl border border-white/40 bg-white/60 px-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60 sm:px-6">
```

Remove:

```tsx
mx-auto
max-w-[1600px]
```

from the Header panel.

---

## MainLayout

Replace:

```tsx
<div className="mx-auto flex max-w-[1600px] items-stretch gap-6">
```

with:

```tsx
<div className="flex w-full items-stretch gap-6 px-3 pb-5 sm:px-6 lg:min-h-[calc(100dvh-6rem)]">
```

Remove:

```tsx
mx-auto
max-w-[1600px]
```

from the Content Row.

---

## Sidebar

Keep:

```tsx
<aside
    className={`glass-panel hidden shrink-0 p-3 lg:sticky lg:top-24 lg:block ${
        collapsed ? "w-20" : "w-60"
    }`}
>
```

Do not make the sidebar flex-grow.

---

## MainContent

Use:

```tsx
<main className="min-w-0 flex-1">
```

Never use:

```tsx
max-w-7xl
max-w-[1600px]
mx-auto
```

inside MainContent.

---

## Dashboard Grids

Prefer:

```tsx
<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
```

For larger sections:

```tsx
<div className="grid gap-6 xl:grid-cols-12">
    <section className="xl:col-span-8">
    </section>

    <section className="xl:col-span-4">
    </section>
</div>
```

---

## Optional Enterprise Width Cap

If a cap is still desired:

```tsx
max-w-[2400px]
```

instead of:

```tsx
max-w-[1600px]
```

---

## Verification

Test:

- 1440px
- 1920px
- 2560px
- 3440px
- 3840px

Expected:

- Header spans application width.
- Sidebar stays left.
- Main Content expands naturally.
- No giant side gutters.
- Mobile layout remains unchanged.

---

## Critical Rule

Remove width constraints from the application shell (Header + Content Row).

Only constrain individual content areas when readability actually requires it.
