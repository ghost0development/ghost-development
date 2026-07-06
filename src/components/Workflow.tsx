"use client";
import { motion } from "framer-motion";
import { MessageSquare, PenLine, Code, Rocket } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";

const steps = [
  { icon: MessageSquare, title: "Konsultacja", desc: "Poznaję Twój biznes, potrzeby i wizję — ustalam zakres i budżet" },
  { icon: PenLine, title: "Projekt", desc: "Tworzę prototyp i akceptujemy wygląd — wiesz co dostajesz" },
  { icon: Code, title: "Kodowanie", desc: "Buduję stronę krok po kroku z optymalizacją na każdym etapie" },
  { icon: Rocket, title: "Wdrożenie", desc: "Testuję, wgrywam na serwer i szkolę — gotowe do działania" },
];

export default function Workflow() {
  return (
    <section id="workflow" className="py-24 px-4 md:px-8 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_bottom,hsl(var(--secondary)/0.03),transparent_70%)] pointer-events-none" />
      <div className="max-w-5xl mx-auto relative">
        <AnimatedText
          text="JAK DZIAŁAMY"
          className="section-heading"
          delay={0.1}
        />
        <p className="text-center text-[hsl(var(--muted))] font-light mb-12 -mt-8 text-sm">
          Sprawdzony proces, który dostarcza rezultaty
        </p>
        <div className="relative">
          <div className="hidden md:block absolute top-14 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[hsl(var(--primary))/0.1] via-[hsl(var(--primary))/0.4] to-[hsl(var(--primary))/0.1]" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.15 + 0.2, duration: 0.5 }}
                  className="flex flex-col items-center text-center relative"
                >
                  <div className="relative mb-5">
                    <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center">
                      <Icon size={24} className="text-[hsl(var(--primary))]" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full glass flex items-center justify-center text-[10px] font-mono text-[hsl(var(--primary))] border border-[hsl(var(--primary))/0.3]">
                      {0}{i + 1}
                    </span>
                  </div>
                  <h3 className="text-base font-light text-white mb-1.5">{s.title}</h3>
                  <p className="text-xs text-[hsl(var(--muted))] font-light max-w-[200px]">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
