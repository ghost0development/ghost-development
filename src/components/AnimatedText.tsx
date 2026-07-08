"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  variant?: "chars" | "words" | "lines";
  once?: boolean;
}

const charVariant = {
  hidden: { opacity: 0, y: 40, rotateX: -60, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1, y: 0, rotateX: 0, scale: 1,
    transition: {
      delay: i * 0.025,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const wordVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function AnimatedText({
  text,
  className = "",
  delay = 0,
  as: Tag = "h2",
  variant = "chars",
  once = true,
}: AnimatedTextProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0));
  }, []);

  if (variant === "words") {
    const words = text.split(" ");
    return (
      <Tag className={className}>
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: "-50px" }}
            variants={wordVariant}
            className="inline-block mr-[0.3em]"
            style={isMobile ? { perspective: undefined } : { perspective: 600 }}
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    );
  }

  if (isMobile || variant !== "chars") {
    const chars = text.split("");
    return (
      <Tag className={className}>
        {chars.map((char, i) => (
          <span key={`${char}-${i}`} className="inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </Tag>
    );
  }

  const chars = text.split("");
  return (
    <Tag className={className} style={{ perspective: 800 }}>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          custom={i + (delay ? delay / 0.025 : 0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once, margin: "-50px" }}
          variants={charVariant}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Tag>
  );
}
