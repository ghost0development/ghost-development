"use client";
import { motion } from "framer-motion";
import { ArrowUp, Code2, Mail } from "lucide-react";
import Image from "next/image";
import MagneticButton from "@/components/MagneticButton";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.4, ease: "easeOut" } as const,
});

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t border-[hsl(var(--card-border))]"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col items-center text-center mb-8">
          <motion.div {...fadeUp(0)} className="flex items-center gap-2.5 mb-4">
            <div className="relative w-6 h-6 overflow-hidden rounded">
              <Image src="/logo.webp" alt="Ghost Development" width={24} height={24} className="object-cover" />
            </div>
            <span className="text-sm font-mono font-bold tracking-wider text-white">
              GHOST<span className="text-[hsl(var(--primary))]">//</span>DEV
            </span>
          </motion.div>
          <motion.p {...fadeUp(0.1)} className="text-xs text-[hsl(var(--muted))] font-light mb-6">
            &copy; {new Date().getFullYear()} Ghost Development. Wszelkie prawa zastrzeżone.
          </motion.p>
          <motion.div {...fadeUp(0.15)} className="flex items-center gap-6">
            <a
              href="mailto:ghost.development.info@gmail.com"
              className="group text-xs text-[hsl(var(--muted))] hover:text-white transition-colors tracking-wider flex items-center gap-2"
            >
              <Mail size={14} />
              ghost.development.info@gmail.com
            </a>
            <a
              href="https://github.com/ghostdevpl"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-xs text-[hsl(var(--muted))] hover:text-white transition-colors tracking-wider flex items-center gap-2"
            >
              <Code2 size={14} />
              GitHub
            </a>
          </motion.div>
        </div>
        <div className="flex justify-center pt-6 border-t border-[hsl(var(--card-border))]">
          <MagneticButton
            onClick={scrollToTop}
            className="w-8 h-8 rounded-lg bg-[hsl(0_0%_5%)] hover:bg-[hsl(0_0%_8%)] border border-[hsl(var(--card-border))] flex items-center justify-center text-[hsl(var(--muted))] hover:text-white transition-all cursor-pointer"
          >
            <ArrowUp size={14} />
          </MagneticButton>
        </div>
      </div>
    </motion.footer>
  );
}
