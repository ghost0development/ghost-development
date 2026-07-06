"use client";
import { motion } from "framer-motion";
import { Globe, Layout, Monitor, MessageCircle } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";
import ParallaxBg from "@/components/ParallaxSection";

const items = [
  { icon: Globe, title: "Strony internetowe", desc: "Nowoczesne, responsywne strony firmowe oraz landing page. Optymalizacja wydajności i SEO. Wdrożenie w 48h.", price: "od 999 zł" },
  { icon: Layout, title: "Aplikacje webowe", desc: "Zaawansowane aplikacje z autoryzacją, płatnościami i panelami administracyjnymi. Backend w Supabase lub autorskim API.", price: "od 3 999 zł" },
  { icon: Monitor, title: "Aplikacje desktopowe", desc: "Profesjonalne aplikacje okienkowe dla firm — systemy zarządzania, zamówień, magazynu i obsługi klienta. Python, PySide6.", price: "od 2 999 zł" },
  { icon: MessageCircle, title: "Konsulting techniczny", desc: "Doradztwo w zakresie architektury systemów, wyboru technologii i optymalizacji istniejących projektów.", price: "od 80 zł / h" },
];

function Card({ item, i }: { item: typeof items[0]; i: number }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
      className="group relative bg-[hsl(0_0%_3%/0.6)] backdrop-blur-sm p-8 md:p-10 transition-all duration-500 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))/0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-[hsl(var(--primary))/0.03] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="relative">
        <div className="w-11 h-11 flex items-center justify-center mb-6 text-[hsl(var(--primary))] group-hover:text-white group-hover:drop-shadow-[0_0_12px_hsl(var(--primary)/0.5)] transition-all duration-400">
          <Icon size={24} />
        </div>
        <h3 className="text-base font-semibold text-white mb-3">{item.title}</h3>
        <p className="text-sm text-[hsl(var(--muted))] font-light leading-relaxed">{item.desc}</p>
        <div className="inline-block text-xs font-mono text-[hsl(var(--primary))] mt-4 tracking-wider border border-[hsl(var(--primary))/0.15] rounded-full px-3 py-1 group-hover:bg-[hsl(var(--primary))/0.06] group-hover:border-[hsl(var(--primary))/0.3] transition-all duration-300">{item.price}</div>
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
