import { useLang } from "@/contexts/LangContext";

export function Footer() {
  const { t } = useLang();

  return (
    <footer
      className="mx-auto max-w-[700px] border-t px-6 py-14 pt-16 text-center"
      style={{ borderColor: "var(--divider)" }}
    >
      <p
        className="font-display text-[9px] font-normal uppercase tracking-[3px]"
        style={{ color: "var(--text-muted)" }}
      >
        {t.siteTitle} — {t.bookSubtitle}
      </p>
    </footer>
  );
}
