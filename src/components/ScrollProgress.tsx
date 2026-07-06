"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[1px] z-[100] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))",
        boxShadow: "0 0 20px hsl(var(--primary)/0.3)",
      }}
    />
  );
}
