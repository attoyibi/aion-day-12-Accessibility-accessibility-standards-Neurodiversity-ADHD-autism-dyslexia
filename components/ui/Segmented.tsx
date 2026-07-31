'use client';

/** Small accessible segmented control used across the Learn widgets. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  size = 'md',
}: {
  options: { value: T; label: string; icon?: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
  size?: 'sm' | 'md';
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex flex-wrap gap-1 rounded-xl border border-lilac-edge bg-lilac-soft p-1"
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={`rounded-lg font-semibold transition-colors ${
              size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-sm'
            } ${
              active
                ? 'bg-purple text-white shadow-sm'
                : 'text-navy/70 hover:bg-white hover:text-navy'
            }`}
          >
            {o.icon && <span aria-hidden="true">{o.icon} </span>}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
