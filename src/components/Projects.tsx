"use client";
import { motion, type Variants } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";
import ParallaxBg from "@/components/ParallaxSection";

const s = { width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function IconSystem() {
  return <svg {...s}><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>;
}

function IconGlobe() {
  return <svg {...s}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
}

const projects = [
  {
    icon: IconSystem,
    title: "Apollo Szczecin — System serwisowy",
    client: "Apollo GSM Szczecin",
    role: "Pełny stack (desktop + baza danych)",
    year: "2026",
    problem: "Serwis GSM Apollo od lat działał na papierowych kartkach i Excelu. Zgłoszenia napraw gubiły się, klienci dzwonili z pytaniem „czy już gotowe”, a stan magazynu części był casem tygodniowym. Właściciel potrzebował systemu, który:",
    bullets: [
      "pozwoli klientowi samodzielnie zgłosić naprawę na miejscu (kiosk)",
      "da pracownikom pełny panel do zarządzania zleceniami, magazynem i klientami",
      "obsłuży kantor walutowy (wymiana walut to drugi biznes Apollo)",
      "działa lekko — na starym komputerze w punkcie, bez Internetu",
    ],
    solution: "Zbudowałem dwa lekkie programy desktopowe (Python + PySide6), które działają na jednej współdzielonej bazie SQLite. Aplikacja kliencka działa jako kiosk w poczekalni — klient sam zgłasza naprawę i dostaje kod śledzenia. Panel pracownika loguje się na konto i ma full access: zlecenia, magazyn, kantor, klienci.",
    features: [
      "Automatyczne kody śledzenia (AP-7K3F9Q) — klient sprawdza status bez logowania",
      "Statusy: zgłoszone → przyjęte → w naprawie → czeka na części → gotowe → wydane",
      "Magazyn części z progami minimalnego stanu (alert przy niskim stanie)",
      "Kantor walutowy: kursy kupna/sprzedaży, transakcje, historia",
      "Baza klientów z historią zleceń",
      "Role pracowników (admin/pracownik), hasła hashowane SHA-256 + sól",
      "SQLite z opcją dysku sieciowego — nie potrzeba serwera",
      "Gotowe binarki na Windows i Linux (PyInstaller, ~60 MB)",
    ],
    tags: ["Python", "PySide6", "Qt", "SQLite"],
  },
  {
    icon: IconGlobe,
    title: "Apollo Szczecin — Strona www",
    client: "Apollo GSM Szczecin",
    role: "Frontend + Backend (Supabase)",
    year: "2026",
    problem: "Strona Apollo opierała się na starym WordPressie z 2015 roku — nieaktualna, wolna, nieprzystosowana do mobile. Klienci nie mogli znaleźć podstawowych informacji (godziny, cennik, adres) na telefonie. Brakowało formularza kontaktowego i social media integration.",
    bullets: [
      "klienci narzekali, że strona nie działa na telefonie",
      "cennik i usługi były rozrzucone po kilku podstronach",
      "brak możliwości szybkiego kontaktu przez stronę",
    ],
    solution: "Nowa strona zbudowana od zera w React + Vite + Tailwind, z formularzem kontaktowym na Supabase i powiadomieniami email. Lekka, szybka, w pełni responsywna. Zachowałem starą treść (którą klienci znają) ale ułożyłem ją w przejrzystą strukturę: strona główna → usługi → cennik → kantor → kontakt.",
    features: [
      "Hero z karuzelą usług",
      "Podstrony: Serwis GSM, Kantor, Cennik, Kontakt, Blog",
      "Formularz kontaktowy → Supabase → powiadomienie email",
      "Facebook Pixel",
      "Google Maps integracja",
      "Pełna responsywność (mobile-first)",
      "Netlify deploy (automatyczny z GitHub)",
    ],
    tags: ["React", "TypeScript", "Vite", "Tailwind", "Supabase"],
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" } }),
};

function ProjectCard({ project, i }: { project: typeof projects[0]; i: number }) {
  const Icon = project.icon;
  return (
    <motion.div
      custom={i}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="group relative bg-[hsl(0_0%_3%/0.6)] backdrop-blur-sm border border-[hsl(var(--card-border))/0.25] transition-all duration-500 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))/0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-[hsl(var(--primary))/0.03] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative p-8 md:p-12">
        <div className="flex items-start gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[hsl(var(--primary))/0.08] flex items-center justify-center text-[hsl(var(--primary))] shrink-0 group-hover:bg-[hsl(var(--primary))/0.12] transition-colors">
            <Icon />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-mono text-[hsl(var(--muted))] mb-2">
              <span>{project.client}</span>
              <span className="text-[hsl(var(--muted))/0.4]">·</span>
              <span>{project.role}</span>
              <span className="text-[hsl(var(--muted))/0.4]">·</span>
              <span>{project.year}</span>
            </div>
            <h3 className="text-xl font-bold text-white leading-tight">{project.title}</h3>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h4 className="text-[10px] font-mono tracking-[0.2em] uppercase text-[hsl(var(--muted))] mb-3">Problem</h4>
            <p className="text-sm text-[hsl(var(--muted))] font-light leading-relaxed mb-3">{project.problem}</p>
            <ul className="space-y-1.5">
              {project.bullets.map((b, bi) => (
                <li key={bi} className="flex items-start gap-2 text-sm text-[hsl(var(--muted))] font-light">
                  <span className="text-[hsl(var(--primary))] mt-1 shrink-0">·</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-mono tracking-[0.2em] uppercase text-[hsl(var(--muted))] mb-3">Rozwiązanie</h4>
            <p className="text-sm text-[hsl(var(--muted))] font-light leading-relaxed">{project.solution}</p>
          </div>

          <div>
            <h4 className="text-[10px] font-mono tracking-[0.2em] uppercase text-[hsl(var(--muted))] mb-3">Kluczowe funkcje</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map((f, fi) => (
                <div key={fi} className="flex items-center gap-2.5 text-sm text-[hsl(var(--muted))] font-light">
                  <span className="w-1 h-1 rounded-full bg-[hsl(var(--primary))] shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((t) => (
              <span key={t} className="px-3 py-1.5 text-[10px] font-mono tracking-wider rounded-md bg-[hsl(var(--primary))/0.04] text-[hsl(var(--muted))] border border-[hsl(var(--primary))/0.06] group-hover:bg-[hsl(var(--primary))/0.08] group-hover:border-[hsl(var(--primary))/0.15] transition-all">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projekty" className="py-24 px-4 md:px-8 relative">
      <ParallaxBg speed={0.12}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.02),transparent_70%)]" />
      </ParallaxBg>
      <div className="max-w-5xl mx-auto">
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
            Zrealizowane projekty — od analizy przez wdrożenie po wsparcie.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 gap-px bg-[hsl(var(--card-border))/0.3] rounded-2xl overflow-hidden border border-[hsl(var(--card-border))/0.3]">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
