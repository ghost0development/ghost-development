"use client";
import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { X, ArrowRight, Check } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";
import ParallaxBg from "@/components/ParallaxSection";

const s = { width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function IconSystem() {
  return <svg {...s}><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>;
}

function IconGlobe() {
  return <svg {...s}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
}

type Project = {
  icon: typeof IconSystem;
  title: string;
  client: string;
  role: string;
  year: string;
  subtitle: string;
  problem: string;
  bullets: string[];
  solution: string;
  features: string[];
  tags: string[];
};

const projects: Project[] = [
  {
    icon: IconSystem,
    title: "Apollo Szczecin",
    client: "Apollo GSM Szczecin",
    role: "Pełny stack (desktop + baza)",
    year: "2026",
    subtitle: "System zarządzania serwisem GSM",
    problem: "Serwis GSM Apollo od lat działał na papierowych kartkach i Excelu. Zgłoszenia napraw gubiły się, klienci dzwonili z pytaniem „czy już gotowe”, a stan magazynu części był casem tygodniowym. Właściciel potrzebował systemu, który:",
    bullets: [
      "pozwoli klientowi samodzielnie zgłosić naprawę na miejscu (kiosk)",
      "da pracownikom pełny panel do zarządzania zleceniami, magazynem i klientami",
      "obsłuży kantor walutowy (wymiana walut to drugi biznes Apollo)",
      "działa lekko — na starym komputerze w punkcie, bez Internetu",
    ],
    solution: "Zbudowałem dwa lekkie programy desktopowe (Python + PySide6), które działają na jednej współdzielonej bazie SQLite. Aplikacja kliencka jako kiosk w poczekalni — klient sam zgłasza naprawę i dostaje kod śledzenia. Panel pracownika z logowaniem: zlecenia, magazyn, kantor, klienci.",
    features: [
      "Kody śledzenia (AP-7K3F9Q) — klient sam sprawdza status",
      "Statusy: zgłoszone → przyjęte → w naprawie → czeka na części → gotowe → wydane",
      "Magazyn części z alertem niskiego stanu",
      "Kantor walutowy: kursy, transakcje, historia",
      "Baza klientów z historią zleceń",
      "Role admin/pracownik, hasła SHA-256 + sól",
      "SQLite na dysku sieciowym — zero serwera",
      "Gotowe binarki Windows + Linux (~60 MB)",
    ],
    tags: ["Python", "PySide6", "Qt", "SQLite"],
  },
  {
    icon: IconGlobe,
    title: "Apollo Szczecin",
    client: "Apollo GSM Szczecin",
    role: "Frontend + Backend",
    year: "2026",
    subtitle: "Strona www serwisu GSM",
    problem: "Strona Apollo opierała się na starym WordPressie z 2015 — nieaktualna, wolna, nieprzystosowana do mobile. Klienci nie mogli znaleźć podstawowych informacji na telefonie. Brakowało formularza kontaktowego i integracji z mediami społecznościowymi.",
    bullets: [
      "klienci narzekali, że strona nie działa na telefonie",
      "cennik i usługi rozrzucone po kilku podstronach",
      "brak możliwości szybkiego kontaktu przez stronę",
    ],
    solution: "Nowa strona z React + Vite + Tailwind + Supabase. Lekka, szybka, w pełni responsywna. Stara treść zachowana, ale ułożona w przejrzystą strukturę: strona główna → usługi → cennik → kantor → kontakt.",
    features: [
      "Hero z karuzelą usług",
      "Podstrony: Serwis GSM, Kantor, Cennik, Kontakt, Blog",
      "Formularz kontaktowy → Supabase → powiadomienie email",
      "Facebook Pixel",
      "Google Maps integracja",
      "Pełna responsywność (mobile-first)",
      "Netlify deploy z GitHub",
    ],
    tags: ["React", "TypeScript", "Vite", "Tailwind", "Supabase"],
  },
];

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function DetailModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const Icon = project.icon;
  return (
    <motion.div
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
    >
      <div className="absolute inset-0 bg-[hsl(0_0%_0%/0.8)] backdrop-blur-xl" onClick={onClose} />
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[hsl(var(--card-border))/0.3] bg-[hsl(240_10%_4%/0.95)] shadow-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 md:p-8 border-b border-[hsl(var(--card-border))/0.15] bg-[hsl(240_10%_4%/0.95)] backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[hsl(var(--primary))/0.08] flex items-center justify-center text-[hsl(var(--primary))]">
              <Icon />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{project.title}</h3>
              <p className="text-[11px] text-[hsl(var(--muted))] font-light">{project.subtitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-[hsl(0_0%_8%)] flex items-center justify-center text-[hsl(var(--muted))] hover:text-white hover:bg-[hsl(0_0%_12%)] transition-all">
            <X size={14} />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-7">
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-[11px] font-mono text-[hsl(var(--muted))/0.6]">
            <span>{project.client}</span>
            <span>·</span>
            <span>{project.role}</span>
            <span>·</span>
            <span>{project.year}</span>
          </div>

          <div>
            <h4 className="text-[10px] font-mono tracking-[0.2em] uppercase text-[hsl(var(--muted))] mb-3">Problem</h4>
            <p className="text-sm text-[hsl(0_0%_70%)] font-light leading-relaxed mb-4">{project.problem}</p>
            <ul className="space-y-2">
              {project.bullets.map((b, bi) => (
                <li key={bi} className="flex items-start gap-3 text-sm text-[hsl(0_0%_65%)] font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] shrink-0 mt-1.5" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-mono tracking-[0.2em] uppercase text-[hsl(var(--muted))] mb-3">Rozwiązanie</h4>
            <p className="text-sm text-[hsl(0_0%_70%)] font-light leading-relaxed">{project.solution}</p>
          </div>

          <div>
            <h4 className="text-[10px] font-mono tracking-[0.2em] uppercase text-[hsl(var(--muted))] mb-4">Kluczowe funkcje</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map((f, fi) => (
                <div key={fi} className="flex items-center gap-2.5 text-sm text-[hsl(0_0%_65%)] font-light">
                  <Check size={9} className="text-[hsl(var(--primary))] shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="px-3 py-1.5 text-[10px] font-mono tracking-wider rounded-md bg-[hsl(var(--primary))/0.04] text-[hsl(var(--muted))] border border-[hsl(var(--primary))/0.06]">
                {t}
              </span>
            ))}
          </div>

          <div className="flex justify-end pt-2 border-t border-[hsl(var(--card-border))/0.1]">
            <a
              href={`mailto:ghost.development.info@gmail.com?subject=Zapytanie%20o%20projekt%20-%20${encodeURIComponent(project.title)}`}
              className="flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase text-[hsl(var(--primary))] hover:text-white transition-colors"
            >
              Współpracuj przy podobnym projekcie <ArrowRight size={11} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, i, onOpen }: { project: Project; i: number; onOpen: () => void }) {
  const Icon = project.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" }}
      onClick={onOpen}
      className="group relative bg-[hsl(0_0%_3%/0.6)] backdrop-blur-sm border border-[hsl(var(--card-border))/0.25] rounded-3xl transition-all duration-500 flex flex-col cursor-pointer hover:border-[hsl(var(--card-border))/0.45]"
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-transparent via-transparent to-[hsl(var(--primary))/0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-[hsl(var(--primary))/0.03] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="relative p-8 md:p-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[hsl(var(--primary))/0.08] flex items-center justify-center text-[hsl(var(--primary))] shrink-0 group-hover:bg-[hsl(var(--primary))/0.12] transition-colors">
            <Icon />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-white">{project.title}</h3>
            <p className="text-[12px] text-[hsl(var(--muted))] font-light leading-snug">{project.subtitle}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((t) => (
            <span key={t} className="px-2.5 py-1 text-[10px] font-mono tracking-wider rounded-md bg-[hsl(var(--primary))/0.04] text-[hsl(var(--muted))] border border-[hsl(var(--primary))/0.06] group-hover:bg-[hsl(var(--primary))/0.08] group-hover:border-[hsl(var(--primary))/0.15] transition-all">
              {t}
            </span>
          ))}
        </div>

        <p className="text-[12px] text-[hsl(var(--muted))] font-light leading-relaxed mb-6 line-clamp-3">{project.problem}</p>

        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-[hsl(var(--primary))] group-hover:gap-3 transition-all">
          Zobacz case study
          <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<string | null>(null);
  const current = projects.find((p) => p.title + p.year === selected) || null;

  return (
    <section id="projekty" className="py-24 px-4 md:px-8 relative">
      <ParallaxBg speed={0.12}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.02),transparent_70%)]" />
      </ParallaxBg>
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-px bg-[hsl(var(--primary))] mb-6 shadow-lg shadow-[hsl(var(--primary))/0.3]"
          />
          <AnimatedText
            text="Portfolio"
            className="text-xs font-mono font-medium tracking-[0.3em] text-[hsl(var(--muted))] uppercase block mb-4"
            as="span"
            variant="words"
          />
          <AnimatedText
            text="Case studies"
            className="text-4xl md:text-5xl font-bold tracking-tight inline-block"
            as="h2"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            className="text-sm text-[hsl(var(--muted))] font-light mt-4 max-w-lg"
          >
            Zrealizowane projekty — od analizy przez wdrożenie po wsparcie. Kliknij, żeby zobaczyć szczegóły.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.title + p.year}
              project={p}
              i={i}
              onOpen={() => setSelected(p.title + p.year)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {current && (
          <DetailModal
            key={current.title + current.year}
            project={current}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
