"use client";
import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Building2, Store, Briefcase, Check, ArrowRight, X, Calendar, Shield, Clock, Laptop, Code, Database, Globe, Mail, Smartphone, LayoutDashboard, FileText, Users, Palette } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";
import ParallaxBg from "@/components/ParallaxSection";

type DetailPkg = { name: string; price: string; desc: string; features: string[] };
type EnterprisePkg = { name: string };

const segments: ({
  id: string;
  icon: typeof Store;
  title: string;
  badge: string;
  desc: string;
  gradient: string;
  popular?: boolean;
  packages: (DetailPkg | EnterprisePkg)[];
  customPrice?: boolean;
})[] = [
  {
    id: "male",
    icon: Store,
    title: "Małe firmy",
    badge: "Start",
    desc: "Dla lokalnych biznesów i startupów — wszystko czego potrzebujesz w stałej cenie.",
    gradient: "from-[hsl(var(--primary))/0.15] to-transparent",
    packages: [
      { name: "Landing Page", price: "1 700 zł", desc: "Jednostronicowa strona która sprzedaje — idealna na start.", features: ["Responsywny design", "Formularz kontaktowy", "Podstawowe SEO", "Hosting 1 rok", "Domena .pl 1 rok", "Google Analytics"] },
      { name: "Strona Firmowa", price: "3 500 zł", desc: "Wielostronicowa wizytówka z pełną prezentacją usług.", features: ["Do 5 podstron", "Responsywność + RWD", "Formularz + Google Maps", "Galeria zdjęć", "SEO + optymalizacja", "Szkolenie z edycji", "Hosting 1 rok"] },
      { name: "Strona Premium", price: "5 500 zł", desc: "Rozbudowana strona z blogiem i panelami administracyjnymi.", features: ["Do 15 podstron", "Blog / CMS", "Panel administracyjny", "Formularz + mailing", "SEO + analityka", "Core Web Vitals", "Hosting + domena 1 rok", "Szkolenie"] },
      { name: "Desktop Basic", price: "3 500 zł", desc: "Aplikacja okienkowa do zarządzania firmą.", features: ["1 moduł funkcyjny", "Baza danych SQLite", "Raporty PDF", "Instalator Windows", "Licencja 1 stanowisko"] },
      { name: "Konsultacja", price: "70 zł/h", desc: "Godzina rozmowy z ekspertem — odpowiem na pytania.", features: ["1h online / telefon", "Rekomendacje technologii", "Raport z konsultacji", "Faktura VAT"] },
      { name: "Retainer", price: "200 zł/mc", desc: "Stałe wsparcie — drobne poprawki i doradztwo.", features: ["5h miesięcznie", "Czas odpowiedzi 48h", "Drobne poprawki UI", "Doradztwo techniczne"] },
    ],
  },
  {
    id: "srednie",
    icon: Briefcase,
    title: "Średnie firmy",
    badge: "Popularne",
    desc: "Dla rozwijających się firm — rozbudowane projekty z gwarancją jakości.",
    gradient: "from-[hsl(var(--secondary))/0.15] to-transparent",
    popular: true,
    packages: [
      { name: "Strona Biznes", price: "8 000 zł", desc: "Profesjonalna strona z CMS i zaawansowanym SEO.", features: ["CMS + blog", "Do 20 podstron", "Integracja z CRM", "Newsletter", "SEO zaawansowane", "Optymalizacja wydajności", "Hosting + domena 1 rok", "Szkolenie zespołu"] },
      { name: "Aplikacja Web", price: "15 000 zł", desc: "Pełna aplikacja z panelem admin i płatnościami.", features: ["Do 15 widoków", "Panel administracyjny", "System płatności", "API REST", "Baza danych Supabase", "Powiadomienia e-mail", "Hosting 6 miesięcy", "Szkolenie"] },
      { name: "Desktop Pro", price: "8 000 zł", desc: "System desktopowy dla zespołu z raportami.", features: ["3 moduły funkcyjne", "Baza sieciowa", "Raporty Excel/PDF", "Eksport danych", "Backup bazy", "Licencja 3 stanowiska", "Szkolenie"] },
      { name: "Audyt kodu", price: "1 500 zł", desc: "Przegląd kodu z raportem i rekomendacjami.", features: ["Audyt do 10k linii", "Raport z wnioskami", "Rekomendacje optymalizacji", "Konsultacja wyników", "Faktura VAT"] },
      { name: "Retainer", price: "600 zł/mc", desc: "Stałe wsparcie techniczne z priorytetem.", features: ["10h miesięcznie", "Czas odpowiedzi 24h", "Code review", "Wsparcie wdrożeniowe", "Doradztwo architektoniczne"] },
    ],
  },
  {
    id: "duze",
    icon: Building2,
    title: "Duże firmy",
    badge: "Premium",
    desc: "Dla wymagających — zaawansowane systemy i długoterminowe partnerstwo.",
    gradient: "from-[hsl(0_0%_100%/0.05)] to-transparent",
    packages: [
      { name: "Aplikacje webowe / platformy" },
      { name: "Systemy desktopowe Enterprise" },
      { name: "Retainer (20h/mc — od 4 000 zł/mc)" },
      { name: "Konsulting architektoniczny" },
    ],
    customPrice: true,
  },
];

