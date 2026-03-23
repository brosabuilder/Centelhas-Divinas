import { useLang } from "@/contexts/LangContext";

type ChapterNavProps = {
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export function ChapterNav({
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: ChapterNavProps) {
  const { t } = useLang();

  return (
    <div
      className="chapter-nav-bottom mt-20 flex justify-center gap-4 border-t pt-10"
      style={{ borderColor: "var(--divider)" }}
    >
      {hasPrev ? (
        <a
          href="#"
          className="chapter-nav-link inline-flex items-center justify-center rounded-none border px-7 py-3.5 font-serif text-[10px] font-normal uppercase tracking-[3px] no-underline transition-all duration-300"
          style={{
            borderWidth: "1px",
            color: "var(--gold-dim)",
            borderColor: "var(--divider)",
            background: "none",
          }}
          onClick={(e) => {
            e.preventDefault();
            onPrev();
          }}
        >
          {t.prev}
        </a>
      ) : (
        <span
          className="chapter-nav-link inline-flex cursor-default items-center justify-center rounded-none border px-7 py-3.5 font-serif text-[10px] font-normal uppercase tracking-[3px] opacity-50"
          style={{
            borderWidth: "1px",
            color: "var(--gold-dim)",
            borderColor: "var(--divider)",
            background: "none",
          }}
        >
          {t.prev}
        </span>
      )}
      {hasNext ? (
        <a
          href="#"
          className="chapter-nav-link inline-flex items-center justify-center rounded-none border px-7 py-3.5 font-serif text-[10px] font-normal uppercase tracking-[3px] no-underline transition-all duration-300 hover:border-[var(--gold-dim)]"
          style={{
            borderWidth: "1px",
            color: "var(--gold-dim)",
            borderColor: "var(--divider)",
            background: "none",
          }}
          onClick={(e) => {
            e.preventDefault();
            onNext();
          }}
        >
          {t.next}
        </a>
      ) : (
        <span
          className="chapter-nav-link inline-flex cursor-default items-center justify-center rounded-none border px-7 py-3.5 font-serif text-[10px] font-normal uppercase tracking-[3px] opacity-50"
          style={{
            borderWidth: "1px",
            color: "var(--gold-dim)",
            borderColor: "var(--divider)",
            background: "none",
          }}
        >
          {t.next}
        </span>
      )}
    </div>
  );
}
