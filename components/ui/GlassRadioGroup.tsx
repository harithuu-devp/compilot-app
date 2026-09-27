"use client";

import { Label, Radio, RadioGroup } from "@heroui/react";
import { cn } from "cn";

export type GlassRadioOption = {
  value: string;
  label: string;
  description?: string;
};

export type GlassRadioGroupProps = {
  label?: string;
  "aria-label"?: string;
  options: readonly GlassRadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  error?: string;
  orientation?: "vertical" | "horizontal";
  className?: string;
};

export function GlassRadioGroup({
  label,
  options,
  value,
  defaultValue,
  onChange,
  name,
  error,
  orientation = "vertical",
  className,
  "aria-label": ariaLabel,
}: GlassRadioGroupProps) {
  return (
    <RadioGroup
      className={cn("flex w-full flex-col gap-2", className)}
      aria-label={label ? undefined : (ariaLabel ?? "Options")}
      name={name}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      isInvalid={Boolean(error)}
      orientation={orientation}
    >
      {label ? <Label className="text-sm font-medium text-[var(--text-secondary)]">{label}</Label> : null}

      <div className={cn("flex gap-3", orientation === "horizontal" ? "flex-row flex-wrap" : "flex-col")}>
        {options.map((option) => (
          <Radio
            key={option.value}
            value={option.value}
            className={cn(
              "glass glass-border cursor-pointer rounded-2xl p-4 transition-glass",
              "data-[hovered=true]:bg-[var(--surface-hover)]",
              "data-[selected=true]:border-[var(--glass-border-strong)] data-[selected=true]:glow-blue",
            )}
          >
            <Radio.Content className="flex items-start gap-3">
              <Radio.Control className="mt-0.5 border-[var(--glass-border-strong)]">
                <Radio.Indicator className="bg-[var(--primary)]" />
              </Radio.Control>
              <span className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-[var(--text)]">{option.label}</span>
                {option.description ? <span className="text-xs text-[var(--muted)]">{option.description}</span> : null}
              </span>
            </Radio.Content>
          </Radio>
        ))}
      </div>

      {error ? (
        <p role="alert" className="text-xs font-medium text-[var(--danger)]">
          {error}
        </p>
      ) : null}
    </RadioGroup>
  );
}
