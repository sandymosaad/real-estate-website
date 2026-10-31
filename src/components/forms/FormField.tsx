import type { InputHTMLAttributes } from "react";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

/** Renders a labeled input with its accessible validation message. */
export function FormField({ label, error, id, ...props }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        className="mt-2 w-full rounded-xl border border-border bg-surface p-3 outline-none placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary"
        {...props}
      />
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
}
