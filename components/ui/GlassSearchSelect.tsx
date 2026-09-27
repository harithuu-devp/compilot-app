"use client";

import { Input } from "@heroui/react";
import { Check, Search, X } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "cn";

export type GlassSearchSelectOption = { value: string; label: string };

export type GlassSearchSelectProps = {
  label?: string;
  placeholder?: string;
  options: readonly GlassSearchSelectOption[];
  value?: string | null;
  onChange?: (value: string | null) => void;
  name?: string;
  error?: string;
  className?: string;
};

export function GlassSearchSelect({
  label,
  placeholder = "Search…",
  options,
  value = null,
  onChange,
  name,
  error,
  className,
}: GlassSearchSelectProps) {
  const listId = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(() => options.find((option) => option.value === value) ?? null, [options, value]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return [...options];
    return options.filter((option) => option.label.toLowerCase().includes(needle));
  }, [options, query]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  function commit(option: GlassSearchSelectOption | undefined) {
    if (!option) return;
    onChange?.(option.value);
    setQuery("");
    setOpen(false);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) => Math.min(index + 1, Math.max(results.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter") {
      if (!open) setOpen(true);
      else {
        event.preventDefault();
        commit(results[activeIndex]);
      }
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={containerRef} className={cn("relative flex w-full flex-col gap-1.5", className)} onKeyDown={onKeyDown}>
      {label ? <span className="text-sm font-medium text-[var(--text-secondary)]">{label}</span> : null}

      <div className="relative flex items-center">
        <Search aria-hidden className="pointer-events-none absolute left-4 size-4 text-[var(--muted)]" />
        <Input
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-invalid={Boolean(error)}
          value={query}
          onFocus={() => {
            setOpen(true);
            setActiveIndex(0);
          }}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
            setOpen(true);
          }}
          placeholder={selected ? selected.label : placeholder}
          className={cn(
            "glass-input h-11 w-full rounded-2xl pr-10 pl-11 text-sm",
            error && "border-[var(--danger)]",
          )}
        />
        {selected ? (
          <button
            type="button"
            aria-label="Clear selection"
            onClick={() => {
              onChange?.(null);
              setQuery("");
            }}
            className="absolute right-3 flex size-6 items-center justify-center rounded-full text-[var(--muted)] transition-glass hover:bg-[var(--surface-hover)] hover:text-[var(--text)]"
          >
            <X className="size-3.5" aria-hidden />
          </button>
        ) : null}
      </div>

      {name ? <input type="hidden" name={name} value={selected?.value ?? ""} /> : null}

      {open && results.length > 0 ? (
        <ul
          id={listId}
          role="listbox"
          className="glass-panel glass-scrollbar absolute top-full z-40 mt-2 max-h-64 w-full overflow-y-auto rounded-2xl p-1.5"
        >
          {results.map((option, index) => {
            const isSelected = option.value === value;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(event) => {
                  event.preventDefault();
                  commit(option);
                }}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm text-[var(--text)]",
                  index === activeIndex && "bg-[var(--surface-hover)]",
                  isSelected && "text-[var(--primary)]",
                )}
              >
                {option.label}
                {isSelected ? <Check className="size-4" aria-hidden /> : null}
              </li>
            );
          })}
        </ul>
      ) : null}

      {error ? (
        <p role="alert" className="text-xs font-medium text-[var(--danger)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
