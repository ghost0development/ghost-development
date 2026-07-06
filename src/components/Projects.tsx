"use client";
import { motion } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";
import ParallaxBg from "@/components/ParallaxSection";

const s = { width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function IconSystem() {
  return <svg {...s}><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>;
}

const projects = [
  {
    icon: IconSystem,
    title: "Apollo Szczecin — System",
    desc: "Kompletny system do zarządzania serwisem GSM: aplikacja kliencka do zgłaszania napraw i śledzenia statusu oraz panel pracownika z magazynem i bazą klientów.",
    tags: ["Python", "PySide6", "Qt", "SQLite"],
  },
];

function ProjectCard({ project, i }: { project: typeof projects[0]; i: number }) {
  const Icon = project.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" }}
      className="group relative bg-[hsl(0_0%_3%/0.6)] backdrop-blur-sm p-8 md:p-10 transition-all duration-500 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--secondary))/0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-[hsl(var(--secondary))/0.03] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="relative">
        <div className="mb-6 text-[hsl(var(--primary))] group-hover:drop-shadow-[0_0_16px_hsl(var(--primary)/0.4)] transition-all duration-400">
          <Icon />
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((t) => (
            <span key={t} className="px-2.5 py-1 text-[10px] font-mono tracking-wider rounded-md bg-[hsl(var(--primary))/0.04] text-[hsl(var(--muted))] border border-[hsl(var(--primary))/0.06] group-hover:bg-[hsl(var(--primary))/0.08] group-hover:border-[hsl(var(--primary))/0.15] group-hover:text-[hsl(0_0%_70%)] transition-all">
              {t}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-semibold text-white mb-3">{project.title}</h3>
        <p className="text-sm text-[hsl(var(--muted))] font-light leading-relaxed">{project.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projekty" className="py-24 px-4 md:px-8 relative">
      <ParallaxBg speed={0.12}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--secondary)/0.02),transparent_70%)]" />
      </ParallaxBg>
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <div className="relative">
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-[hsl(var(--secondary))/0.3] to-transparent hidden md:block" />
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-px bg-[hsl(var(--secondary))] mb-6 shadow-lg shadow-[hsl(var(--secondary))/0.3]"
            />
            <AnimatedText
              text="Portfolio"
              className="text-xs font-mono font-medium tracking-[0.3em] text-[hsl(var(--muted))] uppercase block mb-4"
              as="span"
              variant="words"
            />
            <AnimatedText
              text="Wybrane realizacje"
              className="text-4xl md:text-5xl font-bold tracking-tight inline-block"
              as="h2"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            className="text-sm text-[hsl(var(--muted))] font-light mt-4 max-w-lg"
          >
            Przykład naszego projektu — w pełni funkcjonalny system desktopowy.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[hsl(var(--card-border))/0.3] rounded-2xl overflow-hidden border border-[hsl(var(--card-border))/0.3]">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
