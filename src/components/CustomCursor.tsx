import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0, trailX = 0, trailY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnterInteractive = () => setIsHovering(true);
    const onMouseLeaveInteractive = () => setIsHovering(false);

    const addHoverListeners = () => {
      document.querySelectorAll("a, button, [role='button'], input, textarea, select").forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", () => setIsVisible(false));
    document.addEventListener("mouseenter", () => setIsVisible(true));

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      trailX += (mouseX - trailX) * 0.08;
      trailY += (mouseY - trailY) * 0.08;
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      if (trailRef.current) trailRef.current.style.transform = `translate(${trailX}px, ${trailY}px)`;
      requestAnimationFrame(animate);
    };

    const raf = requestAnimationFrame(animate);
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [isVisible]);

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-transform duration-75 ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{ willChange: "transform" }}
      >
        <div className={`rounded-full bg-white transition-all duration-300 ease-out ${isHovering ? "w-12 h-12 opacity-50" : "w-3 h-3 opacity-90"}`} style={{ transform: "translate(-50%, -50%)" }} />
      </div>
      <div
        ref={trailRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{ willChange: "transform" }}
      >
        <div className={`rounded-full transition-all duration-500 ease-out ${isHovering ? "w-20 h-20 bg-[#1A73E8]/20 blur-xl" : "w-8 h-8 bg-[#1A73E8]/10 blur-lg"}`} style={{ transform: "translate(-50%, -50%)" }} />
      </div>
    </>
  );
}