const iconMap: Record<string, typeof Globe> = {
  "Landing Page": Globe,
  "Strona Firmowa": Globe,
  "Strona Premium": Globe,
  "Strona Biznes": Globe,
  "Desktop Basic": Laptop,
  "Aplikacja Web": Code,
  "Desktop Pro": Laptop,
  "Audyt kodu": FileText,
  "Konsultacja": Calendar,
  "Retainer": Clock,
};

function getIcon(name: string) {
  return iconMap[name] || Shield;
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({ opacity: 1, x: 0, transition: { delay: 0.1 + i * 0.05, duration: 0.3, ease: "easeOut" } }),
};

function DetailModal({ segment, onClose }: { segment: typeof segments[0]; onClose: () => void }) {
  const Icon = segment.icon;

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
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[hsl(var(--card-border))/0.3] bg-[hsl(240_10%_4%/0.95)] shadow-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 md:p-8 border-b border-[hsl(var(--card-border))/0.15] bg-[hsl(240_10%_4%/0.95)] backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${segment.popular ? "bg-[hsl(var(--secondary))/0.1] text-[hsl(var(--secondary))]" : "bg-[hsl(var(--primary))/0.08] text-[hsl(var(--primary))]"}`}>
              <Icon size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{segment.title}</h3>
              <p className="text-[11px] text-[hsl(var(--muted))] font-light">{segment.badge}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-[hsl(0_0%_8%)] flex items-center justify-center text-[hsl(var(--muted))] hover:text-white hover:bg-[hsl(0_0%_12%)] transition-all">
            <X size={14} />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <p className="text-[13px] text-[hsl(var(--muted))] font-light leading-relaxed mb-8">{segment.desc}</p>

          {segment.customPrice ? (
            <div className="space-y-4">
              {segment.packages.map((pkg, pi) => {
                const PIcon = getIcon((pkg as any).name);
                return (
                  <motion.div key={pi} custom={pi} variants={itemVariants} initial="hidden" animate="visible" className="p-5 rounded-2xl bg-[hsl(0_0%_100%/0.02)] border border-[hsl(var(--card-border))/0.15]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[hsl(var(--primary))/0.08] flex items-center justify-center text-[hsl(var(--primary))]">
                        <PIcon size={15} />
                      </div>
                      <h4 className="text-sm font-semibold text-white">{pkg.name}</h4>
                    </div>
                    <p className="text-[11px] text-[hsl(var(--muted))/0.6] font-light ml-11">Wycena indywidualna — opisz swój projekt</p>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-5">
              {(segment.packages as DetailPkg[]).map((pkg, pi) => {
                const PIcon = getIcon(pkg.name);
                return (
                  <motion.div key={pi} custom={pi} variants={itemVariants} initial="hidden" animate="visible" className="p-5 md:p-6 rounded-2xl bg-[hsl(0_0%_100%/0.02)] border border-[hsl(var(--card-border))/0.15] hover:border-[hsl(var(--card-border))/0.25] transition-colors">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${segment.popular ? "bg-[hsl(var(--secondary))/0.1] text-[hsl(var(--secondary))]" : "bg-[hsl(var(--primary))/0.08] text-[hsl(var(--primary))]"}`}>
                          <PIcon size={17} />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white">{pkg.name}</h4>
                          <p className="text-[11px] text-[hsl(var(--muted))/0.6] font-light mt-0.5">{pkg.desc}</p>
                        </div>
                      </div>
                      <span className={`text-lg font-bold font-mono whitespace-nowrap shrink-0 ${segment.popular ? "text-[hsl(var(--secondary))]" : "text-[hsl(var(--primary))]"}`}>{pkg.price}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-4 ml-12">
                      {pkg.features.map((f, fi) => (
                        <div key={fi} className="flex items-center gap-2">
                          <Check size={9} className="text-[hsl(var(--primary))] shrink-0" />
                          <span className="text-[11px] text-[hsl(0_0%_65%)] font-light">{f}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end mt-4 pt-3 border-t border-[hsl(var(--card-border))/0.1]">
                      <a
                        href={`mailto:ghost.development.info@gmail.com?subject=Zapytanie%20o%20${encodeURIComponent(pkg.name)}`}
                        className="flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase text-[hsl(var(--primary))] hover:text-white transition-colors"
                      >
                        Wyślij zapytanie <ArrowRight size={11} />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {segment.customPrice && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
              className="mt-8"
            >
              <a
                href="#kontakt"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[hsl(var(--primary))] text-white text-xs font-semibold tracking-widest uppercase hover:brightness-110 transition-all shadow-lg shadow-[hsl(var(--primary))/0.25]"
              >
                <Mail size={14} />
                Opisz projekt
                <ArrowRight size={13} />
              </a>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function SegmentCard({ segment, i, onOpen }: { segment: typeof segments[0]; i: number; onOpen: () => void }) {
  const Icon = segment.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" }}
      onClick={onOpen}
      className={`relative rounded-3xl border transition-all duration-500 flex flex-col cursor-pointer group ${
        segment.popular
          ? "border-[hsl(var(--secondary))/0.3] bg-[hsl(0_0%_3%/0.9)] shadow-2xl shadow-[hsl(var(--secondary))/0.08] scale-[1.02] z-10"
          : "border-[hsl(var(--card-border))/0.25] bg-[hsl(0_0%_3%/0.7)] backdrop-blur-sm hover:border-[hsl(var(--card-border))/0.4]"
      }`}
    >
      {segment.popular && (
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-[hsl(var(--secondary))/0.2] via-transparent to-transparent opacity-50 pointer-events-none" />
      )}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-transparent via-transparent to-[hsl(var(--primary))/0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative p-8 md:p-10">
        <div className="relative">
          <div className="flex items-start justify-between mb-6">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
              segment.popular
                ? "bg-[hsl(var(--secondary))/0.1] text-[hsl(var(--secondary))] group-hover:bg-[hsl(var(--secondary))/0.15]"
                : "bg-[hsl(var(--primary))/0.08] text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))/0.12]"
            }`}>
              <Icon size={22} />
            </div>
            <span className={`text-[9px] font-mono tracking-[0.25em] uppercase px-3 py-1.5 rounded-full border ${
              segment.popular
                ? "bg-[hsl(var(--secondary))/0.1] text-[hsl(var(--secondary))] border-[hsl(var(--secondary))/0.2]"
                : "bg-[hsl(0_0%_8%)] text-[hsl(var(--muted))] border-[hsl(0_0%_12%)]"
            }`}>
              {segment.badge}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{segment.title}</h3>
          <p className="text-[12px] text-[hsl(var(--muted))] font-light leading-relaxed mb-6">{segment.desc}</p>

          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-[hsl(var(--primary))] group-hover:gap-3 transition-all">
            Zobacz szczegóły
            <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Expertise() {
  const [selected, setSelected] = useState<string | null>(null);

  const current = segments.find((s) => s.id === selected) || null;

  return (
    <section id="uslugi" className="py-24 px-4 md:px-8 relative overflow-hidden">
      <ParallaxBg speed={0.15}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.03),transparent_70%)]" />
      </ParallaxBg>
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[hsl(var(--primary))/0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative">
        <div className="mb-16">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-px bg-[hsl(var(--primary))] mb-6 shadow-lg shadow-[hsl(var(--primary))/0.3]"
          />
          <AnimatedText
            text="OFERTA"
            className="text-xs font-mono font-medium tracking-[0.3em] text-[hsl(var(--muted))] uppercase block mb-4"
            as="span"
            variant="words"
          />
          <AnimatedText
            text="Cennik"
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
            Pakiety dopasowane do skali Twojego biznesu — kliknij i zobacz szczegóły.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {segments.map((segment, i) => (
            <SegmentCard key={segment.id} segment={segment} i={i} onOpen={() => setSelected(segment.id)} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
          className="text-center mt-12"
        >
          <p className="text-xs text-[hsl(var(--muted))] font-light">
            Nie znajdujesz swojego pakietu?{" "}
            <a href="#kontakt" className="text-[hsl(var(--primary))] hover:underline">Opisz projekt</a>
            {" "}— wycenimy indywidualnie.
          </p>
        </motion.div>
      </div>

      <AnimatePresence>
        {current && (
          <DetailModal key={current.id} segment={current} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
