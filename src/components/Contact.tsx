"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";
import { getSupabase } from "@/lib/supabase";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setError("");

    try {
      const sb = getSupabase();
      if (!sb) throw new Error("Supabase offline");
      const { error: insertError } = await sb.from("leads").insert([
        { name: form.name.trim(), email: form.email.trim(), message: form.message.trim() },
      ] as any);
      if (insertError) throw insertError;
      setSent(true);
    } catch {
      setError("Coś poszło nie tak. Wyślij maila bezpośrednio.");
    }
  };

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
          <div className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
            <span className="block">Masz pomysł?</span>
            <span className="block">Porozmawiajmy</span>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            className="text-sm text-[hsl(var(--muted))] font-light mt-4 mb-10 max-w-md"
          >
            Opisz swój projekt, a wycenimy go w 24h.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-xl mx-auto"
        >
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 px-8 rounded-2xl bg-[hsl(0_0%_3%/0.8)] border border-[hsl(var(--primary))/0.1]"
            >
              <div className="w-14 h-14 rounded-full bg-[hsl(var(--primary))/0.1] flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={24} className="text-[hsl(var(--primary))]" />
              </div>
              <p className="text-lg font-semibold text-white mb-2">Wiadomość wysłana!</p>
              <p className="text-sm text-[hsl(var(--muted))]">Odezwiemy się w ciągu 24h.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 p-8 rounded-2xl bg-[hsl(0_0%_3%/0.8)] border border-[hsl(var(--primary))/0.1]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Imię i nazwisko"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[hsl(0_0%_5%)] border border-[hsl(0_0%_10%)] text-sm text-white placeholder:text-[hsl(var(--muted))] outline-none focus:border-[hsl(var(--primary))/0.3] transition-colors"
                />
                <input
                  type="email"
                  placeholder="Adres e-mail"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[hsl(0_0%_5%)] border border-[hsl(0_0%_10%)] text-sm text-white placeholder:text-[hsl(var(--muted))] outline-none focus:border-[hsl(var(--primary))/0.3] transition-colors"
                />
              </div>
              <textarea
                placeholder="Opisz swój projekt — jaki cel, jakie technologie, jaki budżet?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                required
                className="w-full px-4 py-3 rounded-lg bg-[hsl(0_0%_5%)] border border-[hsl(0_0%_10%)] text-sm text-white placeholder:text-[hsl(var(--muted))] outline-none focus:border-[hsl(var(--primary))/0.3] transition-colors resize-none"
              />
              {error && <p className="text-xs text-red-400">{error}</p>}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[hsl(var(--primary))] text-white text-sm font-semibold hover:brightness-110 transition-all shadow-lg shadow-[hsl(var(--primary))/0.25]"
              >
                <Send size={14} />
                Wyślij zapytanie
              </button>
              <p className="text-[10px] text-center text-[hsl(var(--muted))/0.6] tracking-wider">
                lub napisz bezpośrednio:{" "}
                <a href="mailto:ghost.development.info@gmail.com" className="text-[hsl(var(--primary))] hover:underline">
                  ghost.development.info@gmail.com
                </a>
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
