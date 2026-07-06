"use client";
import { motion } from "framer-motion";
import { Globe, Layout, Monitor, MessageCircle } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";
import ParallaxBg from "@/components/ParallaxSection";

const items = [
  {
    icon: Globe,
    title: "Strona internetowa",
    desc: "Nowoczesna, responsywna strona firmowa lub landing page. Optymalizacja wydajności i SEO. Idealne rozwiązanie dla małych firm i startupów.",
    price: "od 999 zł",
    cta: "Wyceń stronę",
  },
  {
    icon: Layout,
    title: "Aplikacja webowa",
    desc: "Zaawansowana aplikacja z autoryzacją, płatnościami i panelem administracyjnym. Backend w Supabase lub autorskim API. Dopasowana do Twojego biznesu.",
    price: "od 3 999 zł",
    cta: "Wyceń aplikację",
  },
  {
    icon: Monitor,
    title: "Aplikacja desktopowa",
    desc: "Profesjonalna aplikacja okienkowa dla firmy — system zarządzania, zamówień, magazynu i obsługi klienta. Python, PySide6, SQLite.",
    price: "od 2 999 zł",
    cta: "Wyceń system",
  },
  {
    icon: MessageCircle,
    title: "Konsulting techniczny",
    desc: "Doradztwo w zakresie architektury systemów, wyboru technologii, optymalizacji i review kodu. Dla firm które potrzebują eksperckiego oka.",
    price: "od 80 zł / h",
    cta: "Umów konsultację",
  },
];

function Card({ item, i }: { item: typeof items[0]; i: number }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
      className="group relative bg-[hsl(0_0%_3%/0.6)] backdrop-blur-sm p-8 md:p-10 transition-all duration-500 overflow-hidden flex flex-col"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))/0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-[hsl(var(--primary))/0.03] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="relative flex flex-col h-full">
        <div className="w-11 h-11 flex items-center justify-center mb-6 text-[hsl(var(--primary))] group-hover:text-white group-hover:drop-shadow-[0_0_12px_hsl(var(--primary)/0.5)] transition-all duration-400">
          <Icon size={24} />
        </div>
        <h3 className="text-base font-semibold text-white mb-3">{item.title}</h3>
        <p className="text-sm text-[hsl(var(--muted))] font-light leading-relaxed flex-1">{item.desc}</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-xs font-mono text-[hsl(var(--primary))] tracking-wider border border-[hsl(var(--primary))/0.15] rounded-full px-3 py-1">{item.price}</span>
          <a
            href="#kontakt"
            className="text-[10px] font-semibold tracking-widest uppercase px-4 py-2 rounded-lg bg-[hsl(var(--primary))/0.1] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white transition-all"
          >
            {item.cta}
          </a>
        </div>
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
          <div className="relative">
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-[hsl(var(--primary))/0.3] to-transparent hidden md:block" />
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
              text="Nasze usługi"
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
            Kompleksowe usługi programistyczne dla firm i przedsiębiorców.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[hsl(var(--card-border))/0.3] rounded-2xl overflow-hidden border border-[hsl(var(--card-border))/0.3]">
          {items.map((item, i) => (
            <Card key={item.title} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
