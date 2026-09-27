"use client";

import { Label, ListBox, Select } from "@heroui/react";
import { cn } from "cn";

export type GlassSelectOption = {
  value: string;
  label: string;
};

export type GlassSelectProps = {
  label?: string;
  "aria-label"?: string;
  placeholder?: string;
  options: readonly GlassSelectOption[];
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
  name?: string;
  error?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  className?: string;
};

export function GlassSelect({
  label,
  placeholder = "Select an option",
  options,
  value,
  defaultValue,
  onChange,
  name,
  error,
  isDisabled = false,
  isRequired = false,
  className,
  "aria-label": ariaLabel,
}: GlassSelectProps) {
  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      <Select
        className="w-full"
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue ?? undefined}
        onChange={(key) => {
          onChange?.(key == null ? null : String(key));
        }}
        name={name}
        isDisabled={isDisabled}
        isRequired={isRequired}
        isInvalid={Boolean(error)}
        aria-label={label ? undefined : (ariaLabel ?? placeholder)}
      >
        {label ? (
          <Label className="text-sm font-medium text-[var(--text-secondary)]">
            {label}
            {isRequired ? (
              <span className="ml-1 text-[var(--danger)]">*</span>
            ) : null}
          </Label>
        ) : null}

        <Select.Trigger className="glass-input flex h-11 w-full items-center justify-between gap-3 rounded-2xl px-4 text-sm">
          <Select.Value className="truncate text-left" />
          <Select.Indicator className="size-4 shrink-0 text-[var(--muted)]" />
        </Select.Trigger>

        <Select.Popover className="glass-panel min-w-[var(--trigger-width)] rounded-2xl p-1.5">
          <ListBox className="glass-scrollbar max-h-72 overflow-y-auto">
            {options.map((option) => (
              <ListBox.Item
                key={option.value}
                id={option.value}
                textValue={option.label}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm text-[var(--text)] outline-none",
                  "data-[hovered=true]:bg-[var(--surface-hover)]",
                  "data-[focused=true]:bg-[var(--surface-hover)]",
                  "data-[selected=true]:text-[var(--primary)]",
                )}
              >
                {option.label}

                <ListBox.ItemIndicator className="size-4 text-[var(--primary)]" />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>

      {error ? (
        <p
          role="alert"
          className="text-xs font-medium text-[var(--danger)]"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}