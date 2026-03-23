import { useLang } from "@/contexts/LangContext";

type HeroProps = {
  chapterNum: string;
  title: string;
  author: string;
  onScrollClick: () => void;
};

export function Hero({ chapterNum, title, author, onScrollClick }: HeroProps) {
  const { t } = useLang();
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      <div className="hero-bg absolute inset-0 z-0">
        <div
          className="hero-bg-gradient absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(200,170,110,0.06) 0%, transparent 60%), linear-gradient(180deg, #0d0c0a 0%, #0a0a0a 100%)",
          }}
        />
        <div
          className="hero-bg-image absolute inset-0 opacity-[0.12]"
          style={{
            background:
              "url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&q=80') center/cover no-repeat",
            filter: "grayscale(0.6) contrast(1.1)",
          }}
        />
        <div
          className="hero-bg-fade absolute bottom-0 left-0 right-0 h-[40%]"
          style={{
            background: "linear-gradient(to top, var(--bg), transparent)",
          }}
        />
      </div>
      <div className="hero-content relative z-10 px-6 text-center">
        <div className="hero-ornament mb-8 flex flex-col items-center">
          <div
            className="h-12 w-px"
            style={{
              background: "linear-gradient(to bottom, transparent, var(--gold))",
            }}
          />
          <div
            className="mt-0 h-1.5 w-1.5 rotate-45"
            style={{ background: "var(--gold)" }}
          />
          <div
            className="mt-0 h-4 w-px"
            style={{
              background: "linear-gradient(to bottom, var(--gold), transparent)",
            }}
          />
        </div>
        <div
          className="mb-3 font-display text-[10px] font-normal uppercase tracking-[5px]"
          style={{ color: "var(--gold-dim)" }}
        >
          {chapterNum}
        </div>
        <h2
          className="hero-chapter-title mb-4 font-display text-[clamp(28px,5vw,48px)] font-semibold leading-tight tracking-wide"
          style={{ color: "#f0ead6" }}
        >
          {title}
        </h2>
        <div
          className="hero-author font-display text-[10px] font-normal uppercase tracking-[4px]"
          style={{ color: "var(--gold)" }}
        >
          {author}
        </div>
      </div>
      <button
        type="button"
        className="hero-scroll-cue absolute bottom-10 left-1/2 z-10 -translate-x-1/2 cursor-pointer text-center transition-opacity hover:opacity-70"
        onClick={onScrollClick}
      >
        <span
          className="mb-2.5 block font-serif text-[9px] font-normal uppercase tracking-[4px]"
          style={{ color: "var(--gold-dim)" }}
        >
          {t.scrollToRead}
        </span>
        <i
          className="hero-scroll-arrow mx-auto block size-4 animate-[bobArrow_2s_ease-in-out_infinite]"
          style={{
            borderRight: "1px solid var(--gold-dim)",
            borderBottom: "1px solid var(--gold-dim)",
            transform: "rotate(45deg)",
          }}
        />
      </button>
    </section>
  );
}
