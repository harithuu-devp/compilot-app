import { Input } from "@heroui/react";
import { cn } from "cn";

export type GlassInputProps = React.ComponentPropsWithoutRef<"input"> & {
  label?: string;
  description?: string;
  error?: string;
  icon?: React.ReactNode;
  containerClassName?: string;
};

export function GlassInput({
  label,
  description,
  error,
  icon,
  className,
  containerClassName,
  id,
  name,
  required,
  ...rest
}: GlassInputProps) {
  const fieldId = id ?? name;

  return (
    <div className={cn("flex w-full flex-col gap-1.5", containerClassName)}>
      {label ? (
        <label htmlFor={fieldId} className="text-sm font-medium text-[var(--text-secondary)]">
          {label}
          {required ? <span className="ml-1 text-[var(--danger)]">*</span> : null}
        </label>
      ) : null}

      <div className="relative flex items-center">
        {icon ? (
          <span aria-hidden className="pointer-events-none absolute left-4 flex text-[var(--muted)]">
            {icon}
          </span>
        ) : null}
        <Input
          id={fieldId}
          name={name}
          required={required}
          aria-invalid={Boolean(error)}
          className={cn(
            "glass-input h-11 w-full rounded-md text-sm px-4",
            icon && "pl-11",
            error && "border-[var(--danger)] focus:border-[var(--danger)]",
            className,
          )}
          {...rest}
        />
      </div>

      {description && !error ? <p className="text-xs text-[var(--muted)]">{description}</p> : null}
      {error ? (
        <p role="alert" className="text-xs font-medium text-[var(--danger)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
