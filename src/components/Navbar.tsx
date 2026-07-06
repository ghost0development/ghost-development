"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useLenis } from "@/lib/lenis";

const links = [
  { href: "#uslugi", label: "Usługi" },
  { href: "#technologie", label: "Technologie" },
  { href: "#projekty", label: "Projekty" },
  { href: "#about", label: "O nas" },
  { href: "#opinie", label: "Opinie" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lenis } = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href) as HTMLElement | null;
    if (el && lenis) {
      lenis.scrollTo(el, { offset: -80, duration: 1.4, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[hsl(240_10%_4%/0.85)] backdrop-blur-xl border-b border-[hsl(0_0%_10%/0.5)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-left">
          <div className="flex items-center gap-2.5">
            <div className="relative w-7 h-7 overflow-hidden rounded">
              <Image src="/logo.webp" alt="Ghost Development" width={28} height={28} className="object-cover" />
            </div>
            <span className="text-sm font-mono font-bold tracking-wider text-white">
              GHOST<span className="text-[hsl(var(--primary))]">//</span>DEV
            </span>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.3, ease: "easeOut" }}
            >
              <button
                onClick={() => handleClick(link.href)}
                className="group relative text-xs font-medium text-[hsl(0_0%_55%)] hover:text-white transition-colors tracking-widest uppercase py-1"
              >
                {link.label}
                <span className="absolute -bottom-px left-0 w-0 h-px bg-[hsl(var(--primary))] group-hover:w-full transition-all duration-300" />
              </button>
            </motion.div>
          ))}
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-[hsl(240_10%_4%/0.95)] backdrop-blur-xl border-b border-[hsl(0_0%_10%/0.5)]"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className="text-xs font-medium text-[hsl(0_0%_55%)] hover:text-white transition-colors tracking-widest uppercase text-left py-2"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
