import { useEffect, useRef, useState } from "react";
import { chapters } from "@/data/chapters";
import { ProgressBar } from "@/components/ProgressBar";
import { Nav } from "@/components/Nav";
import { Drawer } from "@/components/Drawer";
import { Hero } from "@/components/Hero";
import { ChapterContent } from "@/components/ChapterContent";
import { ChapterNav } from "@/components/ChapterNav";
import { Footer } from "@/components/Footer";
import { EmailCapture } from "@/components/EmailCapture";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLang } from "@/contexts/LangContext";

function initTheme() {
  try {
    const saved = localStorage.getItem("centelhas-theme");
    if (saved === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    }
  } catch (_) {}
}

export default function Chapters() {
  const [activeChapter, setActiveChapter] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const fadeInRef = useFadeIn();
  const { t } = useLang();

  useEffect(() => {
    initTheme();
  }, []);

  const currentIndex = chapters.findIndex((c) => c.id === activeChapter);

  const scrollToContent = (chapterId: number) => {
    const el = document.getElementById(`chapter-${chapterId}`);
    el?.querySelector(".chapter-body")?.scrollIntoView({ behavior: "smooth" });
  };

  const switchChapter = (num: number) => {
    setActiveChapter(num);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      document.querySelectorAll(".fade-in").forEach((el) => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) e.target.classList.add("visible");
            });
          },
          { threshold: 0.1 }
        );
        observer.observe(el);
      });
    }, 100);
  };

  return (
    <>
      <ProgressBar />
      <Nav onMenuClick={() => setDrawerOpen((o) => !o)} menuOpen={drawerOpen} />
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        chapters={chapters}
        activeChapter={activeChapter}
        onSelectChapter={switchChapter}
      />
      <main ref={fadeInRef} id="content">
        {chapters.map((ch) => (
          <div
            key={ch.id}
            id={`chapter-${ch.id}`}
            className={`chapter ${ch.id === activeChapter ? "active" : ""}`}
          >
            <Hero
              chapterNum={t.chapterNum(ch.id)}
              title={t.chapterTitles[ch.id as 1 | 2 | 3] ?? ch.title}
              author={t.byAuthor}
              onScrollClick={() => scrollToContent(ch.id)}
            />
            <div className="chapter-wrapper max-w-[700px] mx-auto px-6 pb-20 pt-4 md:px-10 md:pb-24 md:pt-6">
              <ChapterContent content={ch.content} />
              <ChapterNav
                hasPrev={currentIndex > 0}
                hasNext={currentIndex < chapters.length - 1}
                onPrev={() => switchChapter(chapters[currentIndex - 1].id)}
                onNext={() => switchChapter(chapters[currentIndex + 1].id)}
              />
            </div>
          </div>
        ))}
        <section className="mx-auto max-w-[700px] px-6 py-14 md:px-10">
          <EmailCapture />
        </section>
      </main>
      <Footer />
    </>
  );
}
