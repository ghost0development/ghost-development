"use client";
import { motion } from "framer-motion";
import { Building2, Store, Briefcase, Check, ArrowRight } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";
import ParallaxBg from "@/components/ParallaxSection";

const segments = [
  {
    id: "male",
    icon: Store,
    title: "Małe firmy",
    badge: "Start",
    desc: "Dla lokalnych biznesów i startupów — wszystko czego potrzebujesz w stałej cenie.",
    gradient: "from-[hsl(var(--primary))/0.15] to-transparent",
    borderGlow: "shadow-[hsl(var(--primary))/0.1]",
    packages: [
      { name: "Landing Page", price: "1 700 zł" },
      { name: "Strona Firmowa", price: "3 500 zł" },
      { name: "Strona Premium", price: "5 500 zł" },
      { name: "Desktop Basic", price: "3 500 zł" },
      { name: "Konsultacja", price: "70 zł/h" },
      { name: "Retainer (5h/mc)", price: "200 zł/mc" },
    ],
  },
  {
    id: "srednie",
    icon: Briefcase,
    title: "Średnie firmy",
    badge: "Popularne",
    desc: "Dla rozwijających się firm — rozbudowane projekty z gwarancją jakości.",
    gradient: "from-[hsl(var(--secondary))/0.15] to-transparent",
    borderGlow: "shadow-[hsl(var(--secondary))/0.15]",
    popular: true,
    packages: [
      { name: "Strona Biznes (CMS+blog)", price: "8 000 zł" },
      { name: "Aplikacja Web Standard", price: "15 000 zł" },
      { name: "Desktop Pro", price: "8 000 zł" },
      { name: "Audyt kodu", price: "1 500 zł" },
      { name: "Retainer (10h/mc)", price: "600 zł/mc" },
      { name: "Dedykowany zespół / outsourcing" },
      { name: "Konsulting architektoniczny" },
    ],
  },
  {
    id: "duze",
    icon: Building2,
    title: "Duże firmy",
    badge: "Premium",
    desc: "Dla wymagających — zaawansowane systemy i długoterminowe partnerstwo.",
    gradient: "from-[hsl(0_0%_100%/0.05)] to-transparent",
    borderGlow: "shadow-[hsl(0_0%_100%/0.05)]",
    packages: [
      { name: "Aplikacje webowe / platformy" },
      { name: "Systemy desktopowe Enterprise" },
      { name: "Retainer (20h/mc)" },
      { name: "Konsulting architektoniczny" },
    ],
    customPrice: true,
  },
];

const mailTo = "ghost.development.info@gmail.com";

function SegmentCard({ segment, i }: { segment: typeof segments[0]; i: number }) {
  const Icon = segment.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" }}
      className={`relative rounded-3xl border transition-all duration-500 flex flex-col ${
        segment.popular
          ? "border-[hsl(var(--secondary))/0.3] bg-[hsl(0_0%_3%/0.9)] shadow-2xl shadow-[hsl(var(--secondary))/0.08] scale-[1.02] z-10"
          : "border-[hsl(var(--card-border))/0.25] bg-[hsl(0_0%_3%/0.7)] backdrop-blur-sm hover:border-[hsl(var(--card-border))/0.4]"
      }`}
    >
      {segment.popular && (
        <>
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-[hsl(var(--secondary))/0.2] via-transparent to-transparent opacity-50 pointer-events-none" />
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-[hsl(var(--secondary))/0.1] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </>
      )}

      <div className="relative p-8 md:p-10">
        <div className={`absolute inset-0 rounded-t-3xl bg-gradient-to-b ${segment.gradient} opacity-30 pointer-events-none`} />

        <div className="relative">
          <div className="flex items-start justify-between mb-6">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              segment.popular
                ? "bg-[hsl(var(--secondary))/0.1] text-[hsl(var(--secondary))]"
                : "bg-[hsl(var(--primary))/0.08] text-[hsl(var(--primary))]"
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
          <p className="text-[12px] text-[hsl(var(--muted))] font-light leading-relaxed mb-8">{segment.desc}</p>

          <div className="space-y-3 mb-8">
            {segment.packages.map((pkg, pi) => (
              <div key={pi}>
                {"price" in pkg && pkg.price ? (
                  <a
                    href={`mailto:${mailTo}?subject=Zapytanie%20o%20${encodeURIComponent(pkg.name)}`}
                    className="flex items-center justify-between py-2 px-3 rounded-xl bg-[hsl(0_0%_100%/0.02)] hover:bg-[hsl(0_0%_100%/0.06)] transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Check size={10} className="text-[hsl(var(--primary))] shrink-0" />
                      <span className="text-[13px] text-[hsl(0_0%_75%)] group-hover:text-white transition-colors">{pkg.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[13px] font-semibold font-mono whitespace-nowrap ${
                        segment.popular ? "text-[hsl(var(--secondary))]" : "text-[hsl(var(--primary))]"
                      }`}>
                        {pkg.price}
                      </span>
                      <ArrowRight size={11} className="text-[hsl(var(--muted))/0] group-hover:text-[hsl(var(--muted))/0.5] transition-all" />
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-2.5 py-2 px-3 rounded-xl bg-[hsl(0_0%_100%/0.02)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--muted))/0.3] shrink-0" />
                    <span className="text-[13px] text-[hsl(0_0%_65%)] font-light">{pkg.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <a
            href={`mailto:${mailTo}?subject=Zapytanie%20ofertowe%20—%20${encodeURIComponent(segment.title)}`}
            className="block text-center text-[10px] font-mono tracking-wider text-[hsl(var(--muted))/0.6] hover:text-[hsl(var(--primary))] transition-colors pt-2 border-t border-[hsl(var(--card-border))/0.15]"
          >
            Zapytaj o wycenę →
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Expertise() {
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
            Pakiety dopasowane do skali Twojego biznesu — od lokalnej firmy po korporację.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {segments.map((segment, i) => (
            <SegmentCard key={segment.id} segment={segment} i={i} />
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
    </section>
  );
}
