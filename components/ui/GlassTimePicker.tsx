"use client";

import { TimeField, useIsHydrated } from "@heroui/react";
import { Clock } from "lucide-react";
import { cn } from "cn";

export type GlassTimePickerProps = {
  label?: string;
  description?: string;
  error?: string;
  name?: string;
  required?: boolean;
  containerClassName?: string;
  className?: string;
};

/** Time segments field with an inline clock icon, matching the glass inputs. */
export function GlassTimePicker({
  label,
  description,
  error,
  name,
  required,
  className,
  containerClassName,
}: GlassTimePickerProps) {
  const describedBy = description && !error ? `${name}-description` : undefined;
  // Time segments depend on the runtime locale, which differs between the
  // Node server and the browser. Render them only after hydration.
  const isHydrated = useIsHydrated();

  return (
    <div className={cn("flex w-full flex-col gap-1.5", containerClassName)}>
      {label ? (
        <span className="text-sm font-medium text-[var(--text-secondary)]">
          {label}
          {required ? <span className="ml-1 text-[var(--danger)]">*</span> : null}
        </span>
      ) : null}

      <TimeField
        aria-label={label ?? name ?? "Choose time"}
        aria-describedby={describedBy}
        name={name}
        isRequired={required}
        isInvalid={Boolean(error)}
        className={cn("w-full", className)}
      >
        <TimeField.Group
          className={cn(
            "glass-input h-11 w-full rounded-2xl gap-2 px-3 text-sm",
            error && "border-[var(--danger)]",
          )}
        >
          <Clock className="size-4 shrink-0 text-[var(--muted)]" aria-hidden />
          {isHydrated ? (
            <TimeField.Input>
              {(segment) => <TimeField.Segment segment={segment} />}
            </TimeField.Input>
          ) : (
            <span aria-hidden className="px-1 text-sm text-[var(--muted)]">
              --:-- --
            </span>
          )}
        </TimeField.Group>
      </TimeField>

      {description && !error ? (
        <p id={describedBy} className="text-xs text-[var(--muted)]">
          {description}
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="text-xs font-medium text-[var(--danger)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
