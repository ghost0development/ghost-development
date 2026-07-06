"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, MessageSquare, Send } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";
import { getSupabase, type Testimonial } from "@/lib/supabase";

export default function Testimonials() {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", content: "", rating: 5 });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const sb = getSupabase();
        if (!sb) throw new Error("no supabase");
        const { data } = await sb
          .from("testimonials")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(10);

        if (data && data.length > 0) {
          setReviews(data);
        }
      } catch {
        const stored = localStorage.getItem("ghost-testimonials");
        if (stored) {
          try { setReviews(JSON.parse(stored)); } catch {}
        }
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  const addReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.content.trim()) return;

    const newReview = {
      name: form.name.trim() || "Anonim",
      content: form.content.trim(),
      rating: form.rating,
    };

    try {
      const sb = getSupabase();
      if (!sb) throw new Error("no supabase");
      const { data } = await sb
        .from("testimonials")
        .insert([newReview] as any)
        .select()
        .single();

      if (data) {
        setReviews((prev) => [data, ...prev]);
      }
    } catch {
      const local: Testimonial = {
        id: Date.now().toString(),
        ...newReview,
        created_at: new Date().toISOString(),
      };
      setReviews((prev) => [local, ...prev]);
      const stored = localStorage.getItem("ghost-testimonials");
      const existing = stored ? JSON.parse(stored) : [];
      localStorage.setItem("ghost-testimonials", JSON.stringify([local, ...existing]));
    }

    setForm({ name: "", content: "", rating: 5 });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  if (loading) return null;
  if (reviews.length === 0) return null;

  return (
    <section id="opinie" className="py-24 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-px bg-[hsl(var(--primary))] mb-6 shadow-lg shadow-[hsl(var(--primary))/0.3]"
          />
          <AnimatedText
            text="Opinie"
            className="text-xs font-mono font-medium tracking-[0.3em] text-[hsl(var(--muted))] uppercase block mb-4"
            as="span"
            variant="words"
          />
          <AnimatedText
            text="Co mówią klienci"
            className="text-4xl md:text-5xl font-bold tracking-tight inline-block"
            as="h2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4, ease: "easeOut" }}
              className="p-6 rounded-xl bg-[hsl(0_0%_3%/0.6)] border border-[hsl(var(--primary))/0.06] hover:border-[hsl(var(--primary))/0.12] transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    size={12}
                    className={si < review.rating ? "text-[hsl(var(--primary))] fill-[hsl(var(--primary))]" : "text-[hsl(0_0%_20%)]"}
                  />
                ))}
              </div>
              <p className="text-sm text-[hsl(0_0%_75%)] font-light leading-relaxed mb-3">
                &ldquo;{review.content}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[hsl(var(--muted))] tracking-wider">{review.name}</span>
                <span className="text-[9px] font-mono text-[hsl(var(--muted))/0.5]">{review.created_at?.slice(0, 10)}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-xl mx-auto p-8 rounded-2xl bg-[hsl(0_0%_3%/0.8)] border border-[hsl(var(--primary))/0.1]"
        >
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare size={16} className="text-[hsl(var(--primary))]" />
            <span className="text-sm font-semibold text-white">Dodaj opinię</span>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="w-10 h-10 rounded-full bg-[hsl(var(--primary))/0.1] flex items-center justify-center mx-auto mb-3">
                <Send size={16} className="text-[hsl(var(--primary))]" />
              </div>
              <p className="text-sm text-[hsl(0_0%_70%)]">Dzięki! Opinia dodana.</p>
            </motion.div>
          ) : (
            <form onSubmit={addReview} className="space-y-4">
              <input
                type="text"
                placeholder="Twoje imię (opcjonalnie)"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[hsl(0_0%_5%)] border border-[hsl(0_0%_10%)] text-xs text-white placeholder:text-[hsl(var(--muted))] outline-none focus:border-[hsl(var(--primary))/0.3] transition-colors"
              />
              <textarea
                placeholder="Twoja opinia..."
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={3}
                required
                className="w-full px-4 py-3 rounded-lg bg-[hsl(0_0%_5%)] border border-[hsl(0_0%_10%)] text-xs text-white placeholder:text-[hsl(var(--muted))] outline-none focus:border-[hsl(var(--primary))/0.3] transition-colors resize-none"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <button
                      key={si}
                      type="button"
                      onClick={() => setForm({ ...form, rating: si + 1 })}
                    >
                      <Star
                        size={14}
                        className={`transition-colors ${si < form.rating ? "text-[hsl(var(--primary))] fill-[hsl(var(--primary))]" : "text-[hsl(0_0%_20%)] hover:text-[hsl(var(--primary))/0.5]"}`}
                      />
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[hsl(var(--primary))] text-white text-[10px] font-semibold tracking-wider hover:brightness-110 transition-all"
                >
                  Wyślij
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
