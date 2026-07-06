"use client";
import { motion } from "framer-motion";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss,
  SiPython, SiNodedotjs, SiSupabase, SiSqlite, SiThreedotjs, SiFramer,
} from "react-icons/si";
import { CgTerminal } from "react-icons/cg";
import AnimatedText from "@/components/AnimatedText";

const techs = [
  { name: "React", cat: "Frontend", color: "#61DAFB", icon: SiReact },
  { name: "Next.js", cat: "Framework", color: "#fff", icon: SiNextdotjs },
  { name: "TypeScript", cat: "Język", color: "#3178C6", icon: SiTypescript },
  { name: "JavaScript", cat: "Język", color: "#F7DF1E", icon: SiJavascript },
  { name: "Tailwind CSS", cat: "CSS", color: "#06B6D4", icon: SiTailwindcss },
  { name: "Python", cat: "Język", color: "#3776AB", icon: SiPython },
  { name: "PySide6", cat: "Desktop", color: "#41CD52", icon: CgTerminal },
  { name: "Node.js", cat: "Backend", color: "#5FA04E", icon: SiNodedotjs },
  { name: "Supabase", cat: "Backend", color: "#3ECF8E", icon: SiSupabase },
  { name: "SQLite", cat: "Baza", color: "#003B57", icon: SiSqlite },
  { name: "Three.js", cat: "3D", color: "#fff", icon: SiThreedotjs },
  { name: "Framer Motion", cat: "Animacje", color: "#0055FF", icon: SiFramer },
];

export default function Technologies() {
  return (
    <section id="technologie" className="py-24 px-4 md:px-8 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)_/_0.02),transparent_70%)] pointer-events-none" />
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
            text="Technologie"
            className="text-xs font-mono font-medium tracking-[0.3em] text-[hsl(var(--muted))] uppercase block mb-4"
            as="span"
            variant="words"
          />
          <AnimatedText
            text="Mój tech stack"
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
            Narzędzia i technologie, których używam w codziennej pracy.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {techs.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.35, ease: "easeOut" }}
                className="group relative p-4 rounded-xl bg-[hsl(0_0%_3%/0.8)] border border-[hsl(0_0%_10%)] hover:bg-[hsl(0_0%_5%)] transition-all duration-300"
              >
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(120px circle at 50% 0%, ${tech.color}15, transparent 80%)`,
                  }}
                />
                <div className="relative flex flex-col items-center text-center gap-2">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${tech.color}12`,
                      color: tech.color,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <span className="text-[11px] font-medium text-[hsl(0_0%_65%)] group-hover:text-white transition-colors duration-300 leading-tight">
                    {tech.name}
                  </span>
                  <span className="text-[9px] font-mono text-[hsl(var(--muted))/0.4] tracking-wider uppercase">
                    {tech.cat}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
