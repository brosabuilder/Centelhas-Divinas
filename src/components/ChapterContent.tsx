import type { ContentBlock } from "@/data/chapters-types";

type ChapterContentProps = {
  content: ContentBlock[];
};

export function ChapterContent({ content }: ChapterContentProps) {
  return (
    <div className="chapter-body">
      {content.map((block, i) =>
        block.type === "scene-break" ? (
          <div
            key={i}
            className="scene-break fade-in py-8 text-center font-display text-[10px] tracking-[8px]"
            style={{ color: "var(--gold-dim)" }}
          >
            ⬥ &nbsp; ⬥ &nbsp; ⬥
          </div>
        ) : (
          <p
            key={i}
            className="fade-in mb-6"
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
        )
      )}
    </div>
  );
}
