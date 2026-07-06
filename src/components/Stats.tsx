"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";

const stats = [
  { value: 1, label: "Zrealizowany projekt", suffix: "" },
  { value: 12, label: "Technologie", suffix: "+" },
  { value: 1, label: "Lat doświadczenia", suffix: "+" },
  { value: 0, label: "Siedziba", suffix: "", text: "Szczecin" },
];

function Counter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = Date.now();
          const tick = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{value}</span>;
}

function StatCard({ value, label, suffix, text, i }: { value: number; label: string; suffix: string; text?: string; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
      className="text-center p-8 md:p-10 bg-[hsl(0_0%_3%)] group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))/0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative">
        <div className="font-mono text-4xl sm:text-5xl md:text-6xl font-semibold bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent leading-none mb-2">
          {text ? (
            <span className="text-2xl sm:text-3xl md:text-4xl">{text}</span>
          ) : (
            <>
              <Counter target={value} />
              {suffix}
            </>
          )}
        </div>
        <div className="text-[10px] font-medium text-[hsl(var(--muted))] uppercase tracking-widest leading-relaxed px-2">{label}</div>
      </div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section id="about" className="py-24 px-4 md:px-8 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.02),transparent_70%)] pointer-events-none" />
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <div className="relative">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-px bg-[hsl(var(--primary))] mb-6 shadow-lg shadow-[hsl(var(--primary))/0.3]"
            />
            <AnimatedText
              text="Ghost Development"
              className="text-xs font-mono font-medium tracking-[0.3em] text-[hsl(var(--muted))] uppercase block mb-4"
              as="span"
              variant="words"
            />
            <AnimatedText
              text="Kim jesteśmy"
              className="text-4xl md:text-5xl font-bold tracking-tight"
              as="h2"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            className="text-sm text-[hsl(var(--muted))] font-light mt-4 max-w-xl leading-relaxed"
          >
            Jestem <strong className="text-white font-medium">Saylo</strong> — solo developer z Szczecina. Specjalizuję się w projektowaniu i wdrażaniu nowoczesnych stron internetowych oraz aplikacji webowych i desktopowych. Każdy projekt traktuję indywidualnie — od analizy wymagań, przez projekt, aż po wdrożenie i wsparcie techniczne.
          </motion.p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[hsl(var(--card-border))/0.3] rounded-2xl border border-[hsl(var(--card-border))/0.3]">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
