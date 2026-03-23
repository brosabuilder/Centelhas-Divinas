import type { Chapter } from "@/data/chapters";
import { useLang } from "@/contexts/LangContext";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  chapters: Chapter[];
  activeChapter: number;
  onSelectChapter: (num: number) => void;
};

export function Drawer({
  open,
  onClose,
  chapters,
  activeChapter,
  onSelectChapter,
}: DrawerProps) {
  const { t } = useLang();
  return (
    <>
      <div
        className="fixed inset-0 z-[150] bg-black/50 transition-opacity duration-300"
        style={{
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
        }}
        onClick={onClose}
        aria-hidden
      />
      <aside
        className="fixed right-0 top-0 bottom-0 z-[151] w-[280px] max-w-[85vw] overflow-y-auto border-l px-6 pb-10 pt-8 transition-transform duration-300 ease-out"
        style={{
          background: "var(--bg)",
          borderColor: "var(--divider)",
          transform: open ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div
          className="mb-5 border-b pb-3 font-display text-[13px] font-normal uppercase tracking-[4px]"
          style={{
            color: "var(--gold-dim)",
            borderColor: "var(--divider)",
          }}
        >
          {t.chapters}
        </div>
        <div className="flex flex-col gap-0.5">
          {chapters.map((ch) => (
            <button
              key={ch.id}
              type="button"
              className="w-full rounded-none border-b border-transparent py-4 text-left font-serif text-[15px] font-normal uppercase tracking-[2px] transition-colors duration-300 hover:border-[var(--gold-dim)]"
              style={{
                color: activeChapter === ch.id ? "var(--gold)" : "var(--text-muted)",
                borderBottomColor:
                  activeChapter === ch.id ? "var(--gold-dim)" : undefined,
              }}
              onClick={() => {
                onSelectChapter(ch.id);
                onClose();
              }}
            >
              {t.chapterNum(ch.id)}
              <span className="block text-[13px] normal-case tracking-normal opacity-80 mt-0.5">
                {t.chapterTitles[ch.id as 1 | 2 | 3] ?? ch.subtitle}
              </span>
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}
