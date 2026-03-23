import { useLang } from "@/contexts/LangContext";

type NavProps = {
  onMenuClick: () => void;
  menuOpen: boolean;
};

export function Nav({ onMenuClick, menuOpen }: NavProps) {
  const { t } = useLang();

  return (
    <nav
      className="fixed left-0 right-0 top-0 z-[100] flex h-14 items-center justify-between px-6 md:px-10"
      style={{
        background: "var(--bg-nav)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 1px 0 var(--divider)",
      }}
    >
      <div
        className="font-display text-[11px] font-normal uppercase tracking-[4px]"
        style={{ color: "var(--gold)" }}
      >
        {t.siteTitle}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex flex-col justify-center gap-1.5 rounded-none p-2 transition-opacity hover:opacity-80"
          onClick={onMenuClick}
          aria-label={t.openMenu}
        >
          <span
            className="block h-px w-5 transition-transform duration-300"
            style={{
              background: "var(--gold-dim)",
              transform: menuOpen ? "translateY(6px) rotate(45deg)" : undefined,
            }}
          />
          <span
            className="block h-px w-5 transition-opacity duration-300"
            style={{
              background: "var(--gold-dim)",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block h-px w-5 transition-transform duration-300"
            style={{
              background: "var(--gold-dim)",
              transform: menuOpen
                ? "translateY(-6px) rotate(-45deg)"
                : undefined,
            }}
          />
        </button>
      </div>
    </nav>
  );
}
