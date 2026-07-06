"use client";
import { motion } from "framer-motion";
import { Globe, Layout, Monitor, MessageCircle, Check } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";
import ParallaxBg from "@/components/ParallaxSection";

type Tier = { name: string; price: string; features: string[]; popular?: boolean };

const services: { icon: typeof Globe; title: string; tiers: Tier[] }[] = [
  {
    icon: Globe, title: "Strony internetowe",
    tiers: [
      { name: "Landing Page", price: "999 zł", features: ["1 podstrona", "Responsywność", "Formularz", "Podstawowe SEO"], popular: false },
      { name: "Strona Firmowa", price: "1 999 zł", features: ["Do 5 podstron", "Responsywność", "Formularz + Google Maps", "SEO + optymalizacja", "Szkolenie z edycji"], popular: true },
      { name: "Strona Premium", price: "3 499 zł", features: ["Do 15 podstron", "Blog/CMS", "Panel administracyjny", "SEO + analityka", "Hosting + domena 1 rok"], popular: false },
    ],
  },
  {
    icon: Layout, title: "Aplikacje webowe",
    tiers: [
      { name: "MVP", price: "3 999 zł", features: ["Do 5 widoków", "Logowanie", "Baza danych", "Hosting 3 mc"], popular: false },
      { name: "Standard", price: "7 999 zł", features: ["Do 15 widoków", "Panel admin", "Płatności", "API REST", "Hosting 6 mc"], popular: true },
      { name: "Enterprise", price: "14 999 zł", features: ["Dowolna liczba widoków", "Panel admin + role", "Integracje", "API + webhooki", "Hosting 12 mc"], popular: false },
    ],
  },
  {
    icon: Monitor, title: "Aplikacje desktopowe",
    tiers: [
      { name: "Basic", price: "2 999 zł", features: ["1 moduł", "Baza lokalna", "Raporty PDF", "1 stanowisko"], popular: false },
      { name: "Pro", price: "5 999 zł", features: ["3 moduły", "Baza sieciowa", "Raporty + Excel", "3 stanowiska", "Szkolenie"], popular: true },
      { name: "Enterprise", price: "11 999 zł", features: ["Wielomodułowy", "Baza współdzielona", "Zaawansowane raporty", "10 stanowisk", "Wsparcie 30 dni"], popular: false },
    ],
  },
  {
    icon: MessageCircle, title: "Konsulting",
    tiers: [
      { name: "Konsultacja", price: "80 zł/h", features: ["1h online/telefon", "Rekomendacje", "Raport"], popular: false },
      { name: "Audyt kodu", price: "500 zł", features: ["Audyt do 10k linii", "Raport", "Konsultacja wyników"], popular: true },
      { name: "Retainer", price: "1 200 zł/mc", features: ["20h wsparcia/mc", "Priorytet", "Code review"], popular: false },
    ],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

function PricingCard({ tier, i }: { tier: Tier; i: number }) {
  return (
    <motion.div
      variants={fadeIn}
      className={`relative rounded-2xl border p-6 md:p-7 flex flex-col transition-all duration-300 hover:border-[hsl(var(--primary))/0.2] ${
        tier.popular
          ? "border-[hsl(var(--primary))/0.25] bg-[hsl(var(--primary))/0.04] shadow-lg shadow-[hsl(var(--primary))/0.05]"
          : "border-[hsl(var(--card-border))/0.3] bg-[hsl(0_0%_3%/0.6)] backdrop-blur-sm"
      }`}
    >
      {tier.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[hsl(var(--primary))] text-[9px] font-mono tracking-widest text-white uppercase shadow-lg shadow-[hsl(var(--primary))/0.3]">
          Polecany
        </div>
      )}
      <div className={`${tier.popular ? "mt-4" : ""}`}>
        <h4 className="text-base font-semibold text-white">{tier.name}</h4>
        <div className="mt-2 mb-4">
          <span className="text-2xl font-bold text-white">{tier.price}</span>
        </div>
        <ul className="space-y-2 mb-6 flex-1">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-[12px] text-[hsl(0_0%_65%)]">
              <Check size={11} className="text-[hsl(var(--primary))] mt-0.5 shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>
      <a
        href="#kontakt"
        className={`block w-full text-center text-[11px] font-semibold tracking-widest uppercase py-3 rounded-xl transition-all ${
          tier.popular
            ? "bg-[hsl(var(--primary))] text-white hover:brightness-110 shadow-lg shadow-[hsl(var(--primary))/0.2]"
            : "border border-[hsl(var(--primary))/0.2] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))/0.06]"
        }`}
      >
        Wybierz
      </a>
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
            Przejrzyste pakiety — bez ukrytych kosztów. Cena zawiera wszystko.
          </motion.p>
        </div>

        {services.map((service, si) => (
          <div key={service.title} className="mb-14 last:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-center gap-2 mb-6"
            >
              <service.icon size={16} className="text-[hsl(var(--primary))]" />
              <h3 className="text-sm font-semibold text-white tracking-wide">{service.title}</h3>
              <div className="flex-1 h-px bg-[hsl(var(--card-border))/0.2] ml-4" />
            </motion.div>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-30px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {service.tiers.map((tier, ti) => (
                <PricingCard key={tier.name} tier={tier} i={ti} />
              ))}
            </motion.div>
          </div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          className="text-center mt-12"
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
