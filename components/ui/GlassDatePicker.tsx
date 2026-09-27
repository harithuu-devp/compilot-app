"use client";

import { Calendar, DateField, DatePicker } from "@heroui/react";
import { CalendarDays } from "lucide-react";
import { cn } from "cn";

export type GlassDatePickerProps = {
  label?: string;
  description?: string;
  error?: string;
  name?: string;
  required?: boolean;
  containerClassName?: string;
  className?: string;
};

/** Date field plus calendar popover, styled to match the glass inputs. */
export function GlassDatePicker({
  label,
  description,
  error,
  name,
  required,
  className,
  containerClassName,
}: GlassDatePickerProps) {
  const describedBy = description && !error ? `${name}-description` : undefined;

  return (
    <div className={cn("flex w-full flex-col gap-1.5", containerClassName)}>
      {label ? (
        <span className="text-sm font-medium text-[var(--text-secondary)]">
          {label}
          {required ? <span className="ml-1 text-[var(--danger)]">*</span> : null}
        </span>
      ) : null}

      <DatePicker
        aria-label={label ?? name ?? "Choose date"}
        aria-describedby={describedBy}
        name={name}
        isRequired={required}
        isInvalid={Boolean(error)}
        className={cn("w-full", className)}
      >
        <DateField.Group
          className={cn(
            "glass-input h-11 w-full rounded-2xl px-3 text-sm",
            error && "border-[var(--danger)]",
          )}
        >
          <DateField.Input>
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
          <DatePicker.Trigger
            aria-label="Open calendar"
            className="flex size-8 shrink-0 items-center justify-center rounded-xl text-[var(--muted)] transition-glass hover:text-[var(--primary)]"
          >
            <CalendarDays className="size-4" aria-hidden />
            <DatePicker.TriggerIndicator className="sr-only" />
          </DatePicker.Trigger>
        </DateField.Group>

        <DatePicker.Popover>
          <Calendar aria-label="Select date" className="text-sm text-[var(--text)]">
            <Calendar.Header>
              <Calendar.NavButton slot="previous" />
              <Calendar.Heading />
              <Calendar.NavButton slot="next" />
            </Calendar.Header>
            <Calendar.Grid>
              <Calendar.GridHeader>
                {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
              </Calendar.GridHeader>
              <Calendar.GridBody>
                {(date) => <Calendar.Cell date={date} />}
              </Calendar.GridBody>
            </Calendar.Grid>
          </Calendar>
        </DatePicker.Popover>
      </DatePicker>

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
