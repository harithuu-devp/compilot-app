import { TextArea } from "@heroui/react";
import { cn } from "cn";

export type GlassTextareaProps = React.ComponentPropsWithoutRef<"textarea"> & {
  label?: string;
  description?: string;
  error?: string;
  containerClassName?: string;
};

export function GlassTextarea({
  label,
  description,
  error,
  className,
  containerClassName,
  id,
  name,
  required,
  rows = 4,
  ...rest
}: GlassTextareaProps) {
  const fieldId = id ?? name;
  const describedBy = description && !error ? `${fieldId}-description` : undefined;

  return (
    <div className={cn("flex w-full flex-col gap-1.5", containerClassName)}>
      {label ? (
        <label htmlFor={fieldId} className="text-sm font-medium text-[var(--text-secondary)]">
          {label}
          {required ? <span className="ml-1 text-[var(--danger)]">*</span> : null}
        </label>
      ) : null}

      <TextArea
        id={fieldId}
        name={name}
        rows={rows}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={cn(
          "glass-input field-sizing-content min-h-28 w-full resize-y rounded-2xl p-4 text-sm leading-relaxed",
          error && "border-[var(--danger)]",
          className,
        )}
        {...rest}
      />

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
