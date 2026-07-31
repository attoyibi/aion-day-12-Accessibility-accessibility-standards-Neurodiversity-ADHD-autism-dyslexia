import type { ReactNode } from 'react';
import { CategoryChip } from './CategoryChip';
import type { CategoryId } from '@/lib/categories';

/**
 * Wrapper for a Learn concept: title + category tag + the caption, then the
 * interactive widget. The widget is the lesson; the caption is a caption.
 */
export function WidgetCard({
  title,
  category,
  caption,
  children,
  footnote,
}: {
  title: string;
  category?: CategoryId;
  caption: ReactNode;
  children: ReactNode;
  footnote?: ReactNode;
}) {
  return (
    <section className="aion-card overflow-hidden">
      <div className="border-b border-lilac-edge bg-lilac-soft px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-sm font-bold text-navy">{title}</h4>
          {category && (
            <span className="flex items-center gap-1.5 text-[11px] text-navy/50">
              <span aria-hidden="true">→</span>
              <CategoryChip id={category} />
            </span>
          )}
        </div>
        <p className="mt-1 text-xs leading-relaxed text-navy/70">{caption}</p>
      </div>

      <div className="p-4">{children}</div>

      {footnote && (
        <p className="border-t border-lilac-edge bg-white px-4 py-2.5 text-[11px] leading-relaxed text-navy/60">
          {footnote}
        </p>
      )}
    </section>
  );
}
