"use client";

import { Checkbox } from "@heroui/react";
import { cn } from "cn";

export type GlassCheckboxProps = {
  label: string;
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  name?: string;
  value?: string;
  isDisabled?: boolean;
  className?: string;
};

export function GlassCheckbox({
  label,
  description,
  checked,
  defaultChecked = false,
  onChange,
  name,
  value,
  isDisabled = false,
  className,
}: GlassCheckboxProps) {
  return (
    <Checkbox
      className={cn(
        "glass glass-border flex w-full items-start gap-3 rounded-2xl px-4 py-3 transition-glass",
        "data-[hovered=true]:bg-[var(--surface-hover)] data-[selected=true]:border-[var(--glass-border-strong)]",
        "disabled:opacity-60",
        className,
      )}
      name={name}
      value={value}
      isSelected={checked}
      defaultSelected={defaultChecked}
      onChange={onChange}
      isDisabled={isDisabled}
    >
      <Checkbox.Content className="flex items-start gap-3">
        <Checkbox.Control className="mt-0.5 rounded-md border-[var(--glass-border-strong)] data-[selected=true]:border-transparent">
          <Checkbox.Indicator className="text-white" />
        </Checkbox.Control>
        <span className="flex flex-col gap-0.5">
          <span className="text-sm font-medium text-[var(--text)]">{label}</span>
          {description ? <span className="text-xs text-[var(--muted)]">{description}</span> : null}
        </span>
      </Checkbox.Content>
    </Checkbox>
  );
}
