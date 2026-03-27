import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent">
      <div
        className="h-full transition-[width] duration-75 ease-out rounded-r-full"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #1A73E8 0%, #FACC15 50%, #00D99F 100%)",
          boxShadow: "0 0 10px rgba(26, 115, 232, 0.5)",
        }}
      />
    </div>
  );
}
