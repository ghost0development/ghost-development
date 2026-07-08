"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [isMobile] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const mouseRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    const onHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, .card-hover, input, textarea, select");
      if (interactive) {
        ring.style.width = "48px";
        ring.style.height = "48px";
        ring.style.borderColor = "hsl(var(--primary) / 0.4)";
        ring.style.backgroundColor = "hsl(var(--primary) / 0.03)";
      } else {
        ring.style.width = "32px";
        ring.style.height = "32px";
        ring.style.borderColor = "hsl(0 0% 50% / 0.2)";
        ring.style.backgroundColor = "transparent";
      }
    };

    const animate = () => {
      const rx = ringPosRef.current.x;
      const ry = ringPosRef.current.y;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      ringPosRef.current.x = rx + (mx - rx) * 0.12;
      ringPosRef.current.y = ry + (my - ry) * 0.12;
      ring.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("mouseover", onHover, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseover", onHover);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (typeof window === "undefined") return null;
  if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full bg-white pointer-events-none z-[99999]"
        style={{ transform: "translate3d(-100px, -100px, 0)", willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full pointer-events-none z-[99999] border transition-[width,height,background-color,border-color] duration-200"
        style={{
          transform: "translate3d(-100px, -100px, 0)",
          willChange: "transform",
          borderColor: "hsl(0 0% 50% / 0.2)",
          backgroundColor: "transparent",
        }}
      />
    </>
  );
}
