"use client";
import { motion } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";
import MagneticButton from "@/components/MagneticButton";

export default function Contact() {
  return (
    <section id="kontakt" className="py-24 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.04),transparent_60%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[hsl(var(--primary))/0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-4xl mx-auto relative">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-px h-16 bg-gradient-to-b from-transparent to-[hsl(var(--primary))] mb-12 shadow-lg shadow-[hsl(var(--primary))/0.3]"
          />
          <AnimatedText
            text="Kontakt"
            className="text-xs font-mono font-medium tracking-[0.3em] text-[hsl(var(--muted))] uppercase block mb-6"
            as="span"
            variant="words"
          />
          <AnimatedText
            text="Masz pomysł? Porozmawiajmy."
            className="text-4xl md:text-5xl font-bold tracking-tight text-white"
            as="h2"
            variant="chars"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            className="text-sm text-[hsl(var(--muted))] font-light mt-4 mb-10 max-w-md"
          >
            Wycenię, doradzę, wdrożę. Masz pomysł? Napisz!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
          >
            <MagneticButton
              href="mailto:ghost.development.info@gmail.com"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[hsl(var(--primary))] text-white text-sm font-semibold hover:brightness-110 transition-all duration-300 shadow-lg shadow-[hsl(var(--primary))/0.3] group cursor-pointer"
            >
              <span>ghost.development.info@gmail.com</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </MagneticButton>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="text-xs text-[hsl(var(--muted))] mt-6 tracking-wider"
          >
            Przygotuję ofertę w 24h
          </motion.p>
        </div>
      </div>
    </section>
  );
}
