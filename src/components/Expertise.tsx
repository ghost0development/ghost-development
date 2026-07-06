"use client";
import { motion } from "framer-motion";
import { Globe, Layout, Monitor, MessageCircle, Check, Star } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";
import ParallaxBg from "@/components/ParallaxSection";

type Tier = { name: string; price: string; desc: string; features: string[]; popular?: boolean };

const services: { icon: typeof Globe; title: string; tiers: Tier[] }[] = [
  {
    icon: Globe,
    title: "Strony internetowe",
    tiers: [
      { name: "Landing Page", price: "999 zł", desc: "Jednostronicowa wizytówka firmy", features: ["1 podstrona", "Responsywność", "Formularz kontaktowy", "Podstawowe SEO", "Hosting 1 rok"], popular: false },
      { name: "Strona Firmowa", price: "1 999 zł", desc: "Wielostronicowa strona z pełną prezentacją", features: ["Do 5 podstron", "Responsywność", "Formularz kontaktowy", "SEO + Google Maps", "Optymalizacja wydajności", "Hosting 1 rok", "Szkolenie z edycji"], popular: true },
      { name: "Strona Premium", price: "3 499 zł", desc: "Rozbudowana strona z blogiem i integracjami", features: ["Do 15 podstron", "Blog / aktualności", "Panel CMS", "Formularz + mailing", "SEO + analityka", "Optymalizacja Core Web Vitals", "Hosting 1 rok", "Szkolenie z edycji"], popular: false },
    ],
  },
  {
    icon: Layout,
    title: "Aplikacje webowe",
    tiers: [
      { name: "MVP", price: "3 999 zł", desc: "Minimum Viable Product — szybki start", features: ["Do 5 widoków", "Rejestracja/logowanie", "Baza danych (Supabase)", "Podstawowe API", "Hosting 3 miesiące"], popular: false },
      { name: "Standard", price: "7 999 zł", desc: "Pełna aplikacja z panelem administracyjnym", features: ["Do 15 widoków", "Panel admin", "Integracja płatności", "Powiadomienia e-mail", "API REST", "Hosting 6 miesięcy", "Szkolenie"], popular: true },
      { name: "Enterprise", price: "14 999 zł", desc: "Wielomodułowa platforma na miarę", features: ["Dowolna liczba widoków", "Panel admin + role", "Płatności + faktury", "Integracje zewnętrzne", "API + webhooki", "Dashboard analityczny", "Hosting 12 miesięcy", "Szkolenie + dokumentacja"], popular: false },
    ],
  },
  {
    icon: Monitor,
    title: "Aplikacje desktopowe",
    tiers: [
      { name: "Basic", price: "2 999 zł", desc: "Jednomodułowa aplikacja dla małej firmy", features: ["1 moduł funkcyjny", "Lokalna baza SQLite", "Raportowanie PDF", "Instalator Windows", "Licencja na 1 stanowisko"], popular: false },
      { name: "Pro", price: "5 999 zł", desc: "Rozbudowany system z raportami", features: ["3 moduły funkcyjne", "Baza SQLite / network", "Raportowanie + wykresy", "Eksport Excel/PDF", "Backup bazy danych", "Licencja na 3 stanowiska", "Szkolenie"], popular: true },
      { name: "Enterprise", price: "11 999 zł", desc: "Wielostanowiskowy system dla firmy", features: ["Dowolna liczba modułów", "Baza sieciowa (współdzielona)", "Raportowanie zaawansowane", "Eksport + mailing", "Logowanie operacji", "Panel administracyjny", "Licencja na 10 stanowisk", "Szkolenie + wsparcie 30d"], popular: false },
    ],
  },
  {
    icon: MessageCircle,
    title: "Konsulting techniczny",
    tiers: [
      { name: "Konsultacja", price: "80 zł / h", desc: "Doradztwo ad-hoc", features: ["1 godzina online/telefon", "Odpowiedź na pytania", "Rekomendacje technologii", "Raport z konsultacji", "Faktura VAT"], popular: false },
      { name: "Audyt kodu", price: "500 zł", desc: "Przegląd i optymalizacja istniejącego projektu", features: ["Audyt kodu (do 10k linii)", "Raport z wnioskami", "Rekomendacje optymalizacji", "Konsultacja wyników", "Faktura VAT"], popular: true },
      { name: "Retainer Pro", price: "1 200 zł / mc", desc: "Stałe wsparcie techniczne", features: ["20h wsparcia miesięcznie", "Priorytetowa odpowiedź", "Code review", "Doradztwo architektoniczne", "Faktura VAT"], popular: false },
    ],
  },
];

function ServiceCard({ service, i }: { service: typeof services[0]; i: number }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
      className="bg-[hsl(0_0%_3%/0.6)] backdrop-blur-sm border border-[hsl(var(--card-border))/0.3] rounded-2xl overflow-hidden"
    >
      <div className="p-6 md:p-8 border-b border-[hsl(var(--card-border))/0.2]">
        <div className="flex items-center gap-3 mb-3">
          <div className="text-[hsl(var(--primary))]">
            <Icon size={22} />
          </div>
          <h3 className="text-base font-semibold text-white">{service.title}</h3>
        </div>
      </div>
      <div className="divide-y divide-[hsl(var(--card-border))/0.15]">
        {service.tiers.map((tier) => (
          <div key={tier.name} className={`relative p-5 md:p-6 transition-colors hover:bg-[hsl(var(--primary))/0.02] ${tier.popular ? "bg-[hsl(var(--primary))/0.04]" : ""}`}>
            {tier.popular && (
              <div className="absolute top-3 right-3 flex items-center gap-1 text-[9px] font-mono tracking-widest text-[hsl(var(--primary))] uppercase">
                <Star size={10} className="fill-[hsl(var(--primary))]" />
                Polecany
              </div>
            )}
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h4 className="text-sm font-semibold text-white">{tier.name}</h4>
                <p className="text-[11px] text-[hsl(var(--muted))] font-light mt-0.5">{tier.desc}</p>
              </div>
              <span className="text-sm font-mono font-semibold text-[hsl(var(--primary))] whitespace-nowrap">{tier.price}</span>
            </div>
            <ul className="space-y-1.5 mb-4">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[11px] text-[hsl(0_0%_65%)]">
                  <Check size={10} className="text-[hsl(var(--primary))] mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#kontakt"
              className={`inline-block w-full text-center text-[10px] font-semibold tracking-widest uppercase py-2.5 rounded-lg transition-all ${
                tier.popular
                  ? "bg-[hsl(var(--primary))] text-white hover:brightness-110"
                  : "bg-[hsl(var(--primary))/0.08] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))/0.15]"
              }`}
            >
              Wybierz
            </a>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Expertise() {
  return (
    <section id="uslugi" className="py-24 px-4 md:px-8 relative">
      <ParallaxBg speed={0.15}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.03),transparent_70%)]" />
      </ParallaxBg>
      <div className="max-w-6xl mx-auto relative">
        <div className="mb-14">
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
            text="Sprawdź pakiety"
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
            Przejrzyste pakiety z górką ceną — bez ukrytych kosztów.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} i={i} />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
          className="text-center mt-10"
        >
          <p className="text-xs text-[hsl(var(--muted))] font-light">
            Potrzebujesz czegoś spoza pakietu?{" "}
            <a href="#kontakt" className="text-[hsl(var(--primary))] hover:underline">Opisz swój projekt</a>
            {" "}— wycenimy indywidualnie.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
