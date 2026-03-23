import { useEffect, useState } from "react";

export function ProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setWidth(progress);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-[200] h-0.5 w-0 transition-[width] duration-100 ease-linear"
      style={{
        width: `${width}%`,
        background: "linear-gradient(90deg, var(--gold-dim), var(--gold))",
      }}
    />
  );
}
